const express =  require ("express");
const app =  express ();
const fs = require ("fs");
const bodyParser =  require("body-parser");
const async = require ("async");
const jwt = require('jsonwebtoken');
const config = require('./config');
const uri ='mongodb://tnehmke:fn7Xf8bXfnmongodb@cluster0-shard-00-00-4ioss.mongodb.net:27017,cluster0-shard-00-01-4ioss.mongodb.net:27017,cluster0-shard-00-02-4ioss.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useMongoClient: true});

const settings = {
  port: process.env.PORT || 3000,
  datafile: "./testgame.json",
};




//routing einbinden
const game = require("./game");
const user =  require("./users");
app.use("/game", game);
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

//statischer Ordner (klappt noch nicht)
//app.use(express.static("game"));





//REST methods
app.get("/", function(req, res) {
  res.links ( {
    next: "http://localhost:3000/game"
  });
  res.send("/game für Spieldaten und /user für Userdaten");
});

//Server auf localhost 127.0.0.1:3000
app.listen(settings.port, function(){
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});
