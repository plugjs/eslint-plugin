import js from '@eslint/js'

import basicConfigs, * as basic from './basic.js'
import javascriptConfigs, * as javascript from './javascript.js'
import typescriptConfigs, * as typescript from './typescript.js'

import type { TSESLint } from '@typescript-eslint/utils'

/* ========================================================================== *
 * TYPES                                                                      *
 * ========================================================================== */

/** A _named_ ESLint configuration. */
export type ESLintConfig<N extends string = string> = {
  readonly name: N
} & TSESLint.FlatConfig.Config

/* ========================================================================== *
 * INTERNAL                                                                   *
 * ========================================================================== */

/* Give the "eslint/js/recommended" a name so that it shows up in the GUI */
const initial: ESLintConfig<'eslint/js/recommended'> = { // give a name to this config before we go completely nuts!
  name: 'eslint/js/recommended',
  ...js.configs.recommended,
}

/* ========================================================================== *
* EXPORTS                                                                    *
 * ========================================================================== */

/** All ESLint configurations. */
export const configs = {
  'basic': basicConfigs,
  'basic/base': basic.base,
  'basic/stylistic': basic.stylistic,
  'basic/unicorn': basic.unicorn,
  'basic/importx': basic.importx,

  'javascript': javascriptConfigs,
  'javascript/shared': javascript.shared,
  'javascript/commonjs': javascript.commonjs,
  'javascript/modules': javascript.modules,

  'typescript': typescriptConfigs,
  'typescript/plugin': typescript.plugin,
  'typescript/options': typescript.options,
  'typescript/overrides': typescript.overrides,
} as const

/**
 * The default ESLint configuration for PlugJS.
 *
 * This includes all the configurations from:
 * * `eslint/js/recommended`: the base ESLint recommended rules for JavaScript.
 * * `plugjs/basic`: basic rules shared between JavaScript and TypeScript.
 *   * `plugjs/basic/base`: basic configuration of ESLint rules.
 *   * `plugjs/basic/stylistic`: style shared between JavaScript and TypeScript.
 *   * `plugjs/basic/unicorn`: extra niceties from the ESLint Unicorn plugin.
 *   * `plugjs/basic/importx`: defines the style of our imports.
 * * `plugjs/javascript`: rules specific to JavaScript code bases.
 *   * `plugjs/javascript/shared`: shared configuration for JavaScript files.
 *   * `plugjs/javascript/commonjs`: marks `*.cjs` files as `commonjs`.
 *   * `plugjs/javascript/modules`: marks `*.mjs` files as `module`.
 * * `plugjs/typescript`: rules specific to TypeScript code bases.
 *  */
export default [
  initial,
  ...basicConfigs,
  ...javascriptConfigs,
  ...typescriptConfigs,
] as const
