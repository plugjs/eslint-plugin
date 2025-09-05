import tseslint from 'typescript-eslint'

import type { TSESLint } from '@typescript-eslint/utils'
import type { ESLintConfig } from './index'

/* ========================================================================== *
 * INTERNALS                                                                  *
 * ========================================================================== */

/**
 * Split the "base" config from "typescript-eslint" into its plugin definition
 * and the rest of the config (namely, the language options). We'll want to
 * apply the plugin **globally** so that all configs can use it, but the
 * language options only to TypeScript files.
 */
const { plugins, ...opts } = tseslint.configs.base as TSESLint.FlatConfig.Config

/** Map the "typescript-eslint" recommended configs */
const configs = tseslint.configs.recommended.map((config: TSESLint.FlatConfig.Config) => {
  // Allow the "@typescript-eslint" plugin to be visible everywhere...
  if (config.name === tseslint.configs.base.name) return null
  config.files = [ '**/*.ts', '**/*.cts', '**/*.mts' ]
  return config
}).filter((config): config is ESLintConfig => !! config)

/* ========================================================================== *
 * CONFIGS                                                                    *
 * ========================================================================== */

/** Define the "@typescript-eslint" plugin. */
export const plugin: ESLintConfig<'plugjs/typescript/plugin'> = {
  name: 'plugjs/typescript/plugin',
  plugins,
}

/* ========================================================================== */

/** Configuration for "@typescript-eslint" scoped to TypeScript sources. */
export const options: ESLintConfig<'plugjs/typescript/options'> = {
  ...opts,
  files: [ '**/*.ts', '**/*.cts', '**/*.mts' ],
  name: 'plugjs/typescript/options',
}

/* ========================================================================== */

/** Our own rules overriding `typescript-eslint/recommended`. */
export const overrides: ESLintConfig<'plugjs/typescript/overrides'> = {
  name: 'plugjs/typescript/overrides',

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
    '@typescript-eslint/no-empty-object-type': 'off',
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
 * * `plugjs/typescript/plugin`: defines the "@typescript-eslint" plugin.
 * * `plugjs/typescript/options`: configuration for "@typescript-eslint".
 * * other rules from `typescript-eslint/recommended`: all other recommended
 *   Typescript rules, restricted to `.ts`, `.cts`, and `.mts` files.
 * * `plugjs/typescript/overrides`: our rules overriding recommended.
 */
export default [ plugin, options, ...configs, overrides ] as const
