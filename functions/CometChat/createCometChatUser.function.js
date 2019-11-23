const functions = require("firebase-functions");
const request = require("request");

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
    // these are the options to create the authtoken for the user
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
    // creating the user on cometChat
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    });

    // this is creating the user's auth token
    request(options1, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });


    var cometChatUser = CometChat.getUser(user.uid).then(
      cometChatUser => {
        console.log("User details fetched for user:", user);
      },
      error => {
        console.log("User details fetching failed with error:", error);
      }
    );

});