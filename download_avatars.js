var request = require('request');
var https = require('https');

function getRepoContributors(repoOwner, repoName, cb) {
  var request = require('request');
  request('https://api.github.com/repos/jquery/jquery/contributors', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(null, body);
    }
  })
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});