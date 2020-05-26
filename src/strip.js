const strip = str => {
  return str ? str.replace(/[-.,?:#/\\\n\ ]/g, '') : undefined
}

module.exports = strip
