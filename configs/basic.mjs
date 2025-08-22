import stylisticPlugin from '@stylistic/eslint-plugin'
import importxPlugin from 'eslint-plugin-import-x'
import unicornPlugin from 'eslint-plugin-unicorn'
import globals from 'globals'

/* ========================================================================== */

/** Basic configuration of ESLint rules. */
export const base = {
  name: 'plugjs-base',

  languageOptions: {
    globals: globals.es2024,
  },

  rules: {
    'camelcase': [ 'error', {
      properties: 'never',

    } ],
    'curly': [ 'error', 'multi-line' ],
    'new-cap': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'off', // overrides eslint recommended
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-multi-str': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-new-wrappers': 'error',
    'no-object-constructor': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-useless-concat': 'error',
    'no-var': 'error',
    'no-warning-comments': 'warn',
    'one-var': [ 'error', 'never' ],
    'prefer-const': [ 'error', {
      destructuring: 'all',
    } ],
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
  },
}

/* ========================================================================== */

/** Style shared between JavaScript and TypeScript. */
export const stylistic = {
  name: 'plugjs-stylistic',

  plugins: {
    '@stylistic': stylisticPlugin,
  },

  rules: {
    '@stylistic/array-bracket-newline': 'off',
    '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
    '@stylistic/arrow-parens': [ 'error', 'always' ],
    '@stylistic/block-spacing': [ 'error', 'always' ],
    '@stylistic/brace-style': 'error',
    '@stylistic/comma-dangle': [ 'error', 'always-multiline' ],
    '@stylistic/comma-spacing': 'error',
    '@stylistic/comma-style': 'error',
    '@stylistic/computed-property-spacing': 'error',
    '@stylistic/eol-last': [ 'error', 'always' ],
    '@stylistic/function-call-spacing': 'error',
    '@stylistic/generator-star-spacing': [ 'error', 'after' ],
    '@stylistic/indent': [ 'error', 2, {
      CallExpression: {
        'arguments': 2,
      },
      FunctionDeclaration: {
        'body': 1,
        'parameters': 2,
      },
      FunctionExpression: {
        'body': 1,
        'parameters': 2,
      },
      MemberExpression: 2,
      ObjectExpression: 1,
      SwitchCase: 1,
      flatTernaryExpressions: true,
      offsetTernaryExpressions: false,
    } ],
    '@stylistic/key-spacing': 'error',
    '@stylistic/keyword-spacing': 'error',
    '@stylistic/linebreak-style': 'error',
    '@stylistic/no-mixed-spaces-and-tabs': 'error',
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-multiple-empty-lines': [ 'error', { 'max': 2, 'maxBOF': 0, 'maxEOF': 1 } ],
    '@stylistic/no-tabs': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/object-curly-spacing': [ 'error', 'always' ],
    '@stylistic/operator-linebreak': [ 'error', 'after', {
      'overrides': {
        '?': 'ignore',
        ':': 'ignore',
        '|': 'before',
        '&': 'before',
      },
    } ],
    '@stylistic/padded-blocks': [ 'error', 'never' ],
    '@stylistic/quote-props': [ 'error', 'consistent' ],
    '@stylistic/quotes': [ 'error', 'single', { 'allowTemplateLiterals': 'never' } ],
    '@stylistic/semi': [ 'error', 'never' ],
    '@stylistic/semi-spacing': 'error',
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/space-before-function-paren': [ 'error', {
      asyncArrow: 'always',
      anonymous: 'never',
      named: 'never',
    } ],
    '@stylistic/spaced-comment': [ 'error', 'always', { 'markers': [ '/ <reference' ] } ],
    '@stylistic/switch-colon-spacing': 'error',
    '@stylistic/rest-spread-spacing': 'error',
    '@stylistic/yield-star-spacing': [ 'error', 'after' ],
  },
}

/* ========================================================================== */

/** Extra niceties from the ESLint Unicorn plugin. */
export const unicorn = {
  name: 'plugjs-unicorn',

  plugins: {
    'unicorn': unicornPlugin,
  },

  rules: {
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/no-instanceof-builtins': 'error',
    'unicorn/prefer-node-protocol': 'error',
  },
}

/* ========================================================================== */

/** Defines the style of our imports. */
export const importx = {
  name: 'plugjs-importx',

  plugins: {
    'import-x': importxPlugin,
  },

  settings: {
    'import-x/extensions': [ '.ts', '.cts', '.mts', '.js', '.cjs', '.mjs' ],
    'import-x/external-module-folders': [ 'node_modules', 'node_modules/@types' ],
    'import-x/parsers': {
      '@typescript-eslint/parser': [ '.ts', '.cts', '.mts' ],
      'espree': [ '.js', '.mjs', '.cjs' ],
    },
    'import-x/resolver': {
      'eslint-import-resolver-typescript': true,
      'eslint-import-resolver-node': true,
    },
  },

  rules: {
    'import-x/consistent-type-specifier-style': [ 'error', 'prefer-top-level' ],
    'import-x/no-cycle': [ 'error' ],
    'import-x/no-duplicates': [ 'error' ],
    'import-x/no-extraneous-dependencies': [ 'off' ],
    'import-x/order': [ 'error', {
      'groups': [ 'builtin', 'external', 'internal', [ 'parent', 'sibling' ], 'index', 'object', 'type' ],
      'newlines-between': 'always',
      'warnOnUnassignedImports': true,
    } ],
  },
}

/* ========================================================================== */

/**
 * Base module: declares all the common rules shared between JavaScript and
 * TypeScript code bases.
 *
 * This module includes these configurations:
 *
 * * `plugjs-base`: basic configuration of ESLint rules.
 * * `plugjs-stylistic`: style shared between JavaScript and TypeScript.
 * * `plugjs-unicorn`: extra niceties from the ESLint Unicorn plugin.
 * * `plugjs-importx`: defines the style of our imports.
 */
export default [ base, stylistic, unicorn, importx ]
