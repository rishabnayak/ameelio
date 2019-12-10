const functions = require("firebase-functions");
const rp = require('request-promise');
serviceAccount = require('./serviceAccountKey.json');

module.exports.logInCometChat = functions.https.onCall((data, context) => {
    console.log('the data is ', data);
    // http options to create auth Token
    var options = {
        method: 'POST',
        url: `https://api-us.cometchat.io/v2.0/users/${data}/auth_tokens`,
        headers: {
            appid: '11033fd257dda26',
            apikey: '666dfb04a6f6d3b31ba2c535c0a3f59570c7ecb7',
            'content-type': 'application/json',
            accept: 'application/json'
        }
    };
    // creating auth token and then signing in
    // rp(options);
    rp(options).then(data => function(){
     let authToken = JSON.parse(data).data.authToken;
     console.log('the auth token is ', authToken)
         CometChat.login(authToken).then(
            User => {
              console.log("Login successfully:", { User });
              // User loged in successfully.
            },
            error => {
              console.log("Login failed with exception:", { error });
              // User login failed, check error and take appropriate action.
            }
          );
    });

    return true;
});