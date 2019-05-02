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
        .version('v0.0.1');

    program
        .command('message')
        .description('Post a message')
        .option('-m, --message <name>', 'Message to post', String)
        .option('-f, --flow <name>', 'flow to post to', String)
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
            console.log('    Password: Your password');
            console.log('');
        });

    program.parse(process.argv);

    if (program.args.length === 0) {
        console.log("\nYour first step is to run `flowdock config`.\n");
        program.help();
    }

});
