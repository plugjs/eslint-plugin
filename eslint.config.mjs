import configurations from './dist/index.js'

export default [
  ...configurations,

  // ===== DEFINE THE LOCATION OF OUR TSCONFIG.JSON FILES ======================
  {
    languageOptions: {
      parserOptions: {
        createDefaultProgram: false,
        project: './tsconfig.json',
      },
    },
  },

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
