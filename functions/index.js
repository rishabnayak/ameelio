
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
//const admin = require('firebase-admin');
//admin.initializeApp();

var firebase = require("firebase")
firebase.initializeApp()
var db = firebase.database();


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




/**
 * Begin the code where I really parse the csv and do work
 */

//Credit to https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
function CSVToArray( strData, strDelimiter ){
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
      (
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
      );


  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;


  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec( strData )){

      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[ 1 ];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
          strMatchedDelimiter.length &&
          strMatchedDelimiter !== strDelimiter
          ){

          // Since we have reached a new row of data,
          // add an empty row to our data array.
          arrData.push( [] );

      }

      var strMatchedValue;

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[ 2 ]){

          // We found a quoted value. When we capture
          // this value, unescape any double quotes.
          strMatchedValue = arrMatches[ 2 ].replace(
              new RegExp( "\"\"", "g" ),
              "\""
              );

      } else {

          // We found a non-quoted value.
          strMatchedValue = arrMatches[ 3 ];

      }


      // Now that we have our value string, let's add
      // it to the data array.
      arrData[ arrData.length - 1 ].push( strMatchedValue );
  }

  // Return the parsed data.
  return( arrData );
}


exports.addToDatabase = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  
  /*if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }*/
  // [END sendError]
  const rawBody = req.rawBody
  let data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };
  
  // Add a new document in collection "cities" with ID 'LA'
  let setDoc = db.collection('cities').doc('LA').set(data);
  
    const formattedDate = req.query.this;
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
  const rawBody = req.rawBody
  console.log("raw body:\n" + rawBody)
  let result = CSVToArray(rawBody, undefined)
  console.log(result)

    const formattedDate = req.query.this;
    res.status(200).send(formattedDate);
    // [END sendResponse]
});