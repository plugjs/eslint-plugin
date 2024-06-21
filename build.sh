#!/bin/bash

# Use our prototype to mark the first install (for bundling)
rm -rf "node_modules" "package-lock.json"
cp "package-proto.json" "package.json"
npm install

# Bundle up our problematic dependencies
node "./build.mjs"

# Reinstall with the new "package.json"
rm -rf "node_modules" "package-lock.json"
npm install

# Check that we can at least lint ourselves
npm run build
