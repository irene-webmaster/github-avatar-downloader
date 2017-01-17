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
        url = x.avatar_url;
        filePath = 'avatars/' + x.login + '.jpg';
        // console.log(x.avatar_url);
      });
    }
  })
}

function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');

  fs.mkdir('./avatars', function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log('created');
  })
  request.get(url)
         .on('error', function(err) {
            console.log('Error ', err);
         })
         .on('response', function(response) {
            console.log('Response Status Message: ', response.statusMessage);
         })
         .on('end', function() {
            console.log('Download complete.');
         })
         .pipe(fs.createWriteStream(filePath));
}




getRepoContributors("nodejs", "node", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});