# 2famsg

[![npm](https://img.shields.io/npm/dt/2famsg.svg)](https://www.npmjs.com/package/2famsg) [![npm](https://img.shields.io/npm/v/2famsg.svg)](https://www.npmjs.com/package/utfu) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Twitter: @selfagency_llc](https://img.shields.io/twitter/follow/selfagency_llc.svg?style=social)](https://twitter.com/selfagency_llc)

Retrieves 2FA codes from Apple Messages and outputs as JSON array

### 🏠 [Homepage](https://gitlab.com/selfagency/2famsg)

## Installation

```sh
npm install -g 2famsg || yarn global add 2famsg
```

## CLI Usage

```
> [npx] 2famsg [-a|--alfred] [-d|--database DATABASE_PATH]
```

### Options

- `-a` or `--alfred`: \[`Boolean`\] Format output for [Alfred](https://www.alfredapp.com/)
- `-d` or `--database`: \[`String`\] Specify database path (Default: `~/Library/Messages/chat.db`)

## Node Module Usage

```
const twoFactorMsg = require('2famsg')
const codes = async () => await twoFactorMsg(opts)
```

### Options

- `alfred`: \[`Boolean`\] Format output for [Alfred](https://www.alfredapp.com/)
- `database`: \[`String`\] Specify database path (Default: `~/Library/Messages/chat.db`)

## Author

👤 **Daniel Sieradski <hello@self.agency>**

- Website: [self.agency](https://self.agency)
- Twitter: [@selfagency_llc](https://twitter.com/selfagency_llc)
- GitLab: [@selfagency](https://gitlab.com/selfagency)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://gitlab.com/selfagency/2famsg/issues).

## Show your support

Give a ⭐️ if this project helped you!
