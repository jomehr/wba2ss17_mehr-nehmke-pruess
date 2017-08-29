const fs = require("fs");																		//filesystem
const express = require('express');
const shortid = require('shortid');
const bodyParser =  require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
var User = require("./usermodel.js");
var passwordHash = require('password-hash');

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Helper-Funktion zum laden der jsons
function loadUserData() {
	return JSON.parse(fs.readFileSync(__dirname + "/users.json"))
};

//Helper-Funktion zum speichern der json
function saveUserData (data) {
	fs.writeFileSync(__dirname + '/users.json', JSON.stringify(data, 0, 4))
};

//Daten aus Datei laden, wenn der Server startet
global.userdatabase = loadUserData();

//Helper-Funktion zum finden von User ID
function findUserIndexById (userId) {
	return userdatabase.users.findIndex(
		users => users.id === userId				//überprüft ob beide Strings & den selben Index haben
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

//GET Request auf alle User
router.get('/', function (req, res) {
	var userurls = new Array();
	User.find({}, function(err, users){
		if(!err) userurls = users;
		//console.log(userurls);

		res.format({
			"application/json": function() {
				res.send(userurls);
			}
		});
	});

});

//GET Request auf User ID
router.get('/:userid', function (req, res) {
	User.findOne({ "id": req.params.userid}, function(err,user){
		if(user!=null)
		res.format({
			"application/json": function() {
				res.json(user);
			}
		});
		else{res.status(404); res.send("Nutzer konnte nicht gefunden werden!")}
	});
});


router.get("/:userid/tagabos", function(req, res) {
	User.findOne({ "id": req.params.userid}, function(err,user){
		if(user!=null)
		res.format({
			"application/json": function() {
				res.json(user.tagabos);
			}
		});
		else{res.status(404); res.send("Nutzer konnte nicht gefunden werden!")}
	});
});

router.get("/:userid/followers", function(req, res) {
	User.findOne({ "id": req.params.userid}, function(err,user){
		if(user!=null)
		res.format({
			"application/json": function() {
				res.json(user.followers);
			}
		});
		else{res.status(404); res.send("Nutzer konnte nicht gefunden werden!")}
	});
});



//POST Request
router.post("/", function(req, res) {
	var userid = shortid.generate();
	var url = "https://wba2ss17-team38.herokuapp.com/users/"
  //fill json with request data
  users = {
		"id": userid,
		"user_name": req.body.user_name,
		"first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"age": req.body.age,
		"coordinates": {
			"latitude": req.body.latitude,
			"longitude": req.body.longitude
		},
		"email": req.body.email,
		"url": url + userid,
		"password": passwordHash.generate(req.body.password),
		"tagabos": [],
		"followers": []
		};
		var newUser = new User(users);
		newUser.save(function(err){
			if(err)
				throw err;
		});
  //push data into existing json and stringify it for saving
	console.log(userid);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.json(users);
    }
  });
});

router.post("/:userid/tagabos", function(req, res) {
	User.findOneAndUpdate({"id" : req.params.userid }, {"tagabos": req.body}, function(err, update){

		if(!err){ res.status(200);
			res.format({
			"application/json": function() {
				res.json(update);
				}
			});
		}
		else {res.status(404); res.send("User mit ID "+req.params.userid+" existier nicht!");}
	});
});

router.post("/:userid/followers", function(req, res) {
	User.findOneAndUpdate({"id" : req.params.userid }, {"followers": req.body}, function(err, update){

		if(!err){ res.status(200);
			res.format({
			"application/json": function() {
				res.json(update);
				}
			});
		}
		else {res.status(404); res.send("User mit ID "+req.params.userid+" existier nicht!");}
	});
});

//DELETE Request
router.delete('/:userid', function (req, res) {
	User.findOneAndRemove({"id": req.params.userid }, function(err, user){
		if(err) {res.status(404); res.send("User mit ID "+req.params.userid+" existier nicht!");}
		else { res.status(200); res.send("User mit ID "+req.params.userid+" wurde gelöscht!");}
	});
});

router.delete("/:userid/tagabos", function(req, res) {
	User.findOneAndUpdate({"id" : req.params.userid }, {"tagabos": []}, function(err, update){

		if(!err){ res.status(200);
			res.format({
			"application/json": function() {
				res.json(update);
				}
			});
		}
		else {res.status(404); res.send("User mit ID "+req.params.userid+" existier nicht!");}
	});
});

router.delete("/:userid/followers", function(req, res) {
	User.findOneAndUpdate({"id" : req.params.userid }, {"followers": []}, function(err, update){

		if(!err){ res.status(200);
			res.format({
			"application/json": function() {
				res.json(update);
				}
			});
		}
		else {res.status(404); res.send("User mit ID "+req.params.userid+" existier nicht!");}
	});
});

//PATCH Request
router.patch('/:userid', function (req, res) {
	var update = req.body;
	User.findOneAndUpdate({"id" : req.params.userid }, update, function(err, update){

		if(!err){ res.status(200);
			res.format({
			"application/json": function() {
				res.json(update);
				}
			});
		}
		else {res.status(404); res.send("User mit ID "+req.params.userid+" existier nicht!");}
	});
});


module.exports = router;
