var request = require('request');
var geolib = require('geolib');
var dienstnutzer = require('./dienstnutzer.js');
var dURL = 'https://wba2ss17-team38.herokuapp.com';

module.exports = {
  getgamedata: function ()  {
    var url = dURL+ '/games';
    var startid;
    var date = new Date();
    date.setSeconds(0) && date.setMilliseconds(0);
    var datems = Date.parse(date);
    request.get(url, function(err, res, body) {
      if(err) {
        console.log("ERROR: " + body);
      }
      var logicdata = JSON.parse(body);
      for (var i = 0; i < logicdata.games.length; i++) {    //muss an client gescgickt werden
        if (logicdata.games[i][2] === datems) {
          console.log("Game mit ID " + logicdata.games[i][1] +" startet jetzt!");
          console.log(new Date(logicdata.games[i][2]).toUTCString());
          startid = logicdata.games[i][1];
          gamelogic.startgame(startid);
        } else {    //zum testen hier eig nur meldung "startet nicht"
          console.log("Game mit ID " + logicdata.games[i][1] +" startet nicht!");
          console.log(new Date(logicdata.games[i][2]).toUTCString());
          // startid = logicdata.games[i][1];
          // gamelogic.startgame(startid);
        }
      }
      console.log("----------");
      console.log(new Date(datems).toUTCString());
      console.log("-----------");
    });
  },
  startgame: function(gameid) {
    var cluenumber = 0;
    var gameurl = dURL + '/games/' + gameid;
    console.log("Spiel " + gameid + " startet");
    request.get(gameurl, function(err, res, body) {
      if(err) {
        console.log("ERROR: " + body);
      }
      var cluedata = JSON.parse(body);
      console.log(cluedata.clues[cluenumber]);

      while (cluenumber !=  cluedata.clues.length) {
        request.get(gameurl, function(err, res, body) {
          if(err) {
            console.log("ERROR: " + body);
          }
          var gamedata = JSON.parse(body);
          console.log(gamedata.participants);
          for (var i = 0; i < gamedata.participants.length; i++) {
            var participantid = gamedata.participants[i].userid;
            var userurl = dURL+ '/users/' + participantid;

            request.get(userurl, function(err, res, body) {
              if(err) {
                console.log("ERROR: " + body);
              }
              var userdata = JSON.parse(body);
              console.log(userdata);
              var coords = userdata.coordinates;
              console.log(coords);

              var distance = geolib.getDistance(coords, gamedata.clues[cluenumber].coordinates);
              if (distance <= 10) {
                console.log("DISTANCE: " +distance);
                cluenumber ++;
              }
            });
          }
        });
      }
    });
  }
  // getuserdata: function(userid) {
  //   url = dURL+ '/users/' + userid;
  //   request.get(url, function(err, res, body) {
  //     if(err) {
  //       console.log("ERROR: " + body);
  //     }
  //     var userdata = JSON.parse(body);
  //     var coords = userdata.coordinates;
  //     return coords.push(userdata.coordinates);
  //   });
  // },
  // getcluedata: function(gameid, cluenumber) {
  //   var clueurl = dURL + '/games/' + gameid + '/clues/';
  //   request.get(clueurl, function(err, res, body) {
  //     if(err) {
  //       console.log("ERROR: " + body);
  //     }
  //     var cluedata = JSON.parse(body);
  //     var clue = cluedata[cluenumber];
  //     //console.log(cluedata[cluenumber]);
  //     return clue;
  //   });
  // }
}
