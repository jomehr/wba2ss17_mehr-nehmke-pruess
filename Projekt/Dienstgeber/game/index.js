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
  console.log(req.body);
  //res.send("Alle games");
});

router.get("/create", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

router.post("/created", function(req,res) {
  response = {
    titel: res.query.titel,
    description: res.query.description,
    creationdate: res.query.creationdate,
    expirationdate: res.query.expirationdate,
    user: {
      first_name: res.query.first_name,
      last_name: res.query.last_name
    }
  };
  var tmp = JSON.stringify(response, null, 4);
  console.log(tmp);
  res.end(tmp);
  fs.writeFile(__dirname+"/testgame.json", tmp, function(err){      //JSON-Datai mit Sortiertem String schreiben
     if (err) throw err;
  });
});

router.get("/:gameId", function(req, res) {
  // res.format({
  //   "application/json": function() {
  //     var data = require("./gametest.json");
  //
  //     res.json(data.game.id[gameId]);
  //   }
  // });
  res.send("Game mit Titel: " + req.params.gameId);
});

router.get("/:gameId/clue", function(req, res) {
    res.send("Alle clues zu Game mit ID: " + req.params.gameId);
});

router.get("/:gameId/clue/:clueId", function(req, res) {
    res.send("Clue mit ID: " + req.params.clueId);
});

router.get("/:gameId/clue/:clueId/media", function(req, res) {
  res.send("Alle Medien zu Hinweis mit ID: " + req.params.clueId);
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

  res.format({
    "application/json": function() {
      var data = require("./clue/cluetest.json");
      res.json(data);
    }
  });
});

module.exports = router;
