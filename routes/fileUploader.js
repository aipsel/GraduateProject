var multer = require('multer');
var image = multer({ dest: 'uploads/iamges'});
var code = multer({ dest: 'uploads/code'});

function upload(req, resp) {
    var type = req.params['type'];
    if (type === 'image') {
        image(req, resp, function (err) {
            if (err) {
                resp.send(JSON.stringify({
                    status: -1,
                    msg: "save file error: " + err,
                }));
                return;
            }
            // file saved.
            resp.send(JSON.stringify({
                status: 0,
                url: 'images/' + req.file.filename,
            }));
        });
    } else if (type === 'code') {
        code(req, resp, function (err) {
            if (err) {
                resp.send(JSON.stringify({
                    status: -1,
                    msg: "save file error: " + err,
                }));
                return;
            }
            // file saved.
            resp.send(JSON.stringify({
                status: 0,
                url: 'code/' + req.file.filename,
            }));
        });
    }
    send('{"status": 0, "msg": "OK"}');
}

function get(req, resp) {
    var path = req.params['type'] + '/' + req.params['name'];
    var options = {
        root: __dirname + '/uploads/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-filetype': req.params['type'],
        }
    };
    resp.sendFile(path, options, function (err) {
        if (err) {
            console.log("file not found: " + err);
            resp.status(err.status).end();
        }
    });
}

module.exports = {
    upload: upload,
    get: get,
}
