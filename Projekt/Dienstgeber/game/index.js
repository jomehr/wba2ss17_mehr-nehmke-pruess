const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");
const fs = require("fs");

const ressourceName ="game";

//speicher aktuelle zeit ab
var date = Date();

//errorhandler
router.use(function(err, req, res, next) {
  console.log(err.stack);
  res.end(err.status + " " + err.messages);
});

//log mit pfad und zeit
router.use(function(req, res, next) {
  var time = new Date();
  console.log("Time: " + time);
  console.log("Request-Pfad: " + req.path);
  next();
});

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//nur zum testen, nicht in finaler version benötigt
router.get("/game.html", function(req, res) {
  res.sendFile(__dirname + "/" + "game.html");
});

router.post("/", function(req,res) {
  //read json into buffer and parse it into json object
  fs.readFile(__dirname + "/games.json", "utf-8", function(err, data) {
    if(err) throw err;
    console.log(data);
    var obj = JSON.parse(data);
    //create latest gameid according to array lenght in json
    var gameid = 0;
    for (var i = 0; i < obj.games.length; i++) {
      gameid ++;
    }
    //fill json with request data
    games = {
          "id": gameid,
          "titel": req.body.titel,
          "description": req.body.description,
          "creator": req.body.creator,
          "creationdate": Date(),
          "startdate": req.body.startdate,
          "expirationdate": req.body.expirationdate,
          "reward": req.body.reward,
          "clues": [],
          "participants": []
        };
    //push data into existing json and stringify it for saving
    obj.games.push(games);
    var json = JSON.stringify(obj, null, 4);
    //writes data into exisitng file
    fs.writeFile(__dirname + "/games.json", json, "utf8", function(err){
       if (err) throw err;
    });
    //formats responds to json
    res.format({
      "application/json": function() {
        res.end(json);
      }
    });
  });
});

router.post("/:gameId/clue", function(req,res) {
  //read json into buffer and parse it into json object
  fs.readFile(__dirname + "/games.json", "utf-8", function(err, data) {
    if(err) throw err;
    console.log(data);
    var obj = JSON.parse(data);
    //create latest gameid according to array lenght in json
    var clueid = 0;
    for (var i = 0; i < obj.games[req.params.gameId].clues.length; i++) {
      clueid ++;
    }
    //fill json with request data
    clues = {
          "gameid": req.params.gameId,
          "id": clueid,
          "titel": req.body.titel,
          "description": req.body.description,
          "coordinate": req.body.coordinate,
          "creator": req.body.creator,
          "creationdate": Date()
        };
    //push data into existing json and stringify it for saving
    obj.games[req.params.gameId].clues.push(clues);
    var json = JSON.stringify(obj, null, 4);
    //writes data into exisitng file
    fs.writeFile(__dirname + "/games.json", json, "utf8", function(err){
       if (err) throw err;
    });
    //formats responds to json
    res.format({
      "application/json": function() {
        res.end(json);
      }
    });
  });
});

router.post("/:gameId/participants", function(req,res) {
  //read json into buffer and parse it into json object
  fs.readFile(__dirname + "/games.json", "utf-8", function(err, data) {
    if(err) throw err;
    console.log(data);
    var obj = JSON.parse(data);
    //create latest gameid according to array lenght in json
    var participantid = 0;
    for (var i = 0; i < obj.games[req.params.gameId].participants.length; i++) {
      participantid ++;
    }
    //fill json with request data
    participants = {
          "gameid": req.params.gameId,
          "id": participantid,
          "first_name": req.body.first_name,
          "last_name": req.body.last_name,
          "joindate": Date()
        };
    //push data into existing json and stringify it for saving
    obj.games[req.params.gameId].participants.push(participants);
    var json = JSON.stringify(obj, null, 4);
    //writes data into exisitng file
    fs.writeFile(__dirname + "/games.json", json, "utf8", function(err){
       if (err) throw err;
    });
    //formats responds to json
    res.format({
      "application/json": function() {
        res.end(json);
      }
    });
  });
});

router.get("/", function(req, res) {
  fs.readFile(__dirname + "/" + "games.json", "utf-8", function(err, data) {
    res.format({
      "application/json": function() {
        res.send(data);
      }
    });
  });
});

router.get("/:gameId", function(req, res) {
  //res.send("Game mit ID: " + req.params.gameId);
  res.format({
    "application/json": function() {
      var data = require("./games.json");
      console.log(data.games[req.params.gameId]);
      res.json(data.games[req.params.gameId]);
    }
  });
});

router.get("/:gameId/clues", function(req, res) {
    //res.send("Alle clues zu Game mit ID: " + req.params.gameId);
    res.format({
      "application/json": function() {
        var data = require("./games.json");
        console.log(data.games[req.params.gameId].clues);
        res.json(data.games[req.params.gameId].clues);
      }
    });
});

router.get("/:gameId/:clueId", function(req, res) {
    //res.send("Clue mit ID: " + req.params.clueId);
    res.format({
      "application/json": function() {
        var data = require("./games.json");
        console.log(data.games[req.params.gameId].clues[req.params.clueId]);
        res.json(data.games[req.params.gameId].clues[req.params.clueId]);
      }
    });
});

router.get("/:gameId/:clueId/media", function(req, res) {
  //res.send("Alle Medien zu Hinweis mit ID: " + req.params.clueId);
  res.format({
    "application/jpeg": function() {
      var data = require("./testbild.jpeg");
      //console.log(data.games[req.params.gameId].clues[req.params.clueId]);
      res.json(data);
    }
  });
});

module.exports = router;
