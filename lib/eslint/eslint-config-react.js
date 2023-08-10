const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: [
    './eslint-config-base',
  ],
  plugins: [
    'react',
    'react-refresh',
    'react-hooks',
  ],
  rules: {
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-curly-newline': ['error', 'never'],
    'react/jsx-curly-spacing': ['error', { when: 'never', attributes: { allowMultiline: false }, children: true }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-newline': ['error', { prevent: true }],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-sort-props': ['error', {
      noSortAlphabetically: true, reservedFirst: true, shorthandLast: true, callbacksLast: false,
    }],
    'react/jsx-tag-spacing': ['error', { closingSlash: 'never', beforeSelfClosing: 'always', beforeClosing: 'never' }],
  },
});
