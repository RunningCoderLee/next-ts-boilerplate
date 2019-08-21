module.exports = {
  plugins: ['stylelint-scss', 'stylelint-declaration-block-no-ignored-properties'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'order/properties-alphabetical-order': null,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // https://stylelint.io/user-guide/rules/max-nesting-depth/
    'max-nesting-depth': null,
  },
}
