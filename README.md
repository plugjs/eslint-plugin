PlugJS ESLint Shared Configuration
==================================

This package exports simple configurations for linting our project. It's the
easiest way to actually share some configs and plugins.

Just add in your `.eslintrc.cjs` something similar to:

```javascript
module.exports = {
  root: true,
  extends: [
    'plugin:@plugjs/typescript',
  ],
}
```

* [Copyright Notice](NOTICE.md)
* [License](LICENSE.md)
