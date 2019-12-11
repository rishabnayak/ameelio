const functions = require("firebase-functions");
const admin = require('firebase-admin');
const rp = require('request-promise');
serviceAccount = require('./serviceAccountKey.json');

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);
const db = admin.firestore();


module.exports.logInCometChat = functions.https.onCall((data, context) => {
    console.log('the data is ', data);

    var options = {
        method: 'POST',
        url: `https://api-us.cometchat.io/v2.0/users/${data.uid.toLowerCase()}/auth_tokens`,
        headers: {
            appid: '11033fd257dda26',
            apikey: '666dfb04a6f6d3b31ba2c535c0a3f59570c7ecb7',
            'content-type': 'application/json',
            accept: 'application/json'
        }
    };
    // console.log("initializing comet chat")
    // let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
    // CometChat.init('11033fd257dda26',cometChatSettings)
    // .then(() => {
    //         console.log("Initialization completed successfully");
    //     },
    //     error => {
    //     console.log("Initialization failed with error:", error);})
    // .then(
    rp(options)
    .then((result) => {
        console.log(result);
        db.collection("users").doc(data.uid).update({ authToken: JSON.parse(result).data.authToken })
    });


    return true;
});