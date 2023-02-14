const { defineConfig } = require('eslint-define-config');
const config = require('./eslint.config.cjs');

module.exports = defineConfig({
  ...config,
  extends: [...config.extends, 'plugin:vue/vue3-recommended'],
  parser: 'vue-eslint-parser',
  rules: {
    ...config.rules,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 10,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-deprecated-destroyed-lifecycle': 'off',
    'vue/require-default-prop': 'off',
  },
});
