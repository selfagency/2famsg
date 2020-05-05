const { compile } = require('nexe')
const { wrapf } = require('error')

;(async () => {
  try {
    await compile({
      build: true,
      input: './src/2famsg.js',
      targets: ['macos'],
      name: '2famsg',
      loglevel: 'verbose',
      output: 'bin',
      patches: [
        async (compiler, next) => {
          compiler.options.empty = true
          return next()
        }
      ]
    })
  } catch (err) {
    throw wrapf('Compilation failed', err)
  }
})()
