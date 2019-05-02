/*global requirejs,define,fs*/
define([
    'inquirer',
    'fs',
    'path',
    './config',
], function(inquirer, fs, path, config) {
    var Auth = {
        fullPath: config.file,
        answers: {},

        loadConfig: function() {
            if (fs.existsSync(this.fullPath)) {
                configObject = JSON.parse(fs.readFileSync(this.fullPath, 'utf-8'));
                config.auth = configObject.auth;
                return true;
            } else {
                return false;
            }
        },

        setup: function(options) {
            var that = this;
            var questions = [{
                    type: 'input',
                    name: 'flow',
                    message: 'Flowdock subpath:'
                },
                {
                    type: 'input',
                    name: 'user',
                    message: 'Username:'
                },
                {
                    type: 'password',
                    name: 'pass',
                    message: 'Password:',
                    mask: '*'
                }
            ];

            inquirer.prompt(questions)
                //.then(answers => console.log(JSON.stringify(answers, null, ' ')));
               .then(answers => this.saveConfig(answers));
        },

        clearConfig: function() {
            var that = this;

            console.log(this.fullPath);
            if (!fs.existsSync(this.fullPath)) {
                if (fs.existsSync(path.basename(this.fullPath))) {
                    fs.rmdirSync(path.basename(this.fullPath));
                }
                console.log('There is no stored data. Skipping.');
            } else {
                program.confirm('Are you sure? ', function(answer) {
                    if (answer) {
                        fs.unlinkSync(that.fullPath);
                        if (fs.existsSync(path.basename(that.fullPath))) {
                            fs.rmdirSync(path.basename(that.fullPath));
                        }
                        console.log('Configuration deleted successfully!');
                    }
                    process.stdin.destroy();
                });
            }
        },

        saveConfig: function(answers) {

            var configFile = {},
                auth;

            var token = answers.user + ':' + answers.pass;

            auth = {
                url: 'https://api.flowdock.com/flows/' + answers.flow,
                user: answers.user,
                // Basic auth standard
                token: Buffer.from(token).toString('base64')
            };

            delete answers.pass;

            configFile.auth = auth;
            fs.writeFileSync(this.fullPath, JSON.stringify(configFile, null, 2));
            console.log('Configuration stored to ' + this.fullPath);
        }
    };

    return Auth;

});
