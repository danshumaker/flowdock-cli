/*global requirejs,console,define,fs*/
// Dan Shumaker
// Documentation: https://www.flowdock.com/api
define([
    'superagent',
    '../../lib/config'
], function(request, config) {

    var message = {
        query: null,

        create: function(options) {
            this.query = 'messages';
            var that = this;
            json_package = {
                "event": "message",
                "content": "test",
                "tags": ["#releases"]
            };
            url = config.config.auth.url + this.query;
            if (options.verbose) {
                console.log(url);
                console.log(json_package);
            }
            request
                .post(url)
                .send(json_package)
                .set('Accept', '*/*')
                .set('Connection', 'keep-alive')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic ' + config.config.auth.token)
                .end((err, res) => {
                  console.log(res);
                });
        },
    };
    return message;

});
