PlugJS ESLint (v9) Shared Configuration
=======================================

This package exports simple configurations for linting our projects. It's the
easiest way to actually share some configs and plugins.

Just add in your `eslint.config.mjs` something similar to:

```javascript
import configurations from '@plugjs/eslint-plugin'

export default [
  ...configurations,
  // any other configuration you might want to add for your project...
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

Notes on building
-----------------

During this transitional period (ESLint from v8 to v9, and TypeScript ESLint
from v7 to v8) a number of plugins, even if they are working, are specifying
wrong/old dependencies in their packages.

For those plugins, we bundle them up and ship them with this plugin, and
hopefully we'll be able to un-bundle them as the various packages move in their
transitions.

Legal Stuff
-----------

* [Copyright Notice](NOTICE.md)
* [License](LICENSE.md)
