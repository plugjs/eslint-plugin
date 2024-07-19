import configurations from './index.mjs'

export default [
  ...configurations,

  // ===== IGNORED FILES =======================================================
  // REMEMBER! Ignores *must* be in its own configuration, they can not coexist
  // with "rules", "languageOptions", "files", ... or anything else, otherwise
  // ESLint will blaantly ignore the ignore files!
  {
    ignores: [
      'bundles/',
      'node_modules/',
    ],
  },
]
