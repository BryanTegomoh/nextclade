module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
    },
    project: './tsconfig.json',
    // project: [path.resolve(__dirname, './tsconfig.eslint.json')],
    // tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true,
  },
  globals: {},
  extends: [
    'eslint:recommended',

    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'react-app',

    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:array-func/all',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jsx-a11y/recommended',
    'plugin:lodash/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:react-perf/all',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',

    'plugin:prettier/recommended',
  ],
  plugins: [
    'array-func',
    'cflint',
    'import',
    'jest',
    'jsx-a11y',
    'lodash',
    'no-loops',
    'no-secrets',
    'node',
    'only-ascii',
    'promise',
    'react',
    'react-hooks',
    'react-perf',
    'security',
    'sonarjs',
    'unicorn',
    'unused-imports',

    'only-warn',

    '@typescript-eslint',

    'prettier',
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    '@next/next/no-img-element': 'off',
    '@next/next/no-title-in-document-head': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': ['off'],
    'array-func/no-unnecessary-this-arg': 'off',
    'array-func/prefer-array-from': 'off',
    'camelcase': 'warn',
    'cflint/no-substr': 'warn',
    'cflint/no-this-assignment': 'warn',
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'import/no-useless-path-segments': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/order': 'warn',
    'import/prefer-default-export': 'off',
    'jest/consistent-test-it': 'warn',
    'jest/expect-expect': 'warn',
    'jest/no-done-callback': 'warn',
    'jsx-a11y/label-has-associated-control': ['warn', { assert: 'either' }],
    'lodash/chaining': 'off',
    'lodash/import-scope': 'off',
    'lodash/prefer-constant': 'off',
    'lodash/prefer-lodash-chain': 'off',
    'lodash/prefer-lodash-method': 'off',
    'lodash/prefer-lodash-typecheck': 'off',
    'lodash/prefer-noop': 'off',
    'lodash/preferred-alias': 'off',
    'lodash/prop-shorthand': 'off',
    'max-classes-per-file': 'off',
    'no-console': ['warn', { allow: ['info', 'warn', 'error', 'memory'] }],
    'no-loops/no-loops': 'warn',
    'no-param-reassign': ['warn', { ignorePropertyModificationsFor: ['draft'] }],
    'no-secrets/no-secrets': ['warn', { tolerance: 5 }],
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'only-ascii/only-ascii': 'warn',
    'prefer-for-of': 'off',
    'prettier/prettier': 'warn',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction|useRecoilTransaction_UNSTABLE)',
      },
    ],
    'react/destructuring-assignment': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/state-in-constructor': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'sonarjs/cognitive-complexity': ['warn', 20],
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/escape-case': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/no-abusive-eslint-disable': 'warn',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-method-this-argument': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-zero-fractions': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

    'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],

    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',

    '@typescript-eslint/no-duplicate-imports': 'off',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ['src/pages/**/*', 'src/types/**/*'],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/ban-types': ['warn', { extendDefaults: true, types: { object: false } }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'import/no-duplicates': 'off',
        'no-useless-constructor': 'off',
        'react/prefer-stateless-function': 'off',
      },
    },
    {
      files: [
        '.eslintrc.js',
        'babel-node.config.js',
        'config/**/*.js',
        'config/**/*.ts',
        'config/jest/mocks/**/*.js',
        'infra/**/*.js',
        'jest-runner-eslint.config.js',
        'jest.config.js',
        'lib/EnvVarError.js',
        'lib/findModuleRoot.js',
        'lib/getenv.js',
        'next.config.js',
        'postcss.config.js',
        'stylelint.config.js',
        'webpack.config.js',
      ],
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'global-require': 'off',
        'import/extensions': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/no-import-module-exports': 'off',
        'security/detect-child-process': 'off',
        'sonarjs/cognitive-complexity': ['warn', 50],
        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: ['config/jest/mocks/**/*.js'],
      rules: {
        'no-constructor-return': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react/display-name': 'off',
        'react/function-component-definition': 'off',
      },
    },
    {
      files: ['**/*.test.*', '**/__test__/**', '**/__tests__/**', '**/test/**', '**/tests/**'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',
      },
    },
  ],
}
