const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");
const fs = require("fs");
const shortid = require('shortid')

const ressourceName ="games";

//speicher aktuelle zeit ab
var date = Date();

//Helper-Funktion zum laden der jsons
function loadGameData() {
	return JSON.parse(fs.readFileSync(__dirname + "/games.json"))
};
function loadOverpassData() {
	return JSON.parse(fs.readFileSync(__dirname + "/poi.json"))
};

//Helper-Funktion zum speichern der json
function saveGameData (data) {
	fs.writeFileSync(__dirname + "/games.json", JSON.stringify(data, 0, 4))
};
function saveOverpassData(data) {
	fs.writeFileSync(__dirname + "/poi.json", JSON.stringify(data, 0, 4))
};

//läd jsons in Speicher
global.gamedatabase = loadGameData();
global.poidatabase = loadOverpassData();

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Helper-Funktionen zum finden von Index
function findGameIndexById (gameId) {
	return gamedatabase.games.findIndex(
		games => games.id === gameId
	);
};
function findClueIndexById (gameindex, clueId) {
	return gamedatabase.games[gameindex].clues.findIndex(
		clues => clues.id === clueId
	);
};
function findParticipantIndexById (gameindex, participantId) {
	return gamedatabase.games[gameindex].participants.findIndex(
		participants => participants.id === participantId
	);
};
function findMediaIndexById (gameindex, clueindex, mediaId) {
	return gamedatabase.games[gameindex].clues[clueindex].media.findIndex(
		media => media.id === mediaId
	);
};
function findPoiIndexById (gameId) {
	return poidatabase.poi.findIndex(
		poi => poi.id=== gameId
	);
};

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

//POST Requests
router.post("/", function(req, res) {
	var gameid = shortid.generate();
  //fill json with request data
  games = {
        "id": gameid,
        "titel": req.body.titel,
        "description": req.body.description,
				"endcoordinates": req.body.endcoordinates,
        "creator": req.body.creator,
        "creationdate": Date(),
        "startdate": req.body.startdate,
        "expirationdate": req.body.expirationdate,
				"finished": false,
        "reward": req.body.reward,
				"url": "https://wba2ss17-team38.herokuapp.com/games/" + gameId,
        "clues": [],
        "participants": []
      };
  //push data into existing json and stringify it for saving
  gamedatabase.games.push(games);
  saveGameData(gamedatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.json(games);
      }
  });
});

router.post("/:gameId/clues", function(req, res) {
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
				"gameurl": "https://wba2ss17-team38.herokuapp.com/games/"+req.params.gameId,
        "creationdate": Date(),
				"media": []
      };
  //push data into existing json and stringify it for saving
  gamedatabase.games[i].clues.push(clues);
  saveGameData(gamedatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.json(clues);
    }
  });
});

router.post("/:gameId/participants", function(req, res) {
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
				"gameurl": "https://wba2ss17-team38.herokuapp.com/games/"+req.params.gameId,
        "joindate": Date()
      };
  //push data into existing json and stringify it for saving
  gamedatabase.games[i].participants.push(participants);
  saveGameData(gamedatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.send(participants);
    }
  });
});

router.post("/:gameId/clues/:clueId/media", function(req, res) {
  //check if gameid and clueid exist and save index
	for (var i = 0; i < gamedatabase.games.length; i++) {
		if (gamedatabase.games[i].id == req.params.gameId) {
			break;
		}
	};
  for (var j = 0; j < gamedatabase.games[i].clues.length; j++) {
		if (gamedatabase.games[i].clues[j].id == req.params.clueId) {
			break;
		}
  };
	var mediaid = shortid.generate();
  //fill json with request data
  media = {
        "gameid": req.params.gameId,
				"clueid": req.params.clueId,
        "id": mediaid,
        "titel": req.body.titel,
				"uploader": req.body.uploader,
        "mediaurl": req.body.url,
				"gameurl": "https://wba2ss17-team38.herokuapp.com/games/"+req.params.gameId,
        "creationdate": Date()
      };
  //push data into existing json and stringify it for saving
  gamedatabase.games[i].clues[j].media.push(media);
  saveGameData(gamedatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.json(media);
    }
  });
});

router.post("/:gameId/poi", function(req, res) {
	let poibody = req.body.features;
	poistart = {
		 "id": req.params.gameId,
		 "gameurl": "https://wba2ss17-team38.herokuapp.com/games/"+req.params.gameId,
		 "type": "FeatureCollection",
		 "features": []
	}
	poistart.features.push(poibody);
	poidatabase.poi.push(poistart);
	saveOverpassData(poidatabase);
	res.format({
		"application/json": function() {
			res.json(poistart);
		}
	});
})

//GET Requests
router.get("/", function(req, res) {
	var gameurls = new Array();
	for (i = 0;  i < gamedatabase.games.length; i++){
		gameurls.push(gamedatabase.games[i].url);
  };
	console.log(gameurls);
	res.format({
	  "application/json": function() {
			res.send(gameurls)
			}
	  });
});

router.get("/:gameId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
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
  if (gameIndex < 0) {
    res.status(404);
    res.send("Die Hinweise von dem Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
		let clues = gamedatabase.games[gameIndex].clues;
    res.format({
      "application/json": function() {
        res.json(clues);
      }
    });
  }
});

router.get("/:gameId/clues/:clueId", function(req, res) {
	let gameIndex = findGameIndexById(req.params.gameId);
  let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
  if (clueIndex < 0) {
    res.status(404);
    res.send("Der Hinweis mit ID " + req.params.clueId + " existiert noch nicht!");
  } else {
		let clue = gamedatabase.games[gameIndex].clues[clueIndex];
    res.format({
      "application/json": function() {
        res.json(clue);
      }
    });
  }
});

router.get("/:gameId/participants/", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
  if (gameIndex < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
		let participants = gamedatabase.games[gameIndex].participants;
    res.format({
      "application/json": function() {
        res.json(participants);
      }
    });
  }
});

router.get("/:gameId/participants/:participantId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
	let participantIndex = findParticipantIndexById(gameIndex, req.params.participantId);
  if (participantIndex < 0) {
    res.status(404);
    res.send("Der Teilnehmer mit ID " + req.params.participantId + " existiert noch nicht!");
  } else {
		let participant = gamedatabase.games[gameIndex].participants[participantIndex];
    res.format({
      "application/json": function() {
        res.json(participant);
      }
    });
  }
});

router.get("/:gameId/clues/:clueId/media", function(req, res) {
	let gameIndex = findGameIndexById(req.params.gameId);
  let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
  if (clueIndex < 0) {
    res.status(404);
    res.send("Die Medien des Hinweises mit ID " + req.params.clueId + " existieren noch nicht!");
  } else {
		let media = gamedatabase.games[gameIndex].clues[clueIndex].media;
    res.format({
      "application/json": function() {
        res.json(media);
      }
    });
  }
});

router.get("/:gameId/clues/:clueId/media/:mediaId", function(req, res) {
	let gameIndex = findGameIndexById(req.params.gameId);
  let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
	let mediaIndex = findMediaIndexById(gameIndex, clueIndex, req.params.mediaId);
  if (mediaIndex < 0) {
    res.status(404);
    res.send("Das Medium  mit ID " + req.params.mediaId + " existiert noch nicht!");
  } else {
		let media = gamedatabase.games[gameIndex].clues[clueIndex].media[mediaIndex];
    res.format({
      "application/json": function() {
        res.json(media);
      }
    });
  }
});

router.get("/:gameId/poi/", function(req, res) {
	let poiIndex = findPoiIndexById(req.params.gameId);
	if (poiIndex < 0) {
		res.status(404);
		res.send("Das Spiel mit ID " + req.params.gameId + " und dessen POI existieren noch nicht!");
	} else {
		let poi = poidatabase.poi[poiIndex];
		res.format({
			"application/json": function() {
				res.json(poi);
			}
		});
	}
});

//PATCH Requests
router.patch("/:gameId", function(req, res) {
    let gameIndex = findGameIndexById(req.params.gameId);
    if (gameIndex < 0) {
      res.status(404);
      res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
    } else {
      let changes = req.body;
      let gameBefore = gamedatabase.games[gameIndex];
      let gameAfter = Object.assign(gameBefore, changes);
      gamedatabase.games[gameIndex] = gameAfter;
      saveGameData(gamedatabase);
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
  if (clueIndex < 0) {
      res.status(404);
      res.send("Der Hinweis mit ID " + req.params.clueId + " existiert noch nicht!");
    } else {
      let changes = req.body;
      let clueBefore = gamedatabase.games[gameIndex].clues[clueIndex];
      let clueAfter = Object.assign(clueBefore, changes);
      gamedatabase.games[gameIndex].clues[clueIndex] = clueAfter;
      saveGameData(gamedatabase);
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
    saveGameData(gamedatabase);
    res.format({
      "application/json": function() {
      res.json(participantAfter);
      }
    });
  }
});

router.patch("/:gameId/clues/:clueId/media/:mediaId", function(req, res) {
	let gameIndex = findGameIndexById(req.params.gameId);
  let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
	let mediaIndex = findMediaIndexById(gameIndex, clueIndex, req.params.mediaId);
	if (mediaIndex < 0) {
    res.status(404);
    res.send("Das Medium  mit ID " + req.params.mediaId + " existiert noch nicht!");
  } else {
		let changes = req.body;
		let mediaBefore = gamedatabase.games[gameIndex].clues[clueIndex].media[mediaIndex];
		let mediaAfter = Object.assign(mediaBefore, changes);
		gamedatabase.games[gameIndex].clues[clueIndex].media[mediaIndex] = mediaAfter;
		saveGameData(gamedatabase);
		res.format({
			"application/json": function() {
				res.json(mediaAfter);
			}
		});
	}
});

router.patch("/:gameId/poi", function(req, res) {
	var poiIndex = findPoiIndexById(req.params.gameId);
	if (poiIndex < 0) {
		res.status(404);
		res.send("Das Spiel mit ID " + req.params.gameId + " und dessen POI existieren noch nicht!");
    } else {
      let changes = req.body.features;
			poidatabase.poi[poiIndex].features.push(changes);
      saveOverpassData(poidatabase);
      res.format({
        "application/json": function() {
          res.json(poidatabase);
        }
      });
    }
  });

//DELETE Requests
router.delete("/:gameId", function(req, res) {
  let gameIndex = findGameIndexById(req.params.gameId);
  if (gameIndex < 0) {
    res.status(404);
    res.send("Das Spiel mit ID " + req.params.gameId + " existiert noch nicht!");
  } else {
    let game = gamedatabase.games[gameIndex];
    gamedatabase.games.splice(gameIndex, 1);
    saveGameData(gamedatabase);
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
    saveGameData(gamedatabase);
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
    saveGameData(gamedatabase);
    res.format({
      "application/json": function() {
        res.json(participant);
      }
    });
  }
});

router.delete("/:gameId/clues/:clueId/media/:mediaId", function(req, res) {
	let gameIndex = findGameIndexById(req.params.gameId);
  let clueIndex = findClueIndexById(gameIndex, req.params.clueId);
	let mediaIndex = findMediaIndexById(gameIndex, clueIndex, req.params.mediaId);
	if (mediaIndex < 0) {
    res.status(404);
    res.send("Das Medium  mit ID " + req.params.mediaId + " existiert noch nicht!");
  } else {
		let media = gamedatabase.games[gameIndex].clues[clueIndex].media[mediaIndex];
		gamedatabase.games[gameIndex].clues[clueIndex].media.splice(mediaIndex, 1);
		saveGameData(gamedatabase);
		res.format({
			"application/json": function() {
				res.json(media);
			}
		});
	}
});

router.delete("/:gameId/poi", function(req, res) {
	let poiIndex = findPoiIndexById(req.params.gameId);
	if (poiIndex < 0) {
		res.status(404);
		res.send("Die Points of Interest des Spiels mit ID " + req.params.gameId + " existieren noch nicht!");
	} else {
		let poi = poidatabase.poi[poiIndex];
		poidatabase.poi.splice(poiIndex, 1);
		saveOverpassData(poidatabase);
		res.format({
			"application/json": function() {
				res.json(poi);
			}
		});
	}
})

module.exports = router;
