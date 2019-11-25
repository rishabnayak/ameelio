const functions = require("firebase-functions");
const request = require("request");
const async = require("async");

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
    console.log(' we are registering: ', body);

    async.waterfall([
        function firstStep(done){
            console.log('we are in first step')
            done(null, httpRequest(options, 'making user'))

        }, 
        function secondStep(previousResult, done){
            console.log('we are in the second step and the previousResult is: ', previousResult);
            done(null, httpRequest(options1, 'making auth token'));
        },
        function thirdStep(previousResult, done){
            console.log('we are in third step and the previousResult is: ', previousResult);
            console.log('we are done');
            done(null);
        }
        ]);

    async function httpRequest(options, description){
        console.log("on track to ", description, ' with ', options);
        var req = await request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log('the error for', description, ' is: ', error)
                console.log('the message for', description, ' is: ', response)
                console.log('the body for', description, '  is ', body);
            });

        console.log('we have req being: ', req)
    }

    return true;

});