#!/usr/bin/env node

/* eslint-disable no-console */
import { ESLint } from 'eslint'

/** @type Record<string, string[]> */
const deprecated: Record<string, string[]> = {}

// Pretty colors
const ylw = '\u001b[38;5;220m' // yellow
const grn = '\u001b[38;5;76m' // greenish
const rst = '\u001b[0m' // reset
// Running in GitHub Actions?
const gh = process.env.GITHUB_ACTIONS === 'true'

// Create a new ESLint
const eslint = new ESLint()

// Fake lint some sources (JS, TS, ...) to get the deprecated rules
for (const f of [ 'x.js', 'x.mjs', 'x.cjs', 'x.ts', 'x.cts', 'x.mts' ]) {
  const results = await eslint.lintText('var foo="bar";', { filePath: f })
  for (const result of results) {
    for (const rule of result.usedDeprecatedRules) {
      deprecated[rule.ruleId] = rule.replacedBy
    }
  }
}

// Print the deprecated rules in order
const deprecations = Object.entries(deprecated)
if (deprecations.length !== 0) {
  deprecations
      .sort(([ a ], [ b ]) => a.localeCompare(b))
      .forEach(([ rule, replacement ]) => {
        if (replacement.length) {
          console.log(`Rule "${ylw}${rule}${rst}" deprecated and replaced by "${grn}${replacement.join(`${rst}", "${grn}`)}${rst}"`)
          if (gh) console.log(`::warning::Rule "${rule}" deprecated and replaced by "${replacement.join(', ')}"`)
        } else {
          console.log(`Rule "${ylw}${rule}${rst}" deprecated without replacement`)
          if (gh) console.log(`::warning::Rule "${rule}" deprecated without replacement`)
        }
      })
} else {
  console.log(`${grn}Success:${rst} no deprecated rules found!`)
}
