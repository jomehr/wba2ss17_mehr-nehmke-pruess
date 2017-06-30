const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");
const fs = require("fs");

const ressourceName ="game";

//log mit pfad und zeit
// router.use(function(req, res, next) {
//   var time = new Date();
//   console.log("Time: " + time);
//   console.log("Request-Pfad in /game: " + req.path);
//   next();
// });

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get("/listGames", function(req, res) {
  // res.format({
  //   "application/json": function() {
  //     var data = require("./games.json");
  //     res.json(data);
  //   }
  // });
  fs.readFile(__dirname + "/" + "games.json", "utf-8", function(err, data) {
    console.log(data);
    res.json(data);
  });
});

router.get("/create", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

router.post("/created", function(req,res) {
  //console.log(req.body);
  fs.readFile(__dirname + "/testgame.json", "utf-8", function(err, data) {
    if(err) throw err;
    console.log("gelesen wird: " + data);
    //var json = JSON.parse(data);

    games = {
      "games": [
        {
          //id: gameid,
          "titel": req.body.titel,
          "description": req.body.description,
          "creator": req.body.creator,
          "creationdate": req.body.creationdate,
          "expirationdate": req.body.expirationdate,
          "reward": req.body.reward
        }
      ]
    };
    //json.push(json + games.games);
    var write = JSON.stringify(games, null, 4)
    fs.writeFile(__dirname + "/testgame.json", write, function(err){
       if (err) throw err;
       console.log("geschrieben wird" + write);
    });
    res.end(write);
  // for (var i = 0; i < games.games.length; i++) {
  //   var gameid = games.id + 1;
  // };
  //var tmp = JSON.stringify(games, null, 4);
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

router.get("/test", function(req, res) {
  fs.readFile(__dirname + "/" + "testgame.json", "utf-8", function(err, data) {
    console.log(data);
    res.json(data);
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

router.post("/", function(req, res) {
  console.log(req.body);
  var tmp = JSON.stringify(req.body, null, 4);
  fs.writeFile(__dirname + "/gamestest.json", tmp, function(err){
     if (err) throw err;
  });
  res.end(tmp);
});

router.post("/:gameId/clues/", function(req, res) {
  console.log(req.body);
  var tmp = JSON.stringify(req.body, null, 4);
  fs.writeFile(__dirname + "/clues.json", tmp, function(err){
     if (err) throw err;
  });
  res.end(tmp);
});

module.exports = router;
