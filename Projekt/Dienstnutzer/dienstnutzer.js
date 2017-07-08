var express = require('express'),
    http = require('http'),
    faye = require('faye'),       //modul zur Realisierung von publish subscribe
    request = require('request');
var app = express();
const bodyParser =  require("body-parser");

var dHost = 'http://localhost';    //Ziel-URL vom Dienstgeber
var dPort = 3000;
var dURL = dHost + ':' + dPort;

const settings = {
  port: process.env.PORT || 8081,       //<- sollte eigentlich Port 8080!!! wirft jedoch Fehler!
};

//log mit Pfad und Zeit
app.use(function(req, res, next) {
  var time = new Date();
  console.log("Time: " + time);
  console.log("Request-Pfad: " + req.path);
  next();
});

//Requests die der Dienstgeber zur Verfügung stellt

//GET-Requests alle Users
app.get('/users', function(req, res) {
  var url = dURL+ '/users';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET-Requests alle Games
app.get('/game', function(req, res) {
  var url = dURL+ '/game';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmten User
app.get('/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var url = dHost + ':' + dPort + '/users/' + userid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmtes Game
app.get('/game/:gameid', function(req, res) {
  var gameid = req.params.gameid;
  var url = dHost + ':' + dPort + '/game/' + gameid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf Clues eines bestimmten Game
app.get('/game/:gameid/clues', function(req, res) {
  var gameid = req.params.gameid;
  var url = dHost + ':' + dPort + '/game/' + gameid + '/clues/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmten Clue eines bestimmten Game
app.get('/game/:gameid/clues/:clueid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dHost + ':' + dPort +  '/game/' + gameid + '/clues/' + clueid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf Media eines bestimmten Clue
app.get('/game/:gameid/clues/:clueid/media', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dHost + ':' + dPort +  '/game/' + gameid + '/clues/' + clueid + '/media/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf ein bestimmtes Media eines bestimmten Clue
app.get('/game/:gameid/clues/:clueid/media/:mediaid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var mediaid = req.params.mediaid;
  var url = dHost + ':' + dPort +  '/game/' + gameid + '/clues/' + clueid + '/media/' + mediaid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf alle Teilnehmer eines bestimmten Game
app.get('/game/:gameid/participants', function(req, res) {
  var gameid = req.params.gameid;
  var url = dHost + ':' + dPort +  '/game/' + gameid + '/participants/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmten Teilnehmer eines bestimmten Game
app.get('/game/:gameid/participants/:participantid', function(req, res) {
  var gameid = req.params.gameid;
  var participantid = req.params.participantid;
  var url = dHost + ':' + dPort +  '/game/' + gameid + '/participants/' + participantid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf POI eines bestimmten Game
app.get('/game/:gameid/poi', function(req, res) {
  var gameid = req.params.gameid;
  var url = dHost + ':' + dPort +  '/game/' + gameid + '/poi/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf ein bestimmten POI eines bestimmten Game
app.get('/game/:gameid/poi/:poiid', function(req, res) {
  var gameid = req.params.gameid;
  var gameid = req.params.poiid;
  var url = dHost + ':' + dPort +  '/game/' + gameid + '/poi/' + poiid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});


//POST Request
//Datensatz ändert sich nicht dynamisch
app.post('/users', function(req, res) {

  var userData = {
        "user_name": "ggseg",
        "first_name": "Jarsegesged",
        "last_name": "fesf",
        "age": 11,
        "id": "fsefsefe"
      }
  var url = dURL + '/users/';

  //TODO implement POST method
  var options = {
    uri: url,                                    //bereits mit /user definiert
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'        //Typ json wird mitgeschickt
    },
    json: userData
  }

  request.post(url, function(err, response, body){
    console.log(body);
    res.json(JSON.parse(body));
  });
});


/*
var options = {
  hostname: 'localhost',
  port: 8081,
  path: '/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

var req = http.request(options, function(res) {   //request inizialisieren
  res.setEncoding('utf8');
  res.on('database', function (body) {
    Console.log('Body: ' + body);
  });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
//write data to request body
req.write(database);                            //write -> Daten übermitteln
req.end();                                      //end -> request abschließen
*/

//DELETE request
app.delete('/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var url = dURL + '/users/' + userid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/game/' + gameid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid/clues/:clueid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL + '/game/' + gameid + '/clues/' + clueid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid/clues/:clueid/media/:mediaid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var mediaid = req.params.mediaid;
  var url = dURL + '/game/' + gameid + '/clues/' + clueid + '/media/' + mediaid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid/participants/:participantid', function(req, res) {
  var gameid = req.params.gameid;
  var participantid = req.params.participantid;
  var url = dURL + '/game/' + gameid + '/participants/' + participantid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid/poi/', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/game/' + gameid + '/poi/';

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

/*
//PATCH HTTP Modul
app.patch('/users/:userid', bodyParser.json(), function(req, res){
  var database = {
      "user_name":    "Glücksbärchie",
      "first_name":   "Jared",
      "last_name":    "Prüß",
      "age":          22,
      "id":           "SkPVA6AXb"
    }

  var userid = req.params.userid;
  var url = dURL + '/users/' + userid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: database
  };
  */




/*
//FAYE-Teil bei PATCH
  client.publish('/news', {text: 'User wurde geändert.'})
  .then(function() {
    console.log('Message received by server!');
  }, function(error) {
    console.log('There was an error publishing:' + error.message);
  });
  request(options, function(err, response, body) {
    res.json(body)
  });
});
*/


/*
//FAYE
var fayeserver = new faye.NodeAdapter({ mount: '/faye', timeout: 25});
fayeserver.attach(http);

//serverseitiger client
var client = new faye.Client('http://localhost:' + config.listeningPort + '/faye');
client.subscribe('/news', function(message) {
  console.log(message.text);
});

//let the express-App listen on a given Port
http.listen(config.listeningPort, function(){
  console.log("Listening on http://localhost:" + config.listeningPort);
});
*/



//Dienstnutzer über Port 8080 mittels express zur Verfügung stellen
app.listen(settings.port, function(){
  console.log("Dienstnutzer ist nun auf Port "+settings.port+" verfügbar.");
});
