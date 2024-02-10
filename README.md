# git-a-readme

[![License](https://img.shields.io/github/license/shindekokoro/git-a-readme)](http://choosealicense.com/licenses/mit/)

## Description

CLI Application that dynamically generates a professional git README. Information from package.json is used to help pre-populate responses if file exists. This project's README was generated using the node application.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. Make sure node/npm is installed on your system. Goto:
   https://nodejs.org/en/download/package-manager
2. Make sure to set your preferred console text editor (I recommend NANO)
   ```sh
   export EDITOR=nano
   export VISUAL="$EDITOR"
   ```
3. `npm i git-a-readme`


## Preview

<p align="center">
    <img src="./preview.png">
    </p>


## Usage

- If `git-a-readme` is in the root directory of your project type `npm start` into the terminal and then follow the prompts to create readme file.
- If `git-a-readme` is in your `node_modules` folder from npm install type: `node node_modules/git-a-readme/index.js` and follow the prompts from there.
- Add as a `package.json` run script. Insert `"readme": "node ./node_modules/git-a-readme/index.js"` into scripts section of `package.json`


## License

[MIT](http://choosealicense.com/licenses/mit/)

A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

## Contributing

Contributions are very welcomed, however please follow the below
guidelines.

- First open an issue/pull request describing the bug or enhancement so it
  can be discussed.
- Create a pull request with your changes against the main branch.
- Match current naming conventions as closely as possible, and stay
  within the scope of the description for the project.


## Tests

Tested on Debian Linux (Raspbian OS / Raspberry Pi 4), and macOS.

## Questions

**If you have any questions feel free to use the links below:**

GitHub Profile: https://github.com/shindekokoro

Email: brian.whisler@gmail.com

