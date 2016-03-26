var config = {
    appName: 'app',
    dbURL: 'mongodb://localhost:27017/test',
    serverHost: 'http://localhost',
    port: 1337,
};

config.parseServerConfig = {
    appId: 'AppId',
    cloud: __dirname + '/cloud/main.js',
    databaseURI: config.dbURL,
    serverURL: config.serverHost + ':' + config.port + '/parse',
    masterKey: '', //  keep it secret.
    clientKey: 'ClientKey'
};

config.topClientConfig = {
    appkey: '12345678',
    appsecret: 'APP_SECRET',
};

module.exports = config;
