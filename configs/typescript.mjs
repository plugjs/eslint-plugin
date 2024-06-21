import tseslint from 'typescript-eslint'

/** Our own rules overriding `typescript-eslint/recommended`. */
export const typescript = {
  name: 'plugjs-typescript',

  files: [ '**/*.ts', '**/*.cts', '**/*.mts' ],

  rules: {
    'no-unused-vars': 'off', // overrides ESLint Recommended for TypeScript
    'no-dupe-class-members': 'off', // overrides ESLint Recommended for TypeScript

    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': [ 'error', {
      allowExpressions: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
    } ],
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-empty-object-type': [ 'error', {
      allowInterfaces: 'with-single-extends',
    } ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-unused-vars': [ 'error', {
      args: 'after-used',
      argsIgnorePattern: '^_',
    } ],
  },
}

/**
 * TypeScript module: declares all the common rules for TypeScript code bases.
 *
 * This module includes these configurations:
 *
 * * `typescript-eslint/recommended`: imports all the configurations from
 *   TypeScript ESlint recommended, but restrict them to operate only on
 *   `.ts`, `.cts`, and `.mts` files. This *should* include:
 *   * `typescript-eslint/base`: basic parser configuration.
 *   * `typescript-eslint/eslint-recommended`: disable ESLint rules conflicting
 *     with TypeScript.
 *   * `typescript-eslint/recommended`: recommended config for TypeScript
 * * `plugjs-typescript`: our rules overriding `typescript-eslint/recommended`.
 */
export default [
  ...tseslint.configs.recommended.map((config) => {
    config.files = [ '**/*.ts', '**/*.cts', '**/*.mts' ]
    return config
  }),
  typescript,
]
