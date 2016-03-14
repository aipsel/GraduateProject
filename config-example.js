var config = {
    dbURL: 'mongodb://localhost:27017/test',
    serverHost: 'http://localhost',
    port: 1337,
};

config.parseServerConfig = {
    appId: 'AppId',
    cloud: './cloud/main.js',
    databaseURL: config.dbURL,
    serverURL: config.serverHost + ':' + config.port + '/parse',
    masterKey: '', //  keep it secret.
};

module.exports = config;
