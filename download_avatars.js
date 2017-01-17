var request = require('request');
var https = require('https');

var GITHUB_USER = "irene-webmaster";
var GITHUB_TOKEN = "d7888ba3b192390894c72e3a6ec33dc2c6e28988";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      cb(null, JSON.parse(body));

      var data = JSON.parse(body);
      data.forEach(function(x){
        console.log(x.avatar_url);
      });
    }
  })
}


getRepoContributors("nodejs", "node", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});