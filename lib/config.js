/*global path, define*/
define([
    'path',
    'fs',
], function(path, fs) {

    var dest_dir = '/.flowdock-cli';
    cfile = getCfgFile(dest_dir);

    if (fs.existsSync(cfile)) {
        defaultConfig = JSON.parse(fs.readFileSync(cfile, 'utf-8'));
        return { 'file': cfile,
                 'config':defaultConfig};
    }
    return createCfgFile(cfile);

    function createCfgFile(cfile) {
        cpath=path.basename(cfile);
        console.log("\n\nDid not find config file:" + cfile);
        console.log("\n\n\tCreating: " + cfile);

        if (!fs.existsSync(cpath)) {
            console.log("Making directory " + cpath);
            fs.mkdir(cpath, function(e) {
                console.log(e)
            });
        }
        return { 'file': cfile, 'config': {} };
    }

    function getCfgPath() {
        return this.dest_dir;
    }

    function getCfgFile(dest_dir) {
      cfile = process.cwd() + dest_dir + '/config.json';
      return cfile
    }

});
