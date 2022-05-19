module.exports = {
  plugins: [ 'sonarjs', 'no-secrets', 'node'],
  extends: [ 'airbnb', 'plugin:sonarjs/recommended'],
  settings: {
    tagNamePreference: {
      'augments': 'extends',
    },
    'import/resolver': {    
      '@tophat/eslint-import-resolver-require': {},
      node: {
        extensions: [
          '.js',
          '.mjs',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },

  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^_+$', argsIgnorePattern: '^_+$' }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-secrets/no-secrets': ['error'],
    'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'max-len': ['error', 120],
    'react/static-property-placement': ['error', 'static public field'],
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.ts'] }],
    'react/forbid-prop-types': ['off'],
    'react/prefer-stateless-function': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react/state-in-constructor': ['off'],
    'class-methods-use-this': ['off'],
    'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      }
    ],

    'require-jsdoc': ['off'],
    'valid-jsdoc': ['off'],
    'import/prefer-default-export': ['off'],

    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    'node/no-deprecated-api': ['error'],
    'node/no-extraneous-import': ['error'],
    'node/no-extraneous-require': ['error'],
    'node/no-exports-assign': ['error'],
    'node/no-unpublished-bin': ['error'],
    'node/no-unpublished-import': ['error'],
    'node/no-unpublished-require': ['error'],
    'node/process-exit-as-throw': ['error'],
    'node/shebang': ['error'],
    'node/prefer-promises/fs': ['error'],
    'node/prefer-promises/dns': ['error'],
    'node/no-process-env': ['error'],
    'node/exports-style': [
      'error',
      'module.exports',
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
