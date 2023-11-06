module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'eslint:recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': ['error'],
    'max-len': 'off',
    'consistent-return': ['off'],
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
    'no-console': 'error',
    'prefer-destructuring': ['error'],
    'class-methods-use-this': 'off',
  },
};
