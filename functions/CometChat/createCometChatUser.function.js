const functions = require("firebase-functions");
const rp = require('request-promise');

module.exports.createCometChatUser = functions.auth.user().onCreate((user) => {
    // user is the firebase user

    // this is the information of the user
    var body = {
        uid: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email,
        metadata: user.metadata,
    }
    // these are the options to create the user
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

    rp(options);

    return true;
});