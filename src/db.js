const sqlite = require('../lib/async/sqlite-async')

const error = require('./error')
const query = require('./query')

// Instantiate database
const db = async opts => {
  try {
    return await sqlite.open(opts.dbPath)
  } catch (err) {
    return error(['Cannot open Messages database', `Make sure ${dbpath} exists`], err, opts)
  }
}

// Run query
const select = async (dbo, opts) => {
  try {
    return await dbo.all(query)
  } catch (err) {
    return error(['Cannot retrieve messages from database', 'Make sure you have the correct permissions', err, opts])
  }
}

module.exports = {
  db,
  select
}
