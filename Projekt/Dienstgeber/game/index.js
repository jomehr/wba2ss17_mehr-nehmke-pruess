const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");
const fs = require("fs");

const ressourceName ="game";

router.use(function timelog(req, res, next) {
  console.log("Game Route Time Log", Date.now());
  next();
});

//errorhandler
router.use(function(err, req, res, next) {
  console.log(err.stack);
  res.end(err.status + " " + err.messages);
});

//log mit pfad und zeit
router.use(function(req, res, next) {
  console.log("Time: %d " + "Request-Pfad: " + req.path, Date.now());
  next();
});

router.get("/", bodyParser.json(), function(req, res) {
  res.format({
    "application/json": function() {
      var data = require("./games.json");
      res.json(data);
    }
  });
  //res.send("Alle games");
});

router.get("/create", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

router.post("/created", bodyParser.json(), function(req,res) {
  console.log(req.body);
  game = {
    titel: req.body.titel,
    description: req.body.description,
    creationdate: req.body.creationdate,
    expirationdate: req.body.expirationdate,
    user: {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
  };
  var tmp = JSON.stringify(game, null, 4);
  console.log(tmp);
  res.end(tmp);
  fs.writeFile(__dirname + "/testgame.json", tmp, function(err){      //JSON-Datai mit Sortiertem String schreiben
     if (err) throw err;
  });
});

router.get("/:gameId", bodyParser.json(), function(req, res) {
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

router.post("/", bodyParser.json(), function(req, res) {
  console.log(req.body);
  var tmp = JSON.stringify(req.body, null, 4);
  res.end(tmp);
  fs.writeFile(__dirname+"/games.json", tmp, function(err){      //JSON-Datai mit Sortiertem String schreiben
     if (err) throw err;
  });
  // res.format({
  //   "application/json": function() {
  //     var data = require("./gametest.json");
  //     res.json(data);
  //   }
  // });
  //console.log(req.body);
  // res.status(200).json({
  //   uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.titel
  // });
});

router.post("/:gameId/clue/", bodyParser.json(), function(req, res) {
  console.log(req.body);
  var tmp = JSON.stringify(req.body, null, 4);
  res.end(tmp);
  fs.writeFile(__dirname + "/clue" + "/clues.json", tmp, function(err){      //JSON-Datai mit Sortiertem String schreiben
     if (err) throw err;
  });
});

module.exports = router;
