/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var fied = require('./promisification');
var pc = require('./promiseConstructor');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  var writeToFile = function (data) {
    return new Promise ( (resolve, reject) => {
      fs.writeFile(writeFilePath, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });

  };

  return pc.pluckFirstLineFromFileAsync(readFilePath)
    .then(fied.getGitHubProfileAsync)
    .then(writeToFile)
    .catch( (err) => {
      console.error(err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
