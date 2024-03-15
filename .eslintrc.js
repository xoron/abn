module.exports = {
    ignorePatterns: ['**/*.test.js'],
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
    ],
    rules: {
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/html-indent': 'off',
      'vue/no-mutating-props': 'off',
    }
  }