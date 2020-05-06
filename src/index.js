#!/usr/bin/env node
const { homedir } = require('os')

const parser = require('./parser')

const twoFactorMsg = async opts => {
  const msgs = await parser(opts)
  if (opts.alfred && !msgs.length)
    console.log(
      JSON.stringify({
        items: [
          {
            title: '🤷 No 2FA codes found in Messages',
            arg: null,
            valid: true
          }
        ]
      })
    )

  if (require.main === module) {
    // output to stdout
    console.log(msgs)
    process.exitCode = 0
  } else {
    return msgs
  }
}

// execute if cli
if (require.main === module) {
  const alfred = process.argv.includes('-a') || process.argv.includes('--alfred')
  let dbPath = `${homedir()}/Library/Messages/chat.db`,
    query = false

  if (process.argv.includes('-d') || process.argv.includes('--database')) {
    const index = (process.argv.indexOf('-d') || process.argv.indexOf('--database')) + 1
    if (process.argv[index] && typeof process.argv[index] === 'string') dbPath = process.argv[index]
  }

  if (process.argv.includes('-q') || process.argv.includes('--query')) {
    const index = (process.argv.indexOf('-q') || process.argv.indexOf('--query')) + 1
    if (process.argv[index] && typeof process.argv[index] === 'string') query = process.argv[index]
  }

  const opts = {
    alfred,
    dbPath,
    query
  }

  // console.debug(opts)
  twoFactorMsg(opts)
}

module.exports = twoFactorMsg
