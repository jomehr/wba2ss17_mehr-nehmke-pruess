//Modul einbinden
var express = require('express');
//Für Zugriff Objekt an Variable binden
var app = express();

//Konstante zur Konfiguration
const settings ={
  port: 3000;
};

//die Bindung an den Port sollte als letztes im Code stehen
// Start server
app.listen(settings.port, function() {
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});

app.user(function (err, req, res, next){=})
//Log mit Pfad und Zeitangabe für jeden Request-Pfad
app.user(function (req, res, next){=})

//ROUTING
//binden des Pfades an eine Konstante
const users = require('./users');

//express sagen er soll diese Route an die App binden
app.use("/users", users)


//Routing einer GET Methode auf die Ressource foo
app.GET('/foo', function (req, res){
  //hier steht was passieren soll
});

//Routing eines POST-Requests auf die Ressource foo
app.POST('/foo', function (req, res){
  //Dieser Code wird beim Aufruf der REssource ausgeführt, bspw. Veränderungen an Daten
});

//ermöglicht Handler, der bei jeder Methode auf einer Ressource ausgeführt wird
app.ALL('/foo', function (req, res, nex){
  console.log('Laden von Middleware Funktion ...');
  next(); //Weitergabe an den nächsten Handler für diese Route
});

/*
//Auslagern in eigene Ordner ist sinnvoll
const express = require("express");
const router = express.Router();
const bodyParse = require('body-parser');

const ressourceName = "user";

//user ROUTEN
//Definiton GET auf "/user"
router.get('/', function (req, res){
  res.send("Repräsentation aller User");
});

//Bereitstellen des eigenen MOduls um require zum Einbinden verwenden zu können
module.exports = router;
*/


//binden des Pfades an eine Konstante
const user = require('./user');
//mounten des Routers für "user" an die main app
app.user("/user", user)


//Anlegen einse Webservers:
//Webserver bereit für die erster Route und "Hello World"
//GET Request auf Pfad "/"
app.get('/', function (req, res){
  res.send('GET Request Hello World');
});

//das erste Argument gibt den relativen Ressourcenpfad an
//das zweite ARgument ist der Handler bzw. die Funktion die auf
//diese REssource ausgeführt wird
//POST Request auf Pfad "/"
app.post("/", function (req, res){=})

//PUT Request auf Pfad "/user"
app.PUT("/user", function (req, res){=})

//DELETE Request auf Pfad "/user"
app.DELETE("/user", function (req, res){=})

// Request auf Pfad "/"
app.GET("/user/:userID", function (req, res){=})



//Starten des WS und binden an Port 3000
app.listen(settingsport, function(){
  console.log("Express App läuft auf POrt" + settings.port);
})


//Konfiguration des Webservers:
//u.a. über die Funktionen app.use und app.set
//Konstante zur Konfiguration
const settings = {
  port: 3000,
  datafile: "./testdata.json"
  //...
};

//möglicher Errorhandler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.end(err.status + '' + err.messages);
});

//Log mit Pfad un Zeitangabe für jeden Request-Pfad
app.use(function (req, res, next){
  console.log('Time: %d' + 'Request-Pfad:' + req.path, Date.now());
  next();
});











app.get('/api/users', function(req, res, next){
  res.send(users);
});

app.get('/api/repos', function(req, res, next){
  res.send(repos);
});

app.get('/api/user/:name/repos', function(req, res, next){
  var name = req.params.name;
  var user = userRepos[name];

  if (user) res.send(user);
  else next();
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});
