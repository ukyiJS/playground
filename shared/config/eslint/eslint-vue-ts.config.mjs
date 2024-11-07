import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export const eslintVueTsConfig = [
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
