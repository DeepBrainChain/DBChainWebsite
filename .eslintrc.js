module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: 2020
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "no-unused-vars": ["warn"],
    "no-debugger": ["warn"],
    "@typescript-eslint/no-empty-function": ["warn"]
  }
}
