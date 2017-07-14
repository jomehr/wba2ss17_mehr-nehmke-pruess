const fs = require("fs");																		//filesystem
const express = require('express');
const shortid = require('shortid');
const bodyParser =  require("body-parser");
var mongoose = require("mongoose");
var UserJSON = require("./usermodel.js");
var idUsers = "59613a68f9b49340fc29859c";
const router = express.Router();
var passwordHash = require('password-hash');

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//Helper-Funktion zum laden der jsons
function loadDatabase(id, callback) {
	 UserJSON.findById(id, function(err, result){
		 if(err){
			 callback(err, null);
		 }
		 else{
			 callback(null, result.json);
		 }
	 });
};

//Helper-Funktion zum speichern der json
function saveDatabase (data) {
	UserJSON.findByIdAndUpdate(idUsers, { $set: { json: data }}, { new: false }, function (err, tank) {
	  if (err) return handleError(err);
	});
		fs.writeFileSync(__dirname + '/database.json', JSON.stringify(data, 0, 4))
};

//Daten aus Datei laden, wenn der Server startet
global.database
loadDatabase(idUsers, function(err, result){
	if(err) {
		console.log(err);
	}
	database = result;
	console.log("Userdatabase in Speicher geladen.")
});

//Helper-Funktion zum finden von User ID
function findUserIndexById (userId) {
	return database.users.findIndex(
		users => users.id === userId														//überprüft ob beide Strings & den selben Index haben
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
	res.format({
		"application/json": function() {
			res.send(database.users);
		}
	});
});

//GET Request auf User ID
router.get('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid);
	if (userIndex < 0) {
		res.status(404);
		res.send("Der User mit ID " + req.params.userId + " existiert noch nicht!");
	} else {
		let user = database.users[userIndex];
		res.format({
			"application/json": function() {
				res.json(users);
			}
		});
	}
});

//POST Request
router.post("/", function(req, res) {
	var userid = shortid.generate();
  //fill json with request data
  users = {
				"id": userid,
				"user_name": req.body.user_name,
				"first_name": req.body.first_name,
				"last_name": req.body.last_name,
				"age": req.body.age,
				"email": req.body.email,
				"password": passwordHash.generate(req.body.password)
      };
  //push data into existing json and stringify it for saving
  database.users.push(users);
  saveDatabase(database);
	console.log(userid);
  //formats responds to json
  res.format({
    "application/json": function() {
      res.json(users);
      }
  });
});

//DELETE Request
router.delete('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid);
	if (userIndex < 0) {
		res.status(404);
		res.send("Der User mit ID " + req.params.userId + " existiert noch nicht!");
	} else {
		let user = database.users[userIndex];
		database.users.splice(userIndex, 1);
		saveDatabase(database);
		res.format({
			"application/json": function() {
				res.json(users);
			}
		});
	}
});

//PATCH Request
router.patch('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid);
	console.log(req.body);
	if (userIndex < 0) {
		res.status(404);
		res.send("Der User mit ID " + req.params.userId + " existiert noch nicht!");
	} else {
		let changes = req.body;
		let userBefore = database.users[userIndex];
		let userAfter = Object.assign(userBefore, changes);
		database.users[userIndex] = userAfter;
		saveDatabase(database);
		res.format({
			"application/json": function() {
				res.json(userAfter);
			}
		});
	}
});


module.exports = router;
