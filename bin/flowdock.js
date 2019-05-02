#!/usr/bin/env node

var requirejs = require('requirejs');

// API Documenation Links:
// https://www.flowdock.com/api
//

requirejs.config({
    baseUrl: __dirname
});

requirejs([
    'commander',
    '../lib/config',
    '../lib/auth',
    '../lib/flowdock/message',
], function(program, config, auth, message) {

    program
        .version('v1.0.0');

    program
        .command('message')
        .description('Post a message')
        .option('-m, --message <string message>', 'Message to post', String)
        .option('-t, --tags <tags>', 'Tags to add to thread post', String)
        .option('-v, --verbose', 'verbose output')
        .action(function(options) {
               message.create(options);
        });

    program
        .command('config')
        .description('Change configuration')
        .option('-c, --clear', 'Clear stored configuration')
        .option('-v, --verbose', 'verbose debugging output')
        .action(function(options) {
            if (options.clear) {
                auth.clearConfig();
            } else {
                auth.setup(options);
            }
        }).on('--help', function() {
            console.log('  Config Help:');
            console.log();
            console.log('    Flowdock sub URL: company/flow -NOTE:Do not include protocol and flowdock.com url');
            console.log('    Username: user (for user@foo.bar)');
            console.log('    Password: Your password - NOTE: this will be base64 encoded and stored as a token');
            console.log('');
        });

    program.parse(process.argv);

    if (program.args.length === 0) {
        console.log("\nYour first step is to run `flowdock config`.\n");
        program.help();
    }

});
