/*global requirejs,define,fs*/
define([
    'commander',
    'fs',
    'path',
    './config',
], function(program, fs, path, config) {
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

        ask: function(question, callback, password) {
            var that = this;

            if (password) {
                program.password(question, function(answer) {
                    if (answer.length > 0) {
                        callback(answer);
                    } else {
                        that.ask(question, callback, true);
                    }
                });
            } else {
                program.prompt(question, function(answer) {
                    if (answer.length > 0) {
                        callback(answer);
                    } else {
                        that.ask(question, callback);
                    }
                });
            }
        },

        setup: function(options) {
            var that = this;
            this.ask('Flowdock subpath URL (company/flow): ', function(answer) {
                that.answers.url = 'https://api.flowdock.com/flows/' + answer;
                that.ask('Username: ', function(answer) {
                    that.answers.user = answer;
                    that.ask('Password: ', function(answer) {
                        that.answers.pass = answer;
                        process.stdin.destroy();
                        that.saveConfig(options);
                    }, true);
                });
            });
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

        saveConfig: function(options) {
            var configFile = {},
                auth;

            if (this.answers.url) {
                if (!/\/$/.test(this.answers.url)) {
                    this.answers.url += '/';
                }
            }

            if (this.answers.user && this.answers.pass) {
                // Basic Auth Format
                this.answers.token = this.answers.user + ':' + this.answers.pass;

                auth = {
                    url: this.answers.url,
                    user: this.answers.user,

                    // Basic auth standard
                    token: Buffer.from(this.answers.token).toString('base64')
                };

                delete this.answers.pass;
            }

            if (options.verbose) {
                console.log(options);
            }

            configFile.auth = auth;
            fs.writeFileSync(this.fullPath, JSON.stringify(configFile, null, 2));
            console.log('Configuration stored to ' + this.fullPath);
        }
    };

    return Auth;

});
