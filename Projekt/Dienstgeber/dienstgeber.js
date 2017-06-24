
const express =  require ("express");
const app =  express ();
const fs = require ("fs");
const async = require ("async")

const settings = {
  port: 3000,
  datafile: "./testgame.json"
};

global.data = require("./data");
//read data from disk to memory
async.waterfall( [
  //reads data asynchronous and uses waterfall callback
  function(callback) {
    fs.readFile(settings.datafile, "utf-8", function(err, filestring) {
      callback(null, err, filestring);
    });
  },
  //parse as JSON and modify it to fit data strucuture
  function(err, filestring, callback) {
    if (err != null) { callback(null, false); }
    else {
      data.game = JSON.parse(filestring).game;
      callback(null, true);
    }
  }
], function(err, success) {
  if (err != null) { success = false }
  console.log("Gamedaten wurden " + (success ? "erfolgreich" : "nicht erfolgreich") + "in den Speicher geladen.");
});

//routing einbinden
const game = require("./game");
const user =  require("./user");
app.use("/game", game);
app.use("/user", user);

//errorhandler
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.end(err.status + " " + err.messages);
});

//log mit pfad und zeit
app.use(function(req, res, next) {
  console.log("Time: %d " + "Request-Pfad: " + req.path, Date.now());
  next();
});

//statischer Ordner (klappt noch nicht)
//app.use(express.static("game"));

//REST methods
app.get("/", function(req, res) {
  res.send("GET Request");
});

app.post("/", function(req, res) {
  res.send("POST Request");
});

//Server auf localhost 127.0.0.1:3000
app.listen(3000, function(){
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});
