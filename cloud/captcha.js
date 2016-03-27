var config = require('../config.js');
var random = require('randomstring');
var TopClient = require('./lib/topClient').TopClient;

var Captcha = Parse.Object.extend("Captcha");
var client = new TopClient(config.topClientConfig);

var smsTemplates = [{
    templateCode: 'SMS_6780369',
    signName: '注册验证',
},{
    templateCode: 'SMS_6780367',
    signName: '变更验证',
}];

function generateCatpcha() {
    return random.generate({
        length: 6,
        charset: 'numeric',
    });
}

function findCaptchaInDB(phone, callback) {
    var query = new Parse.Query(Captcha);
    query.equalTo('phone', phone);
    query.first({
        success: function(result) {
            callback(result);
        },
        error: function(error) {
            console.log('DB Error: ' + error.code + "--" + error.message);
            callback(null);
        },
    })
}

function send(phone, template, callback) {
    findCaptchaInDB(phone, function(captcha) {
        if (!captcha) {
            // not Found, just new one.
            captcha = new Captcha();
            captcha.set("phone", phone);
        }
        captcha.set('captcha', generateCatpcha());
        captcha.save(null, {
            success: function (obj) {
                // send SMS.
                client.execute('alibaba.aliqin.fc.sms.num.send',
                    {
                        sms_free_sign_name: smsTemplates[template].signName,
                        sms_param: {code: obj.get('captcha'), product: config.appName},
                        rec_num: phone,
                        sms_template_code: smsTemplates[template].templateCode,
                    },
                    callback);
            },
            error: function (captcha, error) {
                console.log('DB Error: ' + error.code + '--' + error.message);
                callback(error, "Can't save Captcha.");
            },
        });
    });
}

function check(phone, captcha, callback) {
    findCaptchaInDB(phone, function(captchaObj) {
        if (captchaObj && captchaObj.get('captcha') === captcha) {
            captchaObj.destroy({
                success: function(obj) {
                    callback(true);
                },
                error: function(obj, error) {
                    console.log("Captcha Delete Failed: " + obj.get("phone") + error.code + '--' + error.message);
                    callback(true);
                },
            });
        } else {
            callback(false);
        }
    });
}

module.exports = {
    sendSMS: send,
    checkSMS: check,
};
