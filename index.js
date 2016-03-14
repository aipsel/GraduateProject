var express = require('express');
var ParseServer = require('./routes/ParseServer.js');

var app = new express();

app.use('/parse', ParseServer);
app.use('*', function(req, resp) {
    resp.send('{"msg":"default page."}');
});

app.listen(8080, function() {
    console.log('Server is running on 8080...');
});
