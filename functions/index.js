
///GK: if anyone knows what this does, please comment
const glob = require("glob");
const files = glob.sync("./**/*.function.js", {
  cwd: __dirname,
  ignore: "./node_modules/**"
});


//Rishab I have no idea what this does and you haven't been at meetings
//so trying to work without it. 
/*
files.forEach(file => {
  const functionModule = require(file);
  const functionNames = Object.keys(functionModule);

  functionNames.forEach(functionName => {
    if (
      !process.env.FUNCTION_NAME ||
      process.env.FUNCTION_NAME === functionName
    ) {
      exports[functionName] = functionModule[functionName];
    }
  });
});*/


//
//GK: Google code which I think initializes the database for use on the backend
//

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


console.log("this ran")


///Google code for one simple http trigger
///Not what we are using right now but maybe a good example

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  //const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, "parsing_func.js" /*snapshot.ref.toString()*/);
});


//const parsing_func = require('./parsing_func');
//let action = parsing_func.importable();



///Google code I'm adopting which is a simple function that returns on a value on n http request
exports.returnSimpleValue = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }
  // [END sendError]

  
    const formattedDate = "This is whatever text you want to be in the returned page"
    res.status(200).send(formattedDate);
    // [END sendResponse]
});

exports.pushTest = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  
  /*if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }*/
  // [END sendError]
  console.log(req.body)
    const formattedDate = req.body;
    res.status(200).send(formattedDate);
    // [END sendResponse]
});