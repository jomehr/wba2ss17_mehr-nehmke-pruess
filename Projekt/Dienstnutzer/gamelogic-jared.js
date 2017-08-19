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





//- logicdata.games[i][1] get auf urls aller spiele, daten sind array in nem array, i beschreibt länge(spielanzahl), zweite stelle im array (ist bei 1 steht die id)
//- es werden alle 60 sekunden daten ausgegeben
//- in der gabelogik kann kein faye benutzt werden für eine nachricht, dass das Spiel gestartet ist
//- die logik wird in den dienstnutzer kopiert
//- erste hinweis wird ausgespuckt
//- bis jetzt ist es nur serverseitig über die console. muss noch an den clint weitergeleitet werden

//- faye
//- client weiterleitung


//GET clues ? gameid=dfhjjdfk & lon=239 & lat=3478 & userid=jsddsj
//-> spiel mit dieser gameid schon gestartet?
//-> gibt es zu diesen Koordinaten und diesem Spiel einen Hinweis, den user NOCH NICHT
//bekommen hat UND der in der Reihenfolge als nächstes dran inspect
//-> ist clueId und participantId in Spiel mit der gameId vorhanden; wenn ja, gib Hinweis an participantId aus

//PATCH User Koordinaten
//checkt last_clue um heraus zu finden, ob er den Hinweis in der Nähe bekommen kann (nächster Hinweis)
//Ort und wie weit fortgeschritten

//app.patch('/games/:gameid/participants/:participantid', function(req, res) {
//  var data = req.body;
//  var gameid = req.params.gameid;
//  var participantid = req.params.participantid;
//  var url = dURL +  '/games/' + gameid + '/participants/' + participantid;

  //TODO implement PATCH method
//  var options = {
//    uri: url,
//    method: 'PATCH',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    json: data
//  };

//  request(options, function(err, response, body) {
//    console.log('PATCH /games/' + gameid + '/participants/' + participantid + '=> \n', body);

    // game laden zu dem der participant gehört
    // welche clues im game? welche zu den neuen Koordinaten passen
    // UND nächster clue?
    // participant selbst nochmal PATCHen um "last_clue" zu aktualisieren, wenn Spiel schon angefangen

    // ist der letzte Punkte clue erreicht? War das vor Ende des Spiels?

//    res.json(body)
//  });
//});

// GET alle clues die participant bekommen kann (alle clues bis last_clue)
