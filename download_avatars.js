var request = require('request');
var https = require('https');

if (process.argv.length <= 3) {
    console.log("Please enter GitHub repository owner and name");
    process.exit(-1);
}

var repoOwner = process.argv[2];
var repoName = process.argv[3];

var GITHUB_USER = "irene-webmaster";
var GITHUB_TOKEN = "d7888ba3b192390894c72e3a6ec33dc2c6e28988";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors?per_page=100';
  console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      var avatarUrl = '';
      var filePath = '';
      var data = JSON.parse(body);

      data.forEach(function(x){
        avatarUrl = x.avatar_url;
        filePath = 'avatars/' + x.login + '.jpg';
        downloadImageByURL(avatarUrl, filePath);
      });

      cb(null, JSON.parse(body));
    }
  })
}

function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');

  if(!fs.existsSync('./avatars')) {
    fs.mkdir('./avatars', function(err, data) {
      if (err) {
        return console.error(err);
      }
      console.log('created');
    })
  }
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

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});