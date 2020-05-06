const strip = str => {
  return str.replace(/[-.,?:#/\\\n\ ]/g, '')
}

module.exports = strip
