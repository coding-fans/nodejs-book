#! /usr/bin/env node

const fs = require('fs');
const path = require('path')
const chalk = require('chalk')
const log = console.log
let arr = []

fs.readdir(path.resolve(process.cwd()), { withFileTypes: true }, (err, files) => {
  if (err) return

  files.forEach((file) => {
    if (file.isDirectory()) {
      arr.push(chalk.cyan.bold(file.name))
    } else {
      arr.push(chalk.white(file.name))
    }
  })

  log(arr.join(' '))
})