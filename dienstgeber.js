const express =  require ("express");
const app =  express ();
const fs = require ("fs");
const bodyParser =  require("body-parser");
const async = require ("async")

const settings = {
  port: process.env.PORT || 3000
};

//routing einbinden
const game = require("./games");
const user =  require("./users");
app.use("/games", game);
app.use("/users", user);

//errorhandler
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.end(err.status + " " + err.messages);
});

//log mit pfad und zeit
app.use(function(req, res, next) {
  var time = new Date();
  console.log("Time: " + time);
  console.log("Request-Pfad: " + req.path);
  next();
});

//bodyparser für json und html einbinden
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//REST methods
app.get("/", function(req, res) {

  res.send('<a href="https://wba2ss17-team38.herokuapp.com/game">games</a><br><a href="https://wba2ss17-team38.herokuapp.com/users">users</a>');
});

//Server auf localhost 127.0.0.1:3000
app.listen(settings.port, function(){
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});
