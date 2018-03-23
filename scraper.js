// ----------------------------------------------------------------------------
//      from the Twitter Developers page (http://dev.twitter.com).
//          * Consumer Key          (CK-000xxx)
//          * Consumer Secret       (CS-000xxx)
//          * Access Token          (AT-000xxx)
//          * Access Token Secret   (AS-000xxx)
// 
// ----------------------------------------------------------------------------

// ---- Module Imports ----

var http = require('https');            // Secure HTTP
var fs = require('fs');                 // File system 
var oAuth = require('oauth').OAuth;     // OAuth 
const MongoClient = require('mongodb').MongoClient;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:pascalito@localhost:5432/crmDuende');

// ---- Connection to MongoDB Server and Database ----
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
  
    const db = client.db("crmDuende");
  
    //client.close();

    // ---- Connecting Database and Streaming API ----

    //mdb.open(function (err, db) {

    // Attempt to open a connection to database, log message if the connection 
    // has been established.

   // if (!err) { console.log('Connected to streaming_db@localhost:27017'); }

    // Create and connect to collection in the database. If a collection with
    // that name already exists it will be returned, as-is, to the callback
    // function for further updates/inserts/removals.

    db.createCollection('tweets', function (err, collection) {

        // Counter to monitor number of tweets in database;

        var tweetCount = 0;

        var processResponseData = function (data) {

            // Try-Catch block used to detect errors in parsing the response 
            // from Twitter, any data that cannot be parsed is discarded.

            // try {

               // For the purposes of this tutorial, the total size of the 
               // database is limited to 1,000,000 tweets using this if-else 
               // statement. Remove these conditionals, leaving only the body 
                // of the if block, to add an unlimited number of tweets to the
                // database.

                if (tweetCount < 2) {

                    // Parsing the response from Twitter into a JavaScript 
                    // Object.
                    console.log(data);

                    var parsedTweet = JSON.parse(data.toString());

                    console.log(parsedTweet);
                    
                    // Checking to ensure that the parsed tweet object has a 
                    // unique identifier that can be used in the collection.

                    if (parsedTweet.id && parsedTweet.id_str) {

                        // Formatting the parsed Tweet to use the unique 
                        // identifier structure required by MongoDB (object
                        // must have member '_id').

                        parsedTweet._id = new mongo.Long.fromString(parsedTweet.id_str, 10);
                        
                        // Inserting the tweet into the collection. If an error
                        // occurs while inserting it is almost certainly from a
                        // duplicate primary key, in which case the failure to 
                        // insert the tweet is ignored because it already 
                        // exists in the collection.

                        collection.insert(parsedTweet, function (err, doc) {
                            if (err) { 
                                console.log("Error writing document to database. Most likely a duplicate.");
                            }
                        });

                        // Incrementing the counter variable

                        tweetCount++;
                    }
               } else { 

                    // Maximum number of tweets in the collection has been 
                    // reached, closing the connection and exiting the 
                    // Node.js process with status 0 (success).

                    db.close();
                    process.exit(0); 
                }
            // } catch (e) {
                // console.log("Exception thrown: " + e.message);
            // }
        };

        // Creating a new OAuth object. This object has the ability to: 
        //      * request and store authentication credentials;
        //      * make HTTP requests to web services using those credentials;
        //      * add callbacks to handle the response from these requests.

        var oa = new oAuth(
            "https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            "lkEr9otacWSMwP9BWwpXFrSRR",
            "OB37X5Fr5maHAMp1y1wsTdMe1hzEM6JzApptlJC8sSBXllxGvW",
            "1.0A",
            null,
            "HMAC-SHA1"
        );

        // Creating an HTTP GET request to the Twitter Streaming API 'filter'
        // method, limiting the area of interest to the southern portion of
        // Centre County, PA

        var request = oa.get(
            "https://api.twitter.com/1.1/statuses/home_timeline.json?count=10",
            "292688873-tFspEZ5sQfVzcXFKLLB7Ya9OX8KPVyso2m3Rvt1X",
            "qiiQBIY0Bd0d7yRxlFwAy7lK7Q5iTYbqDojffdRMqtrZU"
        );

        // Adding a callback function to handle responses to the request, and 
        // issuing said request to the Twitter API (call to .end() method).

        var data = '';
        request
            .addListener('response', function (response) {
                response.setEncoding('utf8');
                // response.on('data', processResponseData);

                response.addListener('data', function (chunk) {
                    data += chunk;
                });

                response.addListener('end', function () {
                    // TODO: validar cuando data esta vacio
                    var parsedTweets = JSON.parse(data);

                    for (key in Object.keys(parsedTweets)) {
                        parsedTweet = parsedTweets[key];
                        parsedTweet._id = parsedTweet.id_str;
                        collection.insert(parsedTweet, function (err, doc) {
                            if (err) {
                                return console.log("Error writing document to database. Most likely a duplicate.");
                            }

                            return console.log("Tweet inserted");
                        });
                    }
                });
            })
            .end();
    });
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });