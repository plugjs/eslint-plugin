import js from '@eslint/js'

import basic from './configs/basic.mjs'
import javascript from './configs/javascript.mjs'
import typescript from './configs/typescript.mjs'

export * from './configs/basic.mjs'
export * from './configs/javascript.mjs'

/**
 * Base `ESLint` configuration for PlugJS.
 *
 * This includes a number of configurations:
 *
 * * `eslint-recommended`: recommended JavaScript config from ESLint.
 *
 * * `plugjs-base`: basic configuration of ESLint rules.
 * * `plugjs-stylistic`: style shared between JavaScript and TypeScript.
 * * `plugjs-unicorn`: extra niceties from the ESLint Unicorn plugin.
 * * `plugjs-importx`: defines the style of our imports.
 *
 * * `plugjs-javascript`: basic extra rules for JavaScript sources.
 * * `plugjs-javascript-cjs`: marks `*.cjs` files as `commonjs`.
 * * `plugjs-javascript-mjs`: marks `*.mjs` files as `module`.
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
  { // give a name to this config before we go completely nuts!
    name: 'eslint/js/recommended',
    ...js.configs.recommended,
  },
  ...basic,
  ...javascript,
  ...typescript,
]
