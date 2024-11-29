module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['packages', 'components', 'showcase', 'apps']],
    'scope-case': [2, 'always', 'kebab-case'],
  },
}
