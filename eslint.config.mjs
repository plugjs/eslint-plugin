import configurations from './index.mjs'

export default [
  ...configurations,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
]
