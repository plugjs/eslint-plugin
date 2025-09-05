PlugJS ESLint (v9) Shared Configuration
=======================================

This package exports simple configurations for linting our projects. It's the
easiest way to actually share some configs and plugins.

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
        'devDependencies': true,
        'peerDependencies': true,
        'optionalDependencies': true,
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
  // with "rules", "languageOptions", "files", ... or anything else, otherwise
  // ESLint will blaantly ignore the ignore files!
  {
    ignores: [
      'coverage/',
      'dist/',
      'node_modules/',
    ],
  },
]
```

This includes a number of configurations:

* `eslint-recommended`: recommended JavaScript config from ESLint.

* `plugjs-base`: basic configuration of ESLint rules.
* `plugjs-stylistic`: style shared between JavaScript and TypeScript.
* `plugjs-unicorn`: extra niceties from the ESLint Unicorn plugin.
* `plugjs-importx`: defines the style of our imports.

* `plugjs-javascript`: basic extra rules for JavaScript sources.
* `plugjs-javascript-cjs`: marks `*.cjs` files as `commonjs`.
* `plugjs-javascript-mjs`: marks `*.mjs` files as `module`.

* `typescript-eslint/recommended`: imports all the configurations from
  TypeScript ESlint recommended, but restrict them to operate only on
  `.ts`, `.cts`, and `.mts` files. This *should* include:
  * `typescript-eslint/base`: basic parser configuration.
  * `typescript-eslint/eslint-recommended`: disable ESLint rules conflicting
    with TypeScript.
  * `typescript-eslint/recommended`: recommended config for TypeScript
* `plugjs-typescript`: our rules overriding `typescript-eslint/recommended`.

Legal Stuff
-----------

* [Copyright Notice](NOTICE.md)
* [License](LICENSE.md)
