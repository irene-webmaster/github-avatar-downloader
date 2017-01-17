var request = require('request');
var https = require('https');

var GITHUB_USER = "irene-webmaster";
var GITHUB_TOKEN = "d7888ba3b192390894c72e3a6ec33dc2c6e28988";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  request.get(requestURL)
         .on('error', function (err) {
           console.log(err);
         })
         .on('response', function (response) {
           // console.log(response);
           cb(null, response);
         });
}


getRepoContributors("nodejs", "node", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});