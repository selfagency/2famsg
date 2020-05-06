const { wrapf } = require('error')

const error = (msg, err, opts) => {
  if (opts && opts.alfred)
    return JSON.stringify({
      items: [
        {
          title: `❌ Error: ${msg[0]}`,
          subtitle: `${msg[1]}`,
          arg: null,
          valid: true
        }
      ]
    })
  if (err) console.error(wrapf(`❌ ${msg[0]}. ${msg[1]}.\n\n`, err))
  process.exitCode = 1
}

module.exports = error
