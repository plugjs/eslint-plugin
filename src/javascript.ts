/** Basic extra rules for JavaScript sources. */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import globals from 'globals'

import type { ESLintConfig } from '.'

/* ========================================================================== *
 * INTERNALS                                                                  *
 * ========================================================================== */

function findModuleType(directory: string): 'commonjs' | 'module' {
  const file = path.join(directory, 'package.json')
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    return data.type || 'commonjs'
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw new Error(`Error reading "${file}"`, { cause: error })
    }

    const parent = path.dirname(directory)
    if (parent === directory) return 'commonjs'
    return findModuleType(parent)
  }
}

const moduleType = findModuleType(process.cwd())

/* ========================================================================== *
 * CONFIGS                                                                    *
 * ========================================================================== */

/** Shared configuration for JavaScript files (CommonJS or ES modules). */
export const shared: ESLintConfig<'plugjs/javascript/shared'> = {
  name: 'plugjs/javascript/shared',

  files: [ '**/*.js', '**/*.cjs', '**/*.mjs' ],

  rules: {
    'guard-for-in': 'error',
    'no-array-constructor': 'error',
    'no-invalid-this': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': [ 'error', {
      args: 'after-used',
      argsIgnorePattern: '^_',
    } ],
  },
}

/* ========================================================================== */

/** Marks `*.cjs` files as `commonjs`. */
export const commonjs: ESLintConfig<'plugjs/javascript/commonjs'> = {
  name: 'plugjs/javascript/commonjs',

  files: moduleType === 'commonjs' ? [ '**/*.cjs', '**/*.js' ] : [ '**/*.cjs' ],

  languageOptions: {
    sourceType: 'commonjs',
    globals: globals.node,
  },

  rules: {
    'strict': [ 'error', 'global' ],
  },
}

/* ========================================================================== */

/** Marks `*.mjs` files as `module`. */
export const modules: ESLintConfig<'plugjs/javascript/modules'> = {
  name: 'plugjs/javascript/modules',

  files: moduleType === 'module' ? [ '**/*.mjs', '**/*.js' ] : [ '**/*.mjs' ],

  languageOptions: {
    sourceType: 'module',
    globals: globals.nodeBuiltin,
  },

  rules: {
    'strict': [ 'error', 'never' ],
  },
}

/* ========================================================================== */

/**
 * JavaScript module: declares all the common rules for JavaScript code bases.
 *
 * This module includes these configurations:
 *
 * * `plugjs/javascript/shared`: shared configuration for JavaScript files.
 * * `plugjs/javascript/commonjs`: marks `*.cjs` files as `commonjs`.
 * * `plugjs/javascript/modules`: marks `*.mjs` files as `module`.
 */
export default [ shared, commonjs, modules ] as const
