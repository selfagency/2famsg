const os = require('os')
const sqlite = require('sqlite-async')
const { wrapf } = require('../node_modules/error/index.js')

const homedir = os.homedir()

const query = `
  select
      message.rowid,
      ifnull(handle.uncanonicalized_id, chat.chat_identifier) AS sender,
      message.service,
      datetime(message.date / 1000000000 + 978307200, 'unixepoch', 'localtime') AS message_date,
      message.text
  from
      message
          left join chat_message_join
                  on chat_message_join.message_id = message.ROWID
          left join chat
                  on chat.ROWID = chat_message_join.chat_id
          left join handle
                  on message.handle_id = handle.ROWID
  where
      is_from_me = 0
      and text is not null
      and length(text) > 0
      and (
          text glob '*[0-9][0-9][0-9][0-9][0-9]*'
          or text glob '*[0-9][0-9][0-9][0-9][0-9][0-9]*'
          or text glob '*[0-9][0-9][0-9][0-9][0-9][0-9][0-9]*'
          or text glob '*[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]*'
          or text glob '*[0-9][0-9][0-9]-[0-9][0-9][0-9]*'
          or text glob '*[0-9][0-9][0-9] [0-9][0-9][0-9]*'
      )
  order by
      message.date desc
  limit 100
`

const db = async () => {
  try {
    return await sqlite.open(`${homedir}/Library/Messages/chat.db`)
  } catch (err) {
    throw wrapf('Cannot open Messages database', err)
  }
}

const select = async dbo => {
  try {
    return await dbo.all(query)
  } catch (err) {
    throw wrapf('Cannot retrieve data from database', err)
  }
}

const strip = str => {
  return str.replace(/[-.,?:#/\\\n\ ]/g, '')
}

const twoFactorMsg = async () => {
  try {
    const dbo = await db()
    const data = await select(dbo)
    let results = []

    for (let item of data) {
      let text = item.text.replace(/[\n]/gm, ' ')

      let hasCode = /code|otp|[^%]2fa|password|access|authentication|verification/g.exec(text.toLowerCase())

      if (hasCode) {
        const date = new Date(item.message_date)

        let code = /(\d+\s?\-?\d+)/g.exec(text)
        if (code) code = strip(code[0])

        let source = text.match(/\b([A-Z]\S*)\b/g)
        if (source)
          source = source[0].toLowerCase() === 'your' || /^G\-/.exec(source[0]) ? strip(source[1]) : strip(source[0])
        if (source.length > 32) source = source.subStr(0, 32) + '...'

        if (text.length > 255) text = text.subStr(0, 255) + '...'

        results.push({
          source,
          code,
          text,
          date
        })
      }
    }

    results.sort((a, b) => {
      return b.date - a.date
    })

    console.log(results)
  } catch (err) {
    throw wrapf('Command failed', err)
  }
}

module.exports = twoFactorMsg

if (require.main === module) twoFactorMsg()
