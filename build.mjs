import { readFile, writeFile } from 'node:fs/promises'

import { build } from 'esbuild'

// In this transition period between ESLint v8 and v9, and between TypeScript
// ESLint v7 and v8, although everything seems to work, some dependencies are
// giving us grief as they in turn depend on the old versions of packages.
//
// Specifically the problematic ones are:
//
// * "@stylistic/eslint-plugin": the "plus" and "ts" plugins depend on the old
//   version of "@typescript-eslint/utils". I'm sure they'll be the first to
//   release a new version, as Anyhony Fu is tracking this...
//
// * "eslint-plugin-import-x": same, hard dependency on the old version of
//   "@typescript-eslint/utils", hopefully they'll pick it up soon.
//
// * "eslint-import-resolver-typescript": this is a bit of a mess, as it has
//   an unused peer dependency on "eslint-plugin-import", which in turn has
//   a hard dependency on ESLint 8.
//
// For those dependency, what we do here is that we *bundle* them here, and
// ship them with this package. We also need to take care of mangling our
// "package.json" file moving those dependencies from "dev" to "real" ones, and
// injecting any *extra* dependencies needed by the bundles.

const bundledModules = [
  '@stylistic/eslint-plugin-js',
  '@stylistic/eslint-plugin-jsx',
  '@stylistic/eslint-plugin-plus',
  '@stylistic/eslint-plugin-ts',
]

const localBundler = {
  name: 'local-bundler',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (! args.importer) return null // entry point
      if (args.path.startsWith('.')) return null // files, always bundled
      if (bundledModules.includes(args.path)) return null // bundled modules

      // anything else is an external module
      externals.add(args.path)

      return { external: true }
    })
  },
}

async function bundle(input, output) {
  await build({
    plugins: [ localBundler ],
    entryPoints: [ input ],
    platform: 'node',
    outfile: output,
    format: 'cjs',
    bundle: true,
  })
}

// ===== START HERE ============================================================

// Read up our "package-proto.json" and "package-lock.json" files
const pkg = JSON.parse(await readFile('./package-proto.json', 'utf8'))
const lock = JSON.parse(await readFile('./package-lock.json', 'utf8'))


// Set of all the external packages we have
const externals = new Set()

// Bundle up our dependencies
await bundle('@stylistic/eslint-plugin', 'bundles/stylistic-eslint-plugin.cjs')
await bundle('eslint-import-resolver-node', 'bundles/eslint-import-resolver-node.cjs')
await bundle('eslint-import-resolver-typescript', 'bundles/eslint-import-resolver-typescript.cjs')
await bundle('eslint-plugin-import-x', 'bundles/eslint-plugin-import-x.cjs')

// Our dependencies
const deps = {}

// For each external, figure out the correct version
for (const external of externals) {
  const dependency = external.split('/').slice(0, external.startsWith('@') ? 2 : 1).join('/')
  const version = lock.packages[`node_modules/${dependency}`]?.version

  if (dependency && version) deps[dependency] = version
}

// Copy in the "devDependencies" from the proto-package
for (const dependency of Object.keys(pkg.devDependencies)) {
  if (dependency === 'esbuild') continue
  if (dependency === '@stylistic/eslint-plugin') continue
  if (dependency === 'eslint-import-resolver-node') continue
  if (dependency === 'eslint-import-resolver-typescript') continue
  if (dependency === 'eslint-plugin-import-x') continue

  deps[dependency] = lock.packages[`node_modules/${dependency}`].version
}

// Sort our dependencies, before dumping them out
pkg.dependencies = Object.fromEntries(Object.entries(deps)
    .sort(([ d1 ], [ d2 ]) => d1 < d2 ? -1 : d1 > d2 ? 1 : 0))

// Mangle our "package.json"
delete pkg.devDependencies
delete pkg.overrides

// And now write it out!
const data = JSON.stringify(pkg, null, 2)
await writeFile('./package.json', data, 'utf8')
