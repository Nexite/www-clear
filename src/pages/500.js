import {
  Box, Heading, NextLink, Text,
} from '@codeday/topo/Atom';
import Opossum from '../components/Opossum';

export default function ServerError() {
  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Opossum />
      </Box>
      <Box style={{ textAlign: 'center' }}>
        <Heading>Oh no! Error 500</Heading>
        <Text>There seems to have been an error on our part. </Text>
        <NextLink href="/">Go home</NextLink>
      </Box>
    </>
  );
}

export function getStaticProps() {
  return { props: { title: 'Error 500' } };
}
