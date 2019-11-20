const functions = require("firebase-functions");
const request = require("request");

module.exports.createCometChatUser = functions.auth.user().onCreate((user) => {
    var body = {
        uid: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email,
        metadata: user.metadata,
    }
    var options = {
        method: 'POST',
        url: 'https://api-us.cometchat.io/v2.0/users',
        headers: {
            appid: '11033fd257dda26',
            apikey: '666dfb04a6f6d3b31ba2c535c0a3f59570c7ecb7',
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify(body)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    });

    var options1 = {
        method: 'POST',
        url: `https://api-us.cometchat.io/v2.0/users/${user.uid}/auth_tokens`,
        headers: {
            appid: '11033fd257dda26',
            apikey: '666dfb04a6f6d3b31ba2c535c0a3f59570c7ecb7',
            'content-type': 'application/json',
            accept: 'application/json'
        }
    };

    request(options1, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

});