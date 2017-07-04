const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");
const fs = require("fs");
const shortid = require('shortid');
const redis = require("redis");
const client = redis.createClient();
const ressourceName ="game";

//speicher aktuelle zeit ab
var date = Date();

function loadData() {
	//console.log(""+JSON.parse(client.get("gamejson")));
	return JSON.parse(fs.readFileSync(__dirname + '/games.json'))
};

function saveData (data) {
	client.set("gamejson", JSON.stringify(data), redis.print);
	fs.writeFileSync(__dirname + '/games.json', JSON.stringify(data, 0, 4))
};

global.gamedatabase = loadData();

function findGameIndexById (gameId) {
	return gamedatabase.games.findIndex(
		games => games.id === gameId
	);
};

function findClueIndexById (location, clueId) {
	return gamedatabase.games[location].clues.findIndex(
		clues => clues.id === clueId
	);
};

function findParticipantIndexById (location, participantId) {
	return gamedatabase.games[location].participants.findIndex(
		participants => participants.id === participantId
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
  // var gameid = 0;
  // for (var i = 0; i < gamedatabase.games.length; i++) {
  //   gameid ++;
  //}
	var gameid = shortid.generate();
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
  gamedatabase.games.push(games);
  saveData(gamedatabase);
	console.log(gameid);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.send(games);
      }
  });
});

router.post("/:gameId/clue", function(req,res) {
  //create latest gameid according to array lenght in json
  for (var i = 0; i < gamedatabase.games.length; i++) {
		if (gamedatabase.games[i].id == req.params.gameId) {
			break;
		}
  }
	var clueid = shortid.generate();
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
  gamedatabase.games[i].clues.push(clues);
  saveData(gamedatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.send(clues);
    }
  });
});

router.post("/:gameId/participants", function(req,res) {
  //create latest gameid according to array lenght in json
	for (var i = 0; i < gamedatabase.games.length; i++) {
		if (gamedatabase.games[i].id == req.params.gameId) {
			break;
		}
  }
	var participantid = shortid.generate();
  //fill json with request data
  participants = {
        "gameid": req.params.gameId,
        "id": participantid,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
				"username": req.body.username,
        "joindate": Date()
      };
  //push data into existing json and stringify it for saving
  gamedatabase.games[i].participants.push(participants);
  saveData(gamedatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.send(participants);
    }
  });
});

router.get("/", function(req, res) {
  res.format({
    "application/json": function() {
      res.send(gamedatabase);
    }
  });
});

router.get("/:gameId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	console.log("Objekt ist an der Stelle: " + gameIndex);
  if (gameIndex< 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
		let game = gamedatabase.games[gameIndex];
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.get("/:gameId/clues", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	console.log("Objekt ist an der Stelle: " + gameIndex);
  if (gameIndex < 0) {
    res.status(404);
    res.send("Die Hinweise von dem Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
		let game = gamedatabase.games[gameIndex].clues;
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.get("/:gameId/clues/:clueId", function(req, res) {
	let gameIndex = findGameIndexById(req.params.gameId);
  let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
	console.log("Objekt ist an der Stelle: " + gameIndex + "|" + clueIndex);
  if (clueIndex < 0) {
    res.status(404);
    res.send("Der Hinweis mit ID " + req.params.clueId + " existiert noch nicht!");
  } else {
		let game = gamedatabase.games[gameIndex].clues[clueIndex];
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.get("/:gameId/participants/", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	console.log("Objekt ist an der Stelle: " + gameIndex);
  if (gameIndex < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
		let game = gamedatabase.games[gameIndex].participants;
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.get("/:gameId/participants/:participantId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	let participantIndex = findParticipantIndexById(gameIndex, req.params.participantId);
	console.log("Objekt ist an der Stelle: " + gameIndex + "|" + participantIndex);
  if (participantIndex < 0) {
    res.status(404);
    res.send("Der Teilnehmer mit ID " + req.params.participantId + " existiert noch nicht!");
  } else {
		let game = gamedatabase.games[gameIndex].participants[participantIndex];
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
    let gameIndex = findGameIndexById(req.params.gameId);
		console.log("Objekt ist an der Stelle: " + gameIndex);
    if (gameIndex < 0) {
      res.status(404);
      res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
    } else {
      let changes = req.body;
      let gameBefore = gamedatabase.games[gameIndex];
      let gameAfter = Object.assign(gameBefore, changes);
      gamedatabase.games[gameIndex] = gameAfter;
      saveData(gamedatabase);
      res.format({
        "application/json": function() {
          res.json(gameAfter);
        }
      });
    }
  });

router.patch("/:gameId/clues/:clueId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
	console.log("Objekt ist an der Stelle: " + gameIndex + "|" + clueIndex);
  if (clueIndex < 0) {
      res.status(404);
      res.send("Der Hinweis mit ID " + req.params.clueId + " existiert noch nicht!");
    } else {
      let changes = req.body;
      let clueBefore = gamedatabase.games[gameIndex].clues[clueIndex];
      let clueAfter = Object.assign(clueBefore, changes);
      gamedatabase.games[gameIndex].clues[clueIndex] = clueAfter;
      saveData(gamedatabase);
      res.format({
        "application/json": function() {
          res.json(clueAfter);
        }
      });
    }
  });

router.patch("/:gameId/participants/:participantId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	let participantIndex = findParticipantIndexById(gameIndex, req.params.participantId);
  if (participantIndex < 0) {
    res.status(404);
    res.send("Der Teilnehmer mit ID " + req.params.participantId + " existiert noch nicht!");
  } else {
    let changes = req.body;
    let participantBefore = gamedatabase.games[gameIndex].participants[participantIndex];
    let participantAfter = Object.assign(participantBefore, changes);
    gamedatabase.games[gameIndex].participants[participantIndex] = participantAfter;
    saveData(gamedatabase);
    res.format({
      "application/json": function() {
      res.json(participantAfter);
      }
    });
  }
});

router.delete("/:gameId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
  if (gameIndex < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    let game = gamedatabase.games[gameIndex];
    gamedatabase.games.splice(gameIndex, 1);
    saveData(gamedatabase);
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
});

router.delete("/:gameId/clues/:clueId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
  if (clueIndex < 0) {
    res.status(404);
    res.send("Der Hinweis mit ID " + req.params.clueId + " existiert noch nicht!");
  } else {
    let clue = gamedatabase.games[gameIndex].clues[clueIndex];
    gamedatabase.games[gameIndex].clues.splice(clueIndex, 1);
    saveData(gamedatabase);
    res.format({
      "application/json": function() {
        res.json(clue);
      }
    });
  }
});

router.delete("/:gameId/participants/:participantId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	let participantIndex = findParticipantIndexById(gameIndex, req.params.participantId);
  if (participantIndex < 0) {
    res.status(404);
    res.send("Der Teilnehmer mit ID " + req.params.participantId + " existiert noch nicht!");
  } else {
    let participant = gamedatabase.games[gameIndex].participants[participantIndex];
    gamedatabase.games[gameIndex].participants.splice(participantIndex, 1);
    saveData(gamedatabase);
    res.format({
      "application/json": function() {
        res.json(participant);
      }
    });
  }
});

module.exports = router;
