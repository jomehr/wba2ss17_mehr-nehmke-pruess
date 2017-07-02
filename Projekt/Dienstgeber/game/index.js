const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");
const fs = require("fs");

const ressourceName ="game";

//speicher aktuelle zeit ab
var date = Date();

function loadData() {
	return JSON.parse(fs.readFileSync(__dirname + '/games.json'))
};

function saveData (data) {
	fs.writeFileSync(__dirname + '/games.json', JSON.stringify(data, 0, 4))
};

global.database = loadData();

function findGameIndexById (gameId) {
	// NOTE: Sicher stellen, dass ALLE IDs Strings sind !!!
	return database.games.findIndex(
		games => games.id === gameId		//=== -> überprüft ob beide Strings sind und beide den selben Index haben
	);
};

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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

//nur zum testen, nicht in finaler version benötigt
router.get("/game.html", function(req, res) {
  res.sendFile(__dirname + "/" + "game.html");
});

router.post("/", function(req,res) {
  //create latest gameid according to array lenght in json
  var gameid = 0;
  for (var i = 0; i < database.games.length; i++) {
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
  database.games.push(games);
  saveData(database);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.send(database.games[gameid]);
      }
  });
});

router.post("/:gameId/clue", function(req,res) {
  //create latest gameid according to array lenght in json
  var clueid = 0;
  for (var i = 0; i < database.games[req.params.gameId].clues.length; i++) {
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
  database.games[req.params.gameId].clues.push(clues);
  saveData(database);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.end(json);
    }
  });
});

router.post("/:gameId/participants", function(req,res) {
  //create latest gameid according to array lenght in json
  var participantid = 0;
  for (var i = 0; i < database.games[req.params.gameId].participants.length; i++) {
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
  database.games[req.params.gameId].participants.push(participants);
  saveData(database);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.end(json);
    }
  });
});

router.get("/", function(req, res) {
  res.format({
    "application/json": function() {
      res.send(database);
    }
  });
});

router.get("/:gameId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  let game = database.games[req.params.gameId];
  if (req.params.gameId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.get("/:gameId/clues", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  let game = database.games[req.params.gameId].clues;
  if (req.params.gameId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.get("/:gameId/:clueId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  let game = database.games[req.params.gameId].clues[req.params.clueId];
  if (req.params.gameId || req.params.clueId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.get("/:gameId/:participantId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  let game = database.games[req.params.gameId].participants[req.params.participantId];
  if (req.params.gameId || req.params.clueId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
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

router.patch("/:gameId", function(req, res) {
    //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
    if (req.params.gameId < 0) {
      res.status(404);
      res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
    } else {
      let changes = req.body;
      let gameBefore = database.games[req.params.gameId];
      let gameAfter = Object.assign(gameBefore, changes);
      database.games[req.params.gameId] = gameAfter;
      saveData(database);
      res.format({
        "application/json": function() {
          res.json(gameAfter);
        }
      });
    }
  });

router.patch("/:gameId/clues/:clueId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  if (req.params.gameId < 0) {
      res.status(404);
      res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
    } else {
      let changes = req.body;
      let clueBefore = database.games[req.params.gameId].clues[req.params.clueId];
      let clueAfter = Object.assign(clueBefore, changes);
      database.games[req.params.gameId].clues[req.params.clueId] = clueAfter;
      saveData(database);
      res.format({
        "application/json": function() {
          res.json(clueAfter);
        }
      });
    }
  });

router.patch("/:gameId/participants/:participantId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  if (req.params.gameId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    let changes = req.body;
    let participantBefore = database.games[req.params.gameId].participants[req.params.participantId];
    let participantAfter = Object.assign(participantBefore, changes);
    database.games[req.params.gameId].participants[req.params.clueId] = participantAfter;
    saveData(database);
    res.format({
      "application/json": function() {
      res.json(participantAfter);
      }
    });
  }
});

router.delete("/:gameId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  if (req.params.gameId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    let game = database.games[req.params.gameId];
    database.games.splice(req.params.gameId, 1);
    saveData(database);
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.delete("/:gameId/clues/:clueId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  if (req.params.gameId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    let clue = database.games[req.params.gameId].clues[req.params.clueId];
    database.games[req.params.gameId].clues.splice(req.params.clueId, 1);
    saveData(database);
    res.format({
      "application/json": function() {
        res.json(clue);
      }
    });
  }
});

router.delete("/:gameId/participants/:participantId", function(req, res) {
  //let gameIndex = findGameIndexById(req.params.gameId); //funktioniert nicht
  if (req.params.gameId < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    let participant = database.games[req.params.gameId].participants[req.params.participantId];
    console.log(participant);
    database.games[req.params.gameId].participants.splice(req.params.participantId, 1);
    saveData(database);
    res.format({
      "application/json": function() {
        res.json(participant);
      }
    });
  }
});


module.exports = router;
