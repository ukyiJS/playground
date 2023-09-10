const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: [
    './eslint-config-base',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  rules: {
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
