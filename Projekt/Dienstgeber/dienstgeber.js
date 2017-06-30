
const express =  require ("express");
const app =  express ();
const fs = require ("fs");
const bodyParser =  require("body-parser");
const async = require ("async")

const settings = {
  port: process.env.PORT || 3000,
  datafile: "./testgame.json"
};

 global.gamedata = require("./game/games.json");
 gloabal.userdata = require("./user/users.json")
// //read data from disk to memory
// async.waterfall( [
//   //reads data asynchronous and uses waterfall callback
//   function(callback) {
//     fs.readFile(settings.datafile, "utf-8", function(err, filestring) {
//       callback(null, err, filestring);
//     });
//   },
//   //parse as JSON and modify it to fit data strucuture
//   function(err, filestring, callback) {
//     if (err != null) { callback(null, false); }
//     else {
//       data.game = JSON.parse(filestring).game;
//       callback(null, true);
//     }
//   }
// ], function(err, success) {
//   if (err != null) { success = false }
//   console.log("Gamedaten wurden " + (success ? "erfolgreich" : "nicht erfolgreich") + "in den Speicher geladen.");
// });

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
