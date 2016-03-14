var config = require('../config.js');
var ParseServer = require('parse-server').ParseServer;

module.exports = new ParseServer(config.parseServerConfig);
