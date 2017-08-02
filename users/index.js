const fs = require("fs");																		//filesystem
const express = require('express');
const shortid = require('shortid');
const bodyParser =  require("body-parser");
const router = express.Router();
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
	for (i = 0;  i < userdatabase.users.length; i++){
		userurls.push(userdatabase.users[i].user_name + ": " + userdatabase.users[i].url);
	};
	res.format({
		"application/json": function() {
			res.send(userurls);
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
		let user = userdatabase.users[userIndex];
		res.format({
			"application/json": function() {
				res.json(user);
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
  userdatabase.users.push(users);
  saveUserData(userdatabase);
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
		let user = userdatabase.users[userIndex];
		userdatabase.users.splice(userIndex, 1);
		saveUserData(userdatabase);
		res.format({
			"application/json": function() {
				res.json(user);
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
		let userBefore = userdatabase.users[userIndex];
		let userAfter = Object.assign(userBefore, changes);
		userdatabase.users[userIndex] = userAfter;
		saveUserData(userdatabase);
		res.format({
			"application/json": function() {
				res.json(userAfter);
			}
		});
	}
});


module.exports = router;
