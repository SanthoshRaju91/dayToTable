/**
* Log4js utils code, to be used in all files.
* Singleton pattern object to be included in files required for logging.
* @methods available after requiring log(), error(), warning(), debug()
*/

var fs = require('fs');
var log4js = require('log4js');
var loggerStream = '';
var config = require('../config/index');

if(fs.existsSync(config.loggerFileLocation)) {
    loggerStream = fs.createWriteStream(config.loggerFileLocation, {flags: 'a', mode: '0o666 '});
    console.log('In true ' + loggerStream.path);
} else {
    loggerStream = fs.createWriteStream(config.loggerFileLocation);
    console.log('In false ' + loggerStream.path);
}

log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: loggerStream.path, category: 'appLog'}
    ]
});

exports.logger = log4js.getLogger('appLog');
