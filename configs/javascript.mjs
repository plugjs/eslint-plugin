/** Basic extra rules for JavaScript sources. */
export const javascript = {
  name: 'plugjs-javascript',

  files: [ '*.js', '*.cjs', '*.mjs' ],

  rules: {
    'guard-for-in': 'error',
    'no-array-constructor': 'error',
    'no-invalid-this': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': [ 'error', {
      args: 'after-used',
      argsIgnorePattern: '^_',
    } ],
    'strict': [ 'error', 'global' ],
  },
}

/** Marks `*.cjs` files as `commonjs`. */
export const javascriptCommonJs = {
  name: 'plugjs-javascript-cjs',

  files: [ '*.cjs' ],

  languageOptions: {
    sourceType: 'commonjs',
  },
}

/** Marks `*.mjs` files as `module`. */
export const javascriptModule = {
  name: 'plugjs-javascript-esm',

  files: [ '*.mjs' ],

  languageOptions: {
    sourceType: 'module',
  },
}

/**
 * JavaScript module: declares all the common rules for JavaScript code bases.
 *
 * This module includes these configurations:
 *
 * * `plugjs-javascript`: basic extra rules for JavaScript sources.
 * * `plugjs-javascript-cjs`: marks `*.cjs` files as `commonjs`.
 * * `plugjs-javascript-mjs`: marks `*.mjs` files as `module`.
 */
export default [ javascript, javascriptCommonJs, javascriptModule ]
