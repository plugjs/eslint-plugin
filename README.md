PlugJS ESLint (v9) Shared Configuration
=======================================

Provides shared ESLint v9 flat-config presets for PlugJS projects. It’s the
easiest way to share consistent rules and plugins across repos.

* [Quick Setup](#quick-setup)
* [Configurations](#configurations)
* [CLI Utility](#cli-utility)
* [Legal Stuff](#legal-stuff)


Quick Setup
-----------

Just create a new `eslint.config.mjs` file following this template, your mileage
might vary, and according to your specific needs you might need to add/remove
stuff to fit your project:

```javascript
import configurations from '@plugjs/eslint-plugin'

export default [
  ...configurations,

  // ===== DEFINE THE LOCATION OF OUR TSCONFIG.JSON FILES ======================
  {
    languageOptions: {
      parserOptions: {
        createDefaultProgram: false,
        project: [
          './tsconfig.json',
          './test/tsconfig.json',
        ],
      },
    },
  },

  // ===== ENSURE THAT OUR MAIN FILES DEPEND ONLY ON PROPER DEPENDENCIES =======
  {
    files: [ 'src/**' ],
    rules: {
      // Turn _ON_ dependencies checks only for sources
      'import-x/no-extraneous-dependencies': [ 'error', {
        'devDependencies': false,
        'optionalDependencies': false,
        'peerDependencies': true,
        'bundledDependencies': false,
      } ],
    },
  },

  // ===== PROJECT LOCAL RULES =================================================
  // Add any extra rule not tied to a specific "files" pattern here, e.g.:
  // {
  //   rules: {
  //     'camelcase': 'off',
  //   },
  // },

  // ===== IGNORED FILES =======================================================
  // REMEMBER! Ignores *must* be in its own configuration, they can not coexist
  // with "rules", "languageOptions", "files", ... or anything else (ESLint v9
  // flat config). Otherwise ESLint will blatantly ignore the ignored files!
  {
    ignores: [
      'coverage/',
      'dist/',
      'node_modules/',
    ],
  },
]
```


Configurations
--------------

This includes a number of individual configurations:

* `plugjs/basic/base`: basic configuration of ESLint rules.
* `plugjs/basic/stylistic`: style shared between JavaScript and TypeScript.
* `plugjs/basic/unicorn`: extra niceties from the ESLint Unicorn plugin.
* `plugjs/basic/importx`: defines the style of our imports.

* `plugjs/javascript/shared`: shared configuration for JavaScript files.
* `plugjs/javascript/commonjs`: marks `*.cjs` files as `commonjs`.

* `plugjs/javascript/modules`: marks `*.mjs` files as `module`.
* `plugjs/typescript/plugin`: defines the "@typescript-eslint" plugin.
* `plugjs/typescript/options`: configuration for "@typescript-eslint".
* `plugjs/typescript/overrides`: our rules overriding recommended.

A set of grouped configurations are also available:

* `plugjs/basic`: basic rules shared between JavaScript and TypeScript.
  * includes all `plugjs/basic/...` individual configurations
* `plugjs/javascript`: rules specific to JavaScript code bases.
  * includes all `plugjs/javascript/...` individual configurations
* `plugjs/typescript`: rules specific to TypeScript code bases.
  * includes all `plugjs/typescript/...` individual configurations _and_...
  * ...other rules from `typescript-eslint/recommended`: all other recommended
    Typescript rules, restricted to `.ts`, `.cts`, and `.mts` files.

The default configuration exported by the plugin includes all the configurations
listed above _and_ the base `eslint/js/recommended` configuration from ESLint.


Legal Stuff
-----------

* [Copyright Notice](NOTICE.md)
* [License](LICENSE.md)
