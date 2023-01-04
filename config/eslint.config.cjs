require('@rushstack/eslint-patch/modern-module-resolution');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  globals: {
    module: true,
    require: true,
    process: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  plugins: ['import'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    eqeqeq: [
      'warn',
      'always',
    ],
    'no-debugger': ['error'],
    'no-empty': [
      'warn',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-undef': 'off',
    'no-process-exit': 'off',
    'no-useless-escape': 'off',
    'no-var': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],
    'no-multi-spaces': 'error',
    'arrow-spacing': 'error',
    'keyword-spacing': 'error',
    'block-spacing': 'error',
    'array-bracket-spacing': 'error',
    'space-before-blocks': 'error',
    'space-in-parens': ['error', 'never'],
    'no-spaced-func': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-regex-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!', '/'],
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!', ':', '::'],
          balanced: true,
        },
      },
    ],
    'space-infix-ops': 'error',
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
        overrides: {},
      },
    ],
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 10,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 10,
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          minProperties: 10,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 10,
          multiline: true,
          consistent: true,
        },
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    'template-tag-spacing': 'error',
    'template-curly-spacing': 'error',
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    'no-lonely-if': 'error',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['/', '*'],
          ['&', '|', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!=='],
          ['&&', '||'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 4,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-object-spread': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
      },
    ],
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: { '=': 'none' },
      },
    ],
    'operator-assignment': ['error', 'always'],
    'one-var-declaration-per-line': ['error', 'always'],
    semi: 'error',
    'semi-style': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'prefer-template': 'error',
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions'],
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
  },
});
