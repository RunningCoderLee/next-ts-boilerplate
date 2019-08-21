const isProd = process.env.ESLINT_ENV === 'production'

const baseRules = {
  'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true, ignore: ['-/'] }],
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  // require or disallow use of semicolons instead of ASI
  // https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi
  // semi: ['error', 'never'],
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': [
    'warn',
    {
      allow: ['warn', 'error'],
    },
  ],
  // disallow declaration of variables that are not used in the code (no-unused-vars)
  // https://eslint.org/docs/rules/no-unused-vars
  'no-unused-vars': ['off'],
  // Enforce all defaultProps have a corresponding non-required PropType
  // https://github.com/yannickcr/eslint-plugin-react/blob/9e13ae2c51e44872b45cc15bf1ac3a72105bdd0e/docs/rules/default-props-match-prop-types.md
  'react/default-props-match-prop-types': ['off', { allowRequiredDefaults: false }],
  // disallow use of variables before they are defined
  // https://eslint.org/docs/rules/no-use-before-define
  'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
  // Requires operator at the beginning of the line in multiline statements
  // https://eslint.org/docs/rules/operator-linebreak
  'operator-linebreak': ['off', 'before', { overrides: { '=': 'none' } }],
  // 'max-len': [2, { code: 80 }],
  // 'prettier/prettier': 'error',

  // Forbid the use of extraneous packages
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
  // paths are treated both as absolute paths, and relative to process.cwd()
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: true,
      optionalDependencies: false,
    },
  ],
  'jsx-a11y/anchor-is-valid': ['error', { aspects: ['invalidHref', 'preferButton'] }],
}

const prodRules = {
  ...baseRules,
  // '@typescript-eslint/no-unused-vars': [
  //   'error',
  //   {
  //     vars: 'all',
  //     args: 'after-used',
  //     ignoreRestSiblings: true,
  //   },
  // ],
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': [
    'error',
    {
      allow: ['warn', 'error'],
    },
  ],
}

module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    jest: true,
  },
  rules: isProd ? prodRules : baseRules,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        useJSXTextNode: true,
        project: './tsconfig.json',
        tsconfigRootDir: './',
        // extraFileExtensions: ['.vue'],
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
    {
      files: ['*.js', '*.jsx', '!.eslintrc.js'],
      parser: 'babel-eslint',
    },
  ],
}
