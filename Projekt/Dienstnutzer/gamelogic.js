const request = require('request');
var dURL = 'https://wba2ss17-team38.herokuapp.com';

module.exports = {
  getgamedata: function() {
    var url = dURL+ '/games';
    var logicdata;
    var date = Date.now();
    request.get(url, function(err, response, body) {
      logicdata = JSON.parse(body);
      console.log(logicdata);
      for (var i = 0; i < logicdata.games.length; i++) {
        console.log(logicdata.games[i][2]);
        if (logicdata.games[i][2] === date) {
          console.log("Datum ist gleich und Spiel wird gestartet");
          return;
        } else {
          console.log("Datum stimmt nicht überein");
        }
      }
    });

  }
};
