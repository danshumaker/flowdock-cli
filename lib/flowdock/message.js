/*global requirejs,console,define,fs*/
// Dan Shumaker
// Documentation: https://www.flowdock.com/api
define([
    'superagent',
    '../../lib/config'
], function(request, config) {

    var message = {
        query: null,
        table: null,

        create: function(options) {
            this.query = 'messages';
            var that = this;
            console.log("Post a Message");
            json_package = {
                "event": "message",
                "content": options.message
            };
            if (options.verbose) {
                console.log(config.auth.url + this.query);
                console.log(json_package);
            }
            request
                .post(config.auth.url + this.query)
                .send(json_package)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic ' + config.auth.password)
                .then(res => {
                    if (!res.ok) {
                        if (options.verbose) {
                            console.log(res);
                        }
                        console.log(this.query);
                        console.log(JSON.stringify(json_package));
                        return console.log(JSON.stringify(res.body));
                    }
                    console.log("Posted Message to thread " + res.body.thread.id);
                });
        },
    };
    return message;

});
