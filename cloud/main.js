var captcha = require('./captcha.js');

Parse.Cloud.define("sendSMS", function(req, resp){
    var phone = req.params.phone;
    var template = req.params.template;

    captcha.sendSMS(phone, template, function(error, msg) {
        if(!error)
            resp.success();
        else {
            console.log(error);
            resp.error(msg);
        }
    });
});

Parse.Cloud.beforeSave(Parse.User, function(req, resp) {
    var user = req.object;
    captcha.checkSMS(user.get("username"), user.get("captcha"), function(isCorrect) {
        if (isCorrect) {
            user.unset("captcha");
            resp.success();
        } else {
            resp.error("Captcha Not Correct.");
        }
    });
})
