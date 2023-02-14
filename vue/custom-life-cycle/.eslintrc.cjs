const config = require('config/eslint-vue.config.cjs');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  ...config,
});
