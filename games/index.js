const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");
const fs = require("fs");
const shortid = require('shortid')
const mongoose = require("mongoose");
var Game = require("./models/gamemodel.js");
var Clue = require("./models/cluemodel.js");
var Media = require("./models/mediamodel.js");
var Participant = require("./models/participantmodel.js");
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
	Game.find({}, function(err, games){
		if(!err) {
			res.format({
				"application/json": function() {
					res.send(games);
				}
			});
		}
	});
//  res.sendFile(__dirname + "/" + "game.html");
});

//POST Requests
router.post("/", function(req, res) {
	var gameid = shortid.generate();
	if (req.body.startdate != undefined) {
	var startdatepart = req.body.startdate.split(".");
	var starttimepart = req.body.starttime.split(":")
	var expirationdatepart = req.body.expirationdate.split(".");
	var expirationtimepart = req.body.expirationtime.split(":")
	var tmps= new Date(startdatepart[2], (startdatepart[1]-1), startdatepart[0], starttimepart[0], starttimepart[1]);
	var startdate = tmps.toString();
	console.log(startdate);
	var tmpd = new Date(expirationdatepart[2], (expirationdatepart[1]-1), expirationdatepart[0], expirationtimepart[0], expirationtimepart[1]);
	var expirationdate = tmpd.toString();
}
	//fill json with request data
  games = {
        "id": gameid,
        "titel": req.body.titel || "templatetitel",
        "description": req.body.description || "templatedescription",
				"endcoordinates": req.body.endcoordinates || "templatecoordinates",
        "creator": req.body.creator || "templatecreator",
        "creationdate": Date(),
        "startdate": startdate || "Startdatum fehlt",
        "expirationdate": expirationdate || "Enddatum fehlt",
				"finished": false,
        "reward": req.body.reward,
				"url": "https://wba2ss17-team38.herokuapp.com/games/" + gameid,
        "clues": [],
        "participants": []
      };
  //push data into existing json and stringify it for saving
	var newGame = new Game(games);
	newGame.save(function(err){
		if(err)
			throw err;
	});
	console.log(gameid)
	res.format({
		"application/json": function(){
			res.json(games);
		}
	});
});

router.post("/:gameId/clues", function(req, res) {
  //create latest gameid according to array lenght in json
	var clueid = shortid.generate();
  //fill json with request data
  clues = {
        "gameid": req.params.gameId,
        "id": clueid,
        "titel": req.body.titel || "templatetitel",
        "description": req.body.description || "templatedescription",
        "coordinate": req.body.coordinate || "templatecoordinates",
        "creator": req.body.creator || "templatecreator",
				"gameurl": "https://wba2ss17-team38.herokuapp.com/games/"+req.params.gameId,
        "creationdate": Date(),
				"media": []
      };
  //push data into existing json and stringify it for saving
	var newClue = new Clue(clues);
	newclue.save(function(err){
		if(err)
			throw err;
	});
	res.format({
		"application/json": function(){
			res.json(clues);
		}
	});
});

router.post("/:gameId/participants", function(req, res) {
  //create latest gameid according to array lenght in json

	var participantid = shortid.generate();
  //fill json with request data
  participants = {
        "gameid": req.params.gameId,
        "id": participantid,
        "first_name": req.body.first_name || "templatefirstname",
        "last_name": req.body.last_name || "templatelastname",
				"username": req.body.username || "templateusername",
				"gameurl": "https://wba2ss17-team38.herokuapp.com/games/"+req.params.gameId,
        "joindate": Date()
      };
  //push data into existing json and stringify it for saving
	var newPart = new Participant(participants);
	newPart.save(function(err){
		if(err)
			throw err;
	});
	res.format({
		"application/json": function(){
			res.json(participants);
		}
	});
});

router.post("/:gameId/clues/:clueId/media", function(req, res) {
  //check if gameid and clueid exist and save index
	var mediaid = shortid.generate();
	var clueid = req.params.clueId;
  //fill json with request data
  media = {
        "gameid": req.params.gameId,
				"clueid": req.params.clueId,
        "id": mediaid,
        "titel": req.body.titel || "templatetitel",
				"uploader": req.body.uploader || "templateuploader",
        "mediaurl": req.body.url || "templateurl",
				"gameurl": "https://wba2ss17-team38.herokuapp.com/games/"+req.params.gameId,
        "creationdate": Date()
      };
  //push data into existing json and stringify it for saving
 //funktioniert noch nicht
 var newMedia = new Media(media);
 newMedia.save(function(err){
	 if(err)
		 throw err;
 });
 res.format({
	 "application/json": function(){
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
	Game.find({}, function(err, games){
		if(!err) {
			res.format({
				"application/json": function() {
					res.send(games);
				}
			});
		}
	});
});

router.get("/:gameId", function(req, res) {
	Game.findOne({ "gameid": req.params.gameId}, function(err,part){
		if(game!=null)
		res.format({
			"application/json": function() {
				res.json(part);
			}
		});
		else{res.status(404); res.send("Game konnte nicht gefunden werden!")}
	});
});

router.get("/:gameId/clues", function(req, res) {
	Clue.find({ "gameid": req.params.gameId}, function(err,clues){
		if(clues!=null)
		res.format({
			"application/json": function() {
				res.json(clues);
			}
		});
		else{res.status(404); res.send("Game konnte nicht gefunden werden!")}
	});
});

router.get("/:gameId/clues/:clueId", function(req, res) {
	Clue.findOne({ "clueid": req.params.clueId}, function(err,clue){
		if(clue!=null)
		res.format({
			"application/json": function() {
				res.json(clue);
			}
		});
		else{res.status(404); res.send("Game konnte nicht gefunden werden!")}
	});
});

router.get("/:gameId/participants/", function(req, res) {
	Participants.find({ "gameid": req.params.gameId}, function(err,part){
		if(part!=null)
		res.format({
			"application/json": function() {
				res.json(part);
			}
		});
		else{res.status(404); res.send("Participants konnten nicht gefunden werden!")}
	});
});

router.get("/:gameId/participants/:participantId", function(req, res) {
	Participants.find({ "id": req.params.participantId}, function(err,part){
		if(part!=null)
		res.format({
			"application/json": function() {
				res.json(part);
			}
		});
		else{res.status(404); res.send("Participant konnten nicht gefunden werden!")}
	});

});

router.get("/:gameId/clues/:clueId/media", function(req, res) {
	Media.find({ "clueid": req.params.clueId}, function(err,media){
		if(media!=null)
		res.format({
			"application/json": function() {
				res.json(media);
			}
		});
		else{res.status(404); res.send("Media konnte nicht gefunden werden!")}
	});
});

router.get("/:gameId/clues/:clueId/media/:mediaId", function(req, res) {
	Clue.findOne({ "id": req.params.mediaId}, function(err,media){
		if(media!=null)
		res.format({
			"application/json": function() {
				res.json(media);
			}
		});
		else{res.status(404); res.send("Media konnte nicht gefunden werden!")}
	});
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
	Game.findOneAndUpdate({"id": req.params.gameId}, req.body, function(err,game){
    if(!err){res.status(200);
    res.format({
      "application/json": function() {
        res.json(game);
      }
    });
  }
  else{res.status(404); res.send("Game mit ID "+req.params.gameId+"existiert nicht!");}
  });
});

router.patch("/:gameId/clues/:clueId", function(req, res) {
	Clue.findOneAndUpdate({"id": req.params.clueId}, req.body, function(err,clue){
		if(!err){res.status(200);
		res.format({
			"application/json": function() {
				res.json(clue);
			}
		});
	}
	else{res.status(404); res.send("Clue mit ID "+req.params.clueId+"existiert nicht!");}
	});

  });

router.patch("/:gameId/participants/:participantId", function(req, res) {
	Participant.findOneAndUpdate({"id": req.params.participantId}, req.body, function(err,part){
		if(!err){res.status(200);
		res.format({
			"application/json": function() {
				res.json(part);
			}
		});
	}
	else{res.status(404); res.send("Participant mit ID "+req.params.participantId+"existiert nicht!");}
	});
});

router.patch("/:gameId/clues/:clueId/media/:mediaId", function(req, res) {
	Media.findOneAndUpdate({"id": req.params.mediaId}, req.body, function(err,media){
		if(!err){res.status(200);
		res.format({
			"application/json": function() {
				res.json(media);
			}
		});
	}
	else{res.status(404); res.send("Media mit ID "+req.params.gameId+"existiert nicht!");}
	});
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
	Game.remove({"id": req.params.gameId}, function(err){
		if(!err){res.status(200);}
		else {res.status(404); res.send("Game mit der ID "+req.params.gameId+" existiert nicht!");}
	});
});

router.delete("/:gameId/clues/:clueId", function(req, res) {
	Clue.remove({"id": req.params.clueId}, function(err){
		if(!err){res.status(200);}
		else {res.status(404); res.send("Clue mit der ID "+req.params.clueId+" existiert nicht!");}
	});
});

router.delete("/:gameId/participants/:participantId", function(req, res) {
	Participant.remove({"id": req.params.participantId}, function(err){
		if(!err){res.status(200);}
		else {res.status(404); res.send("Participant mit der ID "+req.params.participantId+" existiert nicht!");}
	});
});

router.delete("/:gameId/clues/:clueId/media/:mediaId", function(req, res) {
	Media.remove({"id": req.params.mediaId}, function(err){
		if(!err){res.status(200);}
		else {res.status(404); res.send("Media mit der ID "+req.params.MediaId+" existiert nicht!");}
	});
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
