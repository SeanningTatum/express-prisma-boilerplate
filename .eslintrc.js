module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  rules: {
    'no-absolute-path': 0,
    'import/extensions': 0,
    'consistent-return': 1,
    'max-classes-per-file': 0,
    'prefer-arrow-callback': 0,
    'func-names': 0,
    // 'import/no-unresolved': 0,
  },
};
