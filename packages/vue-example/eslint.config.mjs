import globals from 'globals';
import { eslintFormatConfig } from 'shared/config/eslint/eslint-format.config.mjs';
import { eslintJavascriptConfig } from 'shared/config/eslint/eslint-javascript.config.mjs';
import { eslintVitestConfig } from 'shared/config/eslint/eslint-vitest.config.mjs';
import { eslintPlaywrightConfig } from 'shared/config/eslint/eslint-playwright.config.mjs';
import { eslintVueTsConfig } from 'shared/config/eslint/eslint-vue-ts.config.mjs';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...eslintFormatConfig,
  ...eslintJavascriptConfig,
  ...eslintVueTsConfig,
  ...eslintVitestConfig,
  ...eslintPlaywrightConfig,
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
    ],
  },
];
