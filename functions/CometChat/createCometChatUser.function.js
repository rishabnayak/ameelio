const functions = require("firebase-functions");
const admin = require('firebase-admin');
const rp = require('request-promise');
serviceAccount = require('./serviceAccountKey.json');

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);
const db = admin.firestore();

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

    rp(options).then(() => {
        rp(options1).then((data) => {
            db.collection("users").doc(user.uid).update({ authToken: JSON.parse(data).data.authToken })
        });
    });

    return true;
});