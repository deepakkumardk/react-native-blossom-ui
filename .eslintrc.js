module.exports = {
  root: true,
  extends: [
    '@thoughtbot/eslint-config/native',
    '@thoughtbot/eslint-config/typescript',
  ],
  settings: {
    jest: {version: 'detect'},
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  rules: {
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
  },
}
