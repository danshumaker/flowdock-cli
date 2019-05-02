/*global requirejs,console,define,fs*/
// Dan Shumaker
// Documentation: https://www.flowdock.com/api
define([
    'superagent',
    '../config'
], function(request, config) {

    var message = {
        query: null,

        create: function(options) {
            this.query = '/messages';
            var that = this;
            json_package = {
                "event": "message",
                "content": options.message
            };
            if ( options.tags ) {
              json_package.tags = [ options.tags ];
            }
            url = config.config.auth.url + this.query;
            if (options.verbose) {
                console.log(url);
                console.log(json_package);
            }
            request
                .post(url)
                .send(json_package)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic ' + config.config.auth.token)
                .end((err, res) => {
                  //console.log("res = " + res);
                  console.log(res.text);
                  if (err) {
                    console.log("err = " + err);
                    console.log(err);
                  }
                });
        },
    };
    return message;

});
