const dayjs = require('dayjs')

const { db, select } = require('./db')
const error = require('./error')
const strip = require('./strip')

const parser = async opts => {
  try {
    const dbo = await db(opts)
    const data = await select(dbo, opts)

    // Crawl messages
    let results = []

    if (data && data[0] && data[0].text) {
      for (let item of data) {
        let text = item.text.replace(/[\n]/gm, ' ')

        // check if message contains 2fa related keywords
        let hasCode = /code|otp|[^%]2fa|password|access|authentication|verification|pin/g.exec(text.toLowerCase())

        // check if message matches query
        let queryMatch

        if (opts.query) {
          const regex = new RegExp(opts.query.toLowerCase(), 'g')
          queryMatch = regex.test(item.text.toLowerCase())
        }

        // if yes
        if (hasCode && (opts.query ? queryMatch : true)) {
          // create date obj
          const date = new Date(item.message_date)

          // get code
          let code = /(\d{3,}\s?\-?\d+)/g.exec(text)
          if (code) code = strip(code[0])

          // get source, ie. sender
          let source = text.match(/\b([A-Z]\S*|[a-z][A-Z]\S*)\b/g)
          if (source)
            source = source[0].toLowerCase() === 'your' || /^G\-/.exec(source[0]) ? strip(source[1]) : strip(source[0])
          if (source && source.length > 32) source = source.substring(0, 32) + '...'

          if (text && text.length > 255) text = text.substring(0, 255) + '...'

          // add to results
          if (opts.alfred) {
            results.push({
              title: code,
              subtitle: `${source} @ ${dayjs(date).format('h:mma')} on ${dayjs(date).format('D MMM')}`,
              arg: code,
              valid: true,
              date
            })
          } else {
            results.push({
              source,
              code,
              text,
              date
            })
          }
        }
      }

      if (results.length) {
        // sort by date
        results.sort((a, b) => {
          return b.date - a.date
        })

        // format output
        if (opts.alfred)
          results = JSON.stringify({
            items: results.map(item => {
              delete item.date
              return item
            })
          })

        return results
      } else {
        return []
      }
    } else {
      return []
    }
  } catch (err) {
    return error(['Could not execute database search', 'See additional output'], err, opts)
  }
}

module.exports = parser
