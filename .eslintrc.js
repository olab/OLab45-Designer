module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  extends: [
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'public', 'build'],
  rules: {
    'arrow-parens': 'off',
    'import/no-named-as-default': 0,
    'no-bitwise': ['error', { allow: ['<<'] }],
    'no-param-reassign': 0,
    'react/no-danger': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': [0, {}],
    'react/jsx-key': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
