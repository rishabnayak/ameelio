const admin = require('firebase-admin');
const functions = require('firebase-functions');

//Note: if you try to reauthorize this function you will get an error about multiple authorizations
const db = admin.firestore();


function exitWithError(res, message)
{
  console.log(message);
  res.status(200).send("ERROR: " + message);
}

module.exports.csvUploadFunction = functions.https.onRequest((req, res) => 
{ 
    const rawBody = Utf8ArrayToStr(req.rawBody)
    console.log("raw body:\n" + rawBody)

    // Data is send to this function
    // in the form/multipart content type:
    // I do some parsing here for this, it might duplicate
    // google code but I couldn't find their parser
    const standardBoundaryEnd = "---";
    const uidSentinel = "name=\"uid\"";
    const uidDataLoc = rawBody.indexOf(uidSentinel) +  + uidSentinel.length;
    const uidDataEnd = rawBody.indexOf(standardBoundaryEnd, uidDataLoc);
    let uid = rawBody.substring(uidDataLoc, uidDataEnd);
    uid = uid.trim();

    console.log("uid: " + uid);
    if (!uid || uid.length === 0)
    {
      exitWithError("Could not get the UID");
    }
    const adminCallingThis = db.collection("users").where("uid", "==",uid).get(); //get this started and running in the background
    
    const csvSentinel = "Content-Type: text/csv";
    const csvDataLoc = rawBody.indexOf(csvSentinel) + csvSentinel.length;
    const csvDataEnd = rawBody.indexOf(standardBoundaryEnd, csvDataLoc);
    let csvData = rawBody.substring(csvDataLoc, csvDataEnd);
    csvData = csvData.trim(); //there could be extra newlines before and after the boundaries
    console.log("csv data:\n" + csvData);

    let result = CSVToArray(csvData, undefined)
    console.log("starting parsed")
    console.log("result was \n" + result)
    if(!Array.isArray(result))
    {
      console.log("The csv file could not be parsed");
    }
    else if (result.length < 2)
    {
      console.log("The csv file could not be parsed or appeared to be empty");
    }

    //By now hopefully we heard back from the server about who was calling the function
    adminCallingThis.then(function(querySnapshot) 
    {
      //If there's more than one user per UID we have a problem
      if (querySnapshot.docs.length > 1 || querySnapshot.docs.length == 0)
      {
        exitWithError("There was a problem fetching your admin credentials from the server");
      }
      
      const adminsPrison = querySnapshot.docs[0].get("location");
      console.log("The admin is located at prison: " + adminsPrison)

      //Starting the part where we actually add inmates to the database
      let allAsyncAdds = [];
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
         let added = db.collection("prisons").doc(adminsPrison).collection("prisoners").add(inmate).catch(function(error) {
           console.log("\n There was an error adding prisoners to the collection: \n" + error + "\n\n")
         });
         allAsyncAdds.push(added);
       }

        //We need to work for all database adds to finish before we 
        //tell the user everything went. If you don't wait, the database adds
        //will never happen
        Promise.all(allAsyncAdds).then(function(values) 
        {
          console.log("It seems like everything went well")
          //you will eventually want to do something like this, with a url instead
          //res.redirect("http://172.20.10.3:8080/admin");
          res.status(200).send("Everything was probably fine");
        })
     })
    .catch(function(error) 
    {
      console.log("Was unable to find your admin credentials in the datanase, recieved \""
       + error + "\"");
    });
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
 


 // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */
function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
  c = array[i++];
  switch(c >> 4)
  { 
    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += String.fromCharCode(c);
      break;
    case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = array[i++];
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
    case 14:
      // 1110 xxxx  10xx xxxx  10xx xxxx
      char2 = array[i++];
      char3 = array[i++];
      out += String.fromCharCode(((c & 0x0F) << 12) |
                     ((char2 & 0x3F) << 6) |
                     ((char3 & 0x3F) << 0));
      break;
  }
  }

  return out;
}