const admin = require('firebase-admin');
const functions = require('firebase-functions');
serviceAccount = require('../serviceAccountKey.json');

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
//admin.initializeApp(adminConfig);
const db = admin.firestore();

/*
module.exports.addToDatabase = functions.https.onRequest((req, res) => {
  let data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };

  db.collection('users').doc('LA').set(data).catch((err) => {
    console.log(err)
  });
  db.collection('prisons').doc('LA').set(data).catch((err) => {
    console.log(err)
  });
});*/

/**
* Begin the code where I really parse the csv and do work
*/



/*
 * What to do next time:

  Put the business logic in an "async" function, which gets called from pushTest, which then 
  returns 200--I need to make all the database calls synchronous more or less, so being able to 
  use await would be helpful
 */

module.exports.pushTest = functions.https.onRequest((req, res) => {
 


  let data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };

  let noError = db.collection('users').doc('NY').set(data);
  noError.then(snapshot => {

    const rawBody = req.rawBody
    console.log("raw body:\n" + rawBody)
    let result = CSVToArray(rawBody, undefined)
    console.log("starting parsed")
    console.log("result was \n" + result)
   
    if(!Array.isArray(result))
    {
      console.log("The csv file could not be parsed")
    }
    else if (result.length < 2)
    {
      console.log("The csv file could not be parsed or appeared to be empty")
    }
    else
    {
      //Skipping how we identify what the columns are and assuming a standard order
     for (i = 1; i < result.length; i++)
     {
       const eachField = result[i];
   
       let inmate = {
         birthdate: eachField[2],
         firstname: eachField[0],
         lastname: eachField[1],
         race: eachField[3],
         sex: eachField[4],
       };
       console.log("first name:")
       console.log(inmate.firstname)
       let added = db.collection("prisons").doc("test_prison_1").collection("prisoners").add(inmate).catch(function(error) {
         console.log("\n the error was \n" + error + "\n\n")
       });
     }
   
   
    }
   
      const formattedDate = req.query.this;
      res.status(200).send(formattedDate);
})
  .catch(error => {
    console.log(error)
});

   // [END sendResponse]
});


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
 

/*
Sample triggers

*/

///Google code for one simple http trigger
///Not what we are using right now but maybe a good example

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
/*
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  //const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, "parsing_func.js" //  napshot.ref.toString()
);
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
*/