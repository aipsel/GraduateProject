var express = require('express');
var config = require('./config.js');
var ParseServer = require('./routes/ParseServer.js');

var app = new express();

app.use('/parse', ParseServer);
app.use('*', function(req, resp) {
    resp.send('{"msg":"default page."}');
});

app.listen(config.port, function() {
    console.log('Server is running on ' + config.port + '...');
});
