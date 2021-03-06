module.exports = `
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
