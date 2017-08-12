var request = require('request');
var dURL = 'https://wba2ss17-team38.herokuapp.com';
var startid;

module.exports = {
  getgamedata: function ()  {
    var url = dURL+ '/games';
    var date = new Date();
    date.setSeconds(0) && date.setMilliseconds(0);
    var datems = Date.parse(date);
    request.get(url, function(err, res, body) {
      if(err) {
        console.log("ERROR: " + body);
      }
      logicdata = JSON.parse(body);
      for (var i = 0; i < logicdata.games.length; i++) {
        if (logicdata.games[i][2] == datems) {
          console.log("Game mit ID " + logicdata.games[i][1] +" startet jetzt!");
          startid = logicdata.games[i][1];
          startgame (startid)
        } else {
          console.log("Game mit ID " + logicdata.games[i][1] +" startet nicht!");
          startid = logicdata.games[i][1];
          gamelogic.startgame(startid);
        }
      }
    });
  },
  startgame: function(id) {
    console.log(id + " hat gestartet");
  }
};
