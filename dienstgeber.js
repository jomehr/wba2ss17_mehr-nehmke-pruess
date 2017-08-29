const express =  require ("express");
const app =  express ();
const fs = require ("fs");
const bodyParser =  require("body-parser");
const async = require ("async")
const uri ='mongodb://tnehmke:fn7Xf8bXfnmongodb@cluster0-shard-00-00-4ioss.mongodb.net:27017,cluster0-shard-00-01-4ioss.mongodb.net:27017,cluster0-shard-00-02-4ioss.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var mongoose = require("mongoose");

const settings = {
  port: process.env.PORT || 3000
};

//routing einbinden
const game = require("./games");
const user =  require("./users");
app.use("/games", game);
app.use("/users", user);

//mongodb verbinden
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useMongoClient: true});

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
  
  res.send('<a href="https://wba2ss17-team38.herokuapp.com/games">games</a><br><a href="https://wba2ss17-team38.herokuapp.com/users">users</a>');
});

//Server auf localhost 127.0.0.1:3000
app.listen(settings.port, function(){
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});
