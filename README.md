flowdock-cli
========

[![NPM Version](https://badge.fury.io/js/flowdock-cli.svg)](https://npmjs.org/package/flowdock-cli)
[![Package downloads](http://img.shields.io/npm/dm/flowdock-cli.svg)](https://npmjs.org/package/flowdock-cli)

[flowdock API Reference](https://www.flowdock.com/api)

A flowdock command line interface - A simple script for all the commandline junkies out there.

- Tested Features: (see bin/tests.sh --these all work)
  * Configuration creation
  * Add message to a flow

- TODO - Untested Features:
  * threads comments
  * more features
  * integrate with (convert to) https://www.npmjs.com/package/flowdock

## Installation

Install [node.js](http://nodejs.org/).

Then, in your shell type:

    $ npm install -g flowdock-cli

##### Help

  Many of the commands have "sub" helps to them so if you supply the -h with the command you will see a more complete help than what is printed by the global help below.
  For example:

  ```
    $ flowdock config -h

      Usage: config [options]

      Options:

        -h, --help                 output usage information
        -c, --clear                Clear stored configuration
        -v, --verbose              verbose debugging output

      Config Help:

        flowdock sub_url: company/flow-name
        Username: user (for user@foo.bar)
        Password: Your password

    ```

  The general help is: `flowdock -h`

  ```
  Usage: flowdock [options] [command]

  Commands:

    message <flow> <message>      Create a message in flowdock

    Options:

    -h, --help     output usage information
    -V, --version  output the version number

    ```

## Configuration Setup (Do this first)

    ```
    $ flowdock config
    flowdock suburl: company/flow_name
    Username: xxxxxx
    Password: xxxxxx
    Information stored!
    ```

  This saves your credentials (base64 encoded), and a default working configuration file in your current working directory+ `/.flowdock-cli`.

### Post a flowdock message

	Usage: message [options] [message]
		Options:

		-h, --help                output usage information
		-m, --message <message>   Message to post
		-t, --tags <tags>         Tags to add to post


## MIT License

Copyright (c) 2019 <danpshumaker@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
