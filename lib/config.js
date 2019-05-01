/*global path, define*/
define([
    'path',
    'fs',
], function(path, fs) {

    var dest_dir = '/.flowdock-cli';
    cfile = getCfgFile(dest_dir);

    if (fs.existsSync(cfile)) {
        defaultConfig = JSON.parse(fs.readFileSync(cfile, 'utf-8'));
        return defaultConfig;
    }
    return createCfgFile(dest_dir);

    function createCfgFile(dest) {
        currentwd = process.cwd();
        console.log("\n\nDid not find config file at " + currentwd + dest + "/config.json.\n");
        console.log("Setting one up in " + currentwd + dest + "/config.json\n");
        dest_dir = currentwd + dest;
        cfile = dest_dir + '/config.json';
        if (!fs.existsSync(dest_dir)) {
            console.log("Making directory ", dest_dir);
            fs.mkdir(dest_dir, function(e) {
                console.log(e)
            });
        }
        return defaultConfig;
    }

    function getCfgPath() {
        return this.dest_dir;
    }

    function getCfgFile(dest_dir) {
        cwd_config = process.cwd() + dest_dir + '/config.json';
        if (fs.existsSync(cwd_config)) {
            return cwd_config;
        } else {
            return false;
        }
    }

});
