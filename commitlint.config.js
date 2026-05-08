module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'packages',
        'components',
        'dates',
        'overlays',
        'showcase',
        'apps',
        'release',
        'config',
        'pipeline',
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-empty': [2, 'never'],
  },
}
