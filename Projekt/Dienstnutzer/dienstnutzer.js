var express = require('express'),
    http = require('http'),
    faye = require('faye'),       //modul zur Realisierung von publish subscribe
    request = require('request');
var app = express();
const bodyParser =  require("body-parser");

//bodyparser für json und html einbinden
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var dHost = 'http://localhost';    //Ziel-URL vom Dienstgeber, falls er lokal ist
var dPort = 3000;
var dURL = 'https://wba2ss17-team38.herokuapp.com'; //Ziel-URL zum Dienstgeber, falls er deployed ist

const settings = {
  port: process.env.PORT || 8080,       //<- sollte eigentlich Port 8080!!! wirft jedoch Fehler!
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

  client.publish( "/news", {text: "Game wurde geupdated"})
 .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

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
app.get('/game/:gameid', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/game/' + gameid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf Clues eines bestimmten Game
app.get('/game/:gameid/clues', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/game/' + gameid + '/clues/';

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
  var url = dURL +  '/game/' + gameid + '/clues/' + clueid;

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
  var url = dURL +  '/game/' + gameid + '/clues/' + clueid + '/media/';

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
  var url = dURL +  '/game/' + gameid + '/clues/' + clueid + '/media/' + mediaid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf alle Teilnehmer eines bestimmten Game
app.get('/game/:gameid/participants', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/game/' + gameid + '/participants/';

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
  var url = dURL +  '/game/' + gameid + '/participants/' + participantid;

  //TODO implement GET Request
  request.get(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  });
});

//GET Request auf POI eines bestimmten Game
app.get('/game/:gameid/poi', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/game/' + gameid + '/poi/';

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

  client.publish( "/news", {text: "Ein neuer User wurde hinzugefügt!"})
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

app.post('/game', function(req, res) {
  var url = dURL + '/game/';
  //var ressourceURI = helper.pathJoin(config.remoteService.url, "game");
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  client.publish( "/game", data)
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });
   client.publish( "/news", {text: "Ein neues Spiel wurde hinzugefügt!"})
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

app.post('/game/:gameid/clues', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/game/' + gameid + '/clues/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  client.publish( "/news", {text: "Neuer hinweis in game "+gameid+" wurde hinzugefügt!"})
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

app.post('/game/:gameid/clues/:cluesid/media', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL +  '/game/' + gameid + '/clues/' + clueid + '/media/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  client.publish( "/news", {text: "Beim Spiel "+gameid+" wurde den Hinweisen neue Media hinzugefügt!"})
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

app.post('/game/:gameid/participants', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/game/' + gameid + '/participants/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  client.publish( "/news", {text: "Game "+gameid+" ist ein neuer Spieler beigetreten!"})
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

app.post('/game/:gameid/poi', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL +  '/game/' + gameid + '/poi/';
  var data = req.body;
  //TODO implement POST method
  var options = {
    uri: url,
    method: 'POST',
    json: data
  }

  client.publish( "/news", {text: "Poi wurde geupdated"})
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

  client.publish( "/news", {text: "Game "+gameid+" wurde gelöscht"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid/clues/:clueid', function(req, res) {
  var gameid = req.params.gameid;
  var clueid = req.params.clueid;
  var url = dURL + '/game/' + gameid + '/clues/' + clueid;

  client.publish( "/news", {text: "Hinweise von game "+gameid+" wurde geupdated"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

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

  client.publish( "/news", {text: "Beim Spiel "+gameid+" wurde in den Hinweisen Media entfernt!"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid/participants/:participantid', function(req, res) {
  var gameid = req.params.gameid;
  var participantid = req.params.participantid;
  var url = dURL + '/game/' + gameid + '/participants/' + participantid;

  client.publish( "/news", {text: "Beim Spiel "+gameid+" nimmt der Spieler "+participantid+" nicht mehr teil!"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    res.json(body);
  });
});

app.delete('/game/:gameid/poi/', function(req, res) {
  var gameid = req.params.gameid;
  var url = dURL + '/game/' + gameid + '/poi/';

  client.publish( "/news", {text: "Beim Spiel "+gameid+" wurden Points of Interest gelöscht!"})
  .then(function() {
    console.log("Message received by server");
  }, function(error) {
    console.log("Error while publishing: " + error.message);
  });

  //TODO implement DELETE Method
  request.delete(url, function(err, response, body) {
    body = JSON.parse(body);
    res.json(body);
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
/*
//FAYE-Teil bei PATCH
  client.publish('/news', {text: 'User wurde geändert.'})
  .then(function() {
    console.log('Message received by server!');
  }, function(error) {
    console.log('There was an error publishing:' + error.message);
  });
  */
  request(options, function(err, response, body) {
    console.log('PATCH /users/' + userid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/game/:gameid', function(req, res) {
  var data = req.body;
  var gameid = req.params.gameid;
  var url = dURL +  '/game/' + gameid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };

//FAYE-Teil bei PATCH
  client.publish('/news', data)
  .then(function() {
    console.log('Message received by server!');
  }, function(error) {
    console.log('There was an error publishing:' + error.message);
  });

  request(options, function(err, response, body) {
    //console.log('PATCH /game/' + gameid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/game/:gameid/clues/:clueid', function(req, res) {
  var data = req.body;
  var gameid = req.params.userid;
  var clueid = req.params.clueid;
  var url = dURL + '/game/' + gameid + '/clues/' + clueid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };
/*
//FAYE-Teil bei PATCH
  client.publish('/news', {text: 'User wurde geändert.'})
  .then(function() {
    console.log('Message received by server!');
  }, function(error) {
    console.log('There was an error publishing:' + error.message);
  });
  */
  request(options, function(err, response, body) {
    console.log('PATCH /game/' + gameid + '/clues/' + clueid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/game/:gameid/clues/:clueid/media/:mediaid', function(req, res) {
  var data = req.body;
  var gameid = req.params.userid;
  var clueid = req.params.clueid;
  var mediaid = req.params.mediaid;
  var url = dURL + '/game/' + gameid + '/clues/' + clueid + '/media/' + mediaid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };
/*
//FAYE-Teil bei PATCH
  client.publish('/news', {text: 'User wurde geändert.'})
  .then(function() {
    console.log('Message received by server!');
  }, function(error) {
    console.log('There was an error publishing:' + error.message);
  });
  */
  request(options, function(err, response, body) {
    console.log('PATCH /game/' + gameid + '/clues/' + clueid + '/media/' + mediaid + '=> \n', body);
    res.json(body)
  });
});

app.patch('/game/:gameid/participants/:participantid', function(req, res) {
  var data = req.body;
  var gameid = req.params.gameid;
  var participantid = req.params.participantid;
  var url = dURL +  '/game/' + gameid + '/participants/' + participantid;

  //TODO implement PATCH method
  var options = {
    uri: url,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };
/*
//FAYE-Teil bei PATCH
  client.publish('/news', {text: 'User wurde geändert.'})
  .then(function() {
    console.log('Message received by server!');
  }, function(error) {
    console.log('There was an error publishing:' + error.message);
  });
  */
  request(options, function(err, response, body) {
    console.log('PATCH /game/' + gameid + '/participants/' + participantid + '=> \n', body);
    res.json(body)
  });
});

// //let the express-App listen on a given Port
// var server = http.createServer(app, function(){
//   console.log("Listening on http://localhost:" + settings.port);
// });



//Dienstnutzer über Port 8080 mittels express zur Verfügung stellen
// app.listen(settings.port, function(){
//   console.log("Dienstnutzer ist nun auf Port "+settings.port+" verfügbar.");
// });

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
client.subscribe("/game", function(message) {
  console.log(message);
});
