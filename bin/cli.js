#!/usr/bin/env node

const { execSync } = require('child_process')

const runCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (e) {
    console.error(`Failed to execute ${command}`, e)
    return false
  }

  return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone https://github.com/Degreet/degreet-telegraf-template ${repoName}`
const installDepsCommand = `cd ${repoName} && yarn install`

console.log('Cloning repository...')
const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) process.exit(-1)

console.log('Installing dependencies with Yarn...')
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) process.exit(-1)

console.log('Success!')