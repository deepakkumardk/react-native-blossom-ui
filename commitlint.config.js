module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['packages', 'components', 'dates', 'showcase', 'apps', 'release'],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
  },
}
