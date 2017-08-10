const request = require('request');
var dURL = 'https://wba2ss17-team38.herokuapp.com';

module.exports = {
  getgamedata: function() {
     var url = dURL+ '/games';

    request.get(url, function(err, response, body) {
      var data = JSON.parse(body);
      console.log(data);
    });
  }
};
