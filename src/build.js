const { compile } = require('nexe')

;(async () => {
  await compile({
    make: ['-j10'],
    build: true,
    mangle: false,
    configure: ['--openssl-no-asm'],
    input: './index.js',
    output: '../bin/2famsg',
    loglevel: 'verbose',
    targets: ['macos-12.4.0'],
    patches: [
      (compiler, next) => {
        compiler.code = () => [compiler.shims.join(''), compiler.startup].join(';')
        return next()
      }
    ]
  })
})()
