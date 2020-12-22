//var fs = require('fs');
//var readline = require('readline');
var {google} = require('googleapis');

  /**
   * Sample JavaScript code for youtube.activities.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

  channelId = "UCbfYPyITQ-7l4upoX8nvctg"

  function authenticate() {
    return google.gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyAHNhom1b6UPdICNPT_-NUuJuZ33ZxXS34");
    return google.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return google.gapi.client.youtube.activities.list({
      "part": [
        "snippet,contentDetails"
      ],
      "channelId": channelId,
      "maxResults": 25
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  google.gapi.load("client:auth2", function() {
    google.gapi.auth2.init({client_id: "28439916657-0thhvfki53g8tpe4oqaq0isr1vak9ig7.apps.googleusercontent.com"});
  });