import {
  JsonWebTokenError, sign, TokenExpiredError, verify,
} from 'jsonwebtoken';
import { apiFetch } from '@codeday/topo/utils';
import getConfig from 'next/config';
import NodeCache from 'node-cache';
import { GetAccountRolesQuery } from './getAccountRoles.gql';

const cache = new NodeCache();
const { serverRuntimeConfig } = getConfig();

function signToken(payload) {
  return sign(payload, serverRuntimeConfig.gql.secret, { expiresIn: '90m', audience: serverRuntimeConfig.gql.audience });
}

export function checkToken(token) {
  if (!token) return false;
  try {
    if (verify(token, serverRuntimeConfig.gql.secret, { audience: serverRuntimeConfig.gql.audience })) {
      return true;
    }
  } catch (e) {
    if (e instanceof JsonWebTokenError || e instanceof TokenExpiredError) {
      return false;
    } throw e;
  }
}

export async function generateToken(username) {
  const cachedToken = cache.get(username);
  if (checkToken(cachedToken)) {
    return cachedToken;
  }
  const accountToken = sign({ scopes: `read:users` }, serverRuntimeConfig.gql.accountSecret, { expiresIn: '10s' });
  const { account } = await apiFetch(GetAccountRolesQuery, { username }, { Authorization: `Bearer ${accountToken}` });
  const roleIds = (account?.getUser?.roles || []).map((r) => r.id);
  const isAdmin = roleIds.includes(serverRuntimeConfig.auth0.roles.employee) || roleIds.includes(serverRuntimeConfig.auth0.roles.admin);
  const isManager = roleIds.includes(serverRuntimeConfig.auth0.roles.manager);

  let token;
  if (isAdmin) {
    token = signToken({ t: 'A' });
  } else if (isManager) {
    token = signToken({ t: 'm', u: username });
  }
  const tokenInfo = { clearAuthToken: token, isAdmin, isManager };
  cache.set(username, tokenInfo);
  return tokenInfo;
}
