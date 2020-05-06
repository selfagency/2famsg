# 2famsg

[![npm](https://img.shields.io/npm/dt/2famsg.svg)](https://www.npmjs.com/package/2famsg) [![npm](https://img.shields.io/npm/v/2famsg.svg)](https://www.npmjs.com/package/utfu) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Twitter: @selfagency_llc](https://img.shields.io/twitter/follow/selfagency_llc.svg?style=social)](https://twitter.com/selfagency_llc)

Retrieve 2FA codes from Apple Messages on MacOS as JSON output with CLI or API

## Installation

```sh
npm install -g 2famsg || yarn global add 2famsg
```

## CLI Usage

```sh
[npx] 2famsg [-a | --alfred] [-d | --database DATABASE_PATH] [-q | --query QUERY_TERM]
```

### Options

- `-a` or `--alfred`: \[`Boolean`\] Format output for [Alfred](https://www.alfredapp.com/)
- `-d` or `--database`: \[`String`\] Specify database path (Default: `~/Library/Messages/chat.db`)
- `-q` or `--query`: \[`String`\] Term by which to filter results (eg., `facebook` or `amazon`)

## Node Module Usage

```javascript
const twoFactorMsg = require('2famsg')
const codes = async () =>
  await twoFactorMsg({
    query: 'facebook'
  })
```

### Options

- `alfred`: \[`Boolean`\] Format output for [Alfred](https://www.alfredapp.com/)
- `database`: \[`String`\] Specify database path (Default: `~/Library/Messages/chat.db`)
- `query`: \[`String`\] Term by which to filter results (eg., `facebook` or `amazon`)

## Build Binaries

```sh
npm run build:sqlite
npm run build:bin
```

## Author

👤 **Daniel Sieradski <hello@self.agency>**

- Website: [self.agency](https://self.agency)
- Twitter: [@selfagency_llc](https://twitter.com/selfagency_llc)
- GitLab: [@selfagency](https://gitlab.com/selfagency)

## Acknowledgements

The [SQLite query](https://gitlab.com/selfagency/2famsg/-/blob/master/src/query.js) was lifted from [Scott Carpenter](https://github.com/squatto/)'s [alfred-imessage-2fa](https://github.com/squatto/alfred-imessage-2fa) Alfred workflow, which I modified somewhat. Scott's project was a great start but I was looking for a more effective solution and decided to build one in a language in which I felt more comfortable jamming on the code.

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://gitlab.com/selfagency/2famsg/issues).

## Show your support

Give a ⭐️ if this project helped you!
