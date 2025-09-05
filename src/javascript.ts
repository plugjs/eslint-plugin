/** Basic extra rules for JavaScript sources. */
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'

import globals from 'globals'

function findModuleType(directory) {
  const file = path.join(directory, 'package.json')
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    return data.type || 'commonjs'
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(`Error reading "${file}"`, { cause: error })
    }

    const parent = path.dirname(directory)
    if (parent === directory) return 'commonjs'
    return findModuleType(parent)
  }
}

const moduleType = findModuleType(process.cwd())

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

  files: moduleType === 'commonjs' ? [ '**/*.cjs', '**/*.js' ] : [ '**/*.cjs' ],

  languageOptions: {
    sourceType: 'commonjs',
    globals: globals.node,
  },
}

/** Marks `*.mjs` files as `module`. */
export const javascriptModule = {
  name: 'plugjs-javascript-esm',

  files: moduleType === 'module' ? [ '**/*.mjs', '**/*.js' ] : [ '**/*.mjs' ],

  languageOptions: {
    sourceType: 'module',
    globals: globals.nodeBuiltin,
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
