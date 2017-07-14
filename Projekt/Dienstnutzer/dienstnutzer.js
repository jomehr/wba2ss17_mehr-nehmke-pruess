var express = require('express'),
    http = require('http'),
    faye = require('faye'),             //modul zur Realisierung von publish subscribe
    request = require('request');
var app = express();
const bodyParser =  require("body-parser");

//bodyparser für json und html einbinden
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var dHost = 'http://localhost';         //Ziel-URL vom Dienstgeber, falls er lokal ist
var dPort = 3000;
var dURL = 'https://wba2ss17-team38.herokuapp.com'; //Ziel-URL zum Dienstgeber, falls er deployed ist

const settings = {
  port: process.env.PORT || 8081,
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
app.get('/games', function(req, res) {
  var url = dURL+ '/games';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmten User
app.get('/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var url = dURL + '/users/' + userid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmtes Game
app.get('/games/:gameid', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/games/' + gameid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf Clues eines bestimmten Game
app.get('/games/:gameid/clues', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/games/' + gameid + '/clues/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmten Clue eines bestimmten Game
app.get('/games/:gameid/clues/:clueid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL +  '/games/' + gameid + '/clues/' + clueid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf Media eines bestimmten Clue
app.get('/games/:gameid/clues/:clueid/media', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL +  '/games/' + gameid + '/clues/' + clueid + '/media/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf ein bestimmtes Media eines bestimmten Clue
app.get('/games/:gameid/clues/:clueid/media/:mediaid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var mediaid = req.params.mediaid;
  var url = dURL +  '/games/' + gameid + '/clues/' + clueid + '/media/' + mediaid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf alle Teilnehmer eines bestimmten Game
app.get('/games/:gameid/participants', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/games/' + gameid + '/participants/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf einen bestimmten Teilnehmer eines bestimmten Game
app.get('/games/:gameid/participants/:participantid', function(req, res) {
  var gameid = req.params.gameid;
  var participantid = req.params.participantid;
  var url = dURL +  '/games/' + gameid + '/participants/' + participantid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf POI eines bestimmten Game
app.get('/games/:gameid/poi', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/games/' + gameid + '/poi/';

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});


//POST Request
//dynamisch
app.post('/users', function(req, res) {
  var url = dURL + '/users/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,                                    //bereits mit /users definiert
    method: 'POST',
    json: data
  }

  client.publish( "/user", {text: "Ein neuer User wurde hinzugefügt!"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  request(options, function(err, response, body){
    console.log(body);
    res.json(body);
  });
});

app.post('/games', function(req, res) {
  var url = dURL + '/games/';
  //var ressourceURI = helper.pathJoin(config.remoteService.url, "game");
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

   client.publish( "/games", {text: "Ein neues Spiel wurde hinzugefügt!"+JSON.stringify(data)})
  .then(function() {
     console.log("Message received by server");
   }, function(error) {
     console.log("Error while publishing: " + error.message);
   });

  request(options, function(err, response, body){
    console.log(body);
    res.json(body);
  });
});

app.post('/games/:gameid/clues', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/games/' + gameid + '/clues/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  request(options, function(err, response, body){
    console.log(body);
    res.json(body);
  });
});

app.post('/games/:gameid/clues/:clueid/media', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL +  '/games/' + gameid + '/clues/' + clueid + '/media/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  request(options, function(err, response, body){
    console.log(body);
    res.json(body);
  });
});

app.post('/games/:gameid/participants', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/games/' + gameid + '/participants/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  client.publish( "/games"+gameid, {text: "Game "+gameid+" ist ein neuer Spieler beigetreten!"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  request(options, function(err, response, body){
    console.log(body);
    res.json(body);
  });
});

app.post('/games/:gameid/poi', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/games/' + gameid + '/poi/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  request(options, function(err, response, body){
    console.log(body);
    res.json(body);
  });
});


//DELETE request
app.delete('/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var url = dURL + '/users/' + userid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    let json = JSON.parse(body);
    res.json(json);
  });
});

app.delete('/games/:gameid', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/games/' + gameid;

  client.publish( "/games"+gameid, {text: "Game "+gameid+" wurde gelöscht"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    let json = JSON.parse(body);
    res.json(json);
  });
});

app.delete('/games/:gameid/clues/:clueid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL + '/games/' + gameid + '/clues/' + clueid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    let json = JSON.parse(body);
    res.json(json);
  });
});

app.delete('/games/:gameid/clues/:clueid/media/:mediaid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var mediaid = req.params.mediaid;
  var url = dURL + '/games/' + gameid + '/clues/' + clueid + '/media/' + mediaid;

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    let json = JSON.parse(body);
    res.json(json);
  });
});

app.delete('/games/:gameid/participants/:participantid', function(req, res) {
  var gameid = req.params.gameid;
  var participantid = req.params.participantid;
  var url = dURL + '/games/' + gameid + '/participants/' + participantid;

  client.publish( "/games"+gameid, {text: "Beim Spiel "+gameid+" nimmt der Spieler "+participantid+" nicht mehr teil!"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    let json = JSON.parse(body);
    res.json(json);
  });
});

app.delete('/games/:gameid/poi/', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/games/' + gameid + '/poi/';

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    let json = JSON.parse(body);
    res.json(json);
  });
});


//PATCH HTTP Modul
app.patch('/users/:userid', function(req, res) {
  var data = req.body;
  var userid = req.params.userid;
  var url = dURL +  '/users/' + userid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };

  request(options, function(err, response, body) {
    console.log('PATCH /users/' + userid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/games/:gameid', function(req, res) {
  var data = req.body;
  var gameid = req.params.gameid;
  var url = dURL +  '/games/' + gameid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };

  request(options, function(err, response, body) {
    console.log('PATCH /games/' + gameid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/games/:gameid/clues/:clueid', function(req, res) {
  var data = req.body;
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL + '/games/' + gameid + '/clues/' + clueid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };

  request(options, function(err, response, body) {
    console.log('PATCH /games/' + gameid + '/clues/' + clueid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/games/:gameid/clues/:clueid/media/:mediaid', function(req, res) {
  var data = req.body;
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var mediaid = req.params.mediaid;
  var url = dURL + '/games/' + gameid + '/clues/' + clueid + '/media/' + mediaid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };

  request(options, function(err, response, body) {
    console.log('PATCH /s/' + gameid + '/clues/' + clueid + '/media/' + mediaid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/games/:gameid/participants/:participantid', function(req, res) {
  var data = req.body;
  var gameid = req.params.gameid;
  var participantid = req.params.participantid;
  var url = dURL +  '/games/' + gameid + '/participants/' + participantid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };

  request(options, function(err, response, body) {
    console.log('PATCH /games/' + gameid + '/participants/' + participantid + '=> \n', body);
    res.json(body)
  });
});


//FAYE
var server = http.createServer(app).listen(settings.port, function(){
  console.log("Listening on http://localhost/:" + settings.port);
});
var fayeserver = new faye.NodeAdapter({ mount: '/faye', timeout: 45});
fayeserver.attach(server);

//serverseitiger client
var client = new faye.Client('http://localhost:' + settings.port +"/faye");
client.subscribe('/news', function(message) {
  console.log(message);
});
client.subscribe("/games", function(message) {
  console.log(message);
});
