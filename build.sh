#!/usr/bin/env bash -e

# First of all transpile our sources
echo "... Transpiling TypeScript sources"
npx tsc

# Then run "eslint" to check our configs actually work
echo "... Running ESLint on our own configs"
npx eslint

# Finally, run our own check script to verify that no deprecated rules are used
echo "... Checking for deprecated rules"
node dist/check.js
