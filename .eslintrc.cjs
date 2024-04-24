module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  ignorePatterns: ['.eslintrc.{js,cjs}'],
  parserOptions: {
    sourceType: 'script',
    ecmaVersion: 'latest',
  },
  rules: {
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    indent: ['error', 2],
    'no-console': 0,
  },
}
