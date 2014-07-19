/*jslint unparam:true*/
"use strict";
var request = require('request');

//savge cookies 
request = request.defaults({
    jar: true,
    encoding: 'utf-8',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
    }
});


var validHostersCached = [];
var getValidHosters = function (fn) {
    if (validHostersCached.length > 0) {
        return fn(null, validHostersCached);
    }
    request({
        url: 'https://real-debrid.com/api/hosters.php'
    }, function (err, reponse, body) {
        if (err) {
            return fn(err, []);
        }
        validHostersCached = body.substring(1, body.length - 1).split('","');
        fn(err, validHostersCached);
    });
};
exports.getValidHosters = getValidHosters;


/*{
    "error":0,
    "message":"OK",
    "cookie":"auth=6N75EYF47BLG22RVFS2AGM2DVY; ",
    "captcha":0,
    "pin":0
}*/
/*
error = -1: no login / password given
error = 0: you can find the cookie key containing the cookie (like this: "auth=gpdohdpgfhopgdhkgpfdh; ")
error = 1: incorrect password / username
error = 2: suspended / not activated account
error = 3: too many failed logins
error = 4: incorrect captcha answer
*/
var login = function (user, pass, fn) {
    request({
        url: 'https://real-debrid.com/ajax/login.php?user=' + user + '&pass=' + pass,
        json: true
    }, function (err, reponse, data) {
        if (err) {
            if (fn) {
                fn(err);
            }
        } else {
            if (data.error === 0) {
                if (fn) {
                    fn(null);
                }
            } else if (fn) {
                var error = new Error(data.message);
                error.code = data.error;
                fn(error);
            }
        }
    });
};
exports.login = login;

var account = function (fn) {
    request({
        url: 'https://real-debrid.com/api/account.php?out=json',
        json: true
    }, function (err, reponse, data) {
        //console.log(err);
        if (data.error === 1) {
            var error = new Error(data.message);
            error.code = data.error;
            fn(error, null);
        } else {
            fn(null, data);
        }
    });
};
exports.account = account;

var unrestrict = function (link, password, fn) {
    link = encodeURI(link);

    if (!fn || typeof fn !== 'function') {
        fn = password;
        password = '';
    }

    request({
        url: 'https://real-debrid.com/ajax/unrestrict.php?out=json&link=' + link + '&password=' + password,
        json: true
    }, function (err, reponse, data) {
        if (err) {
            return fn(err, null);
        }
        if (data.error > 0) {
            var error = new Error(data.message);
            error.code = data.error;
            fn(error, null);
        } else {
            fn(null, data);
        }
    });
};
exports.unrestrict = unrestrict;