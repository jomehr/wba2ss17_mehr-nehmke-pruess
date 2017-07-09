const fs = require("fs")	//filesystem
const express = require('express')
const shortid = require('shortid')
const bodyParser =  require("body-parser")
var mongoose = require("mongoose");
var UserJSON = require("./usermodel.js")
var idUsers = "59613a68f9b49340fc29859c"
const router = express.Router()

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//https://www.tutorialspoint.com/nodejs/nodejs_process.htm
//für geringer Serverlast
/*
process.stdin.resume()
process.on('exit', onExit)
process.on('SIGINT', onExit)						//wenn Prozess abgebrochen wird
process.on('uncaughtException', onExit)	//uncaughtException=Error
*/

//parse=aus Json-Objekt ein JavaScript-Objekt
//https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
//fs.readFileSync(path[, options])
function loadDatabase(id, callback) {
	 UserJSON.findById(id, function(err, result){

		 if(err){
			 callback(err, null);
		 }
		 else{
			 callback(null, result.json);
		 }
	 })
				//parse -> wandelt JSON in JavaScript
}

function saveDatabase (data) {
	UserJSON.findByIdAndUpdate(idUsers, { $set: { json: data }}, { new: false }, function (err, tank) {
	  if (err) return handleError(err);
	});
		fs.writeFileSync(__dirname + '/database.json', JSON.stringify(data))	//stringify -> wandelt JavaScript in JSON

}

//Daten aus Datei laden, wenn der Server startet
global.database
loadDatabase(idUsers, function(err, result){
	if(err) {
		console.log(err);
	}
	database = result;
	console.log("Userdatabase in Speicher geladen.")
});

//Daten in Datei speichern, wenn der Server stoppt
/*
function onExit () {
	saveDatabase(database)
	console.log("Server gestoppt und Datei gespeichert")
	process.exit()
}
*/

//Helper-Funktion, um den Array-Index eines User-Record, durch seine ID zu finden
function findUserIndexById (userId) {
	// NOTE: Sicher stellen, dass ALLE IDs Strings sind !!!
	return database.users.findIndex(
		users => users.id === userId		//=== -> überprüft ob beide Strings sind und beide den selben Index haben
	)
}

//Alle User ausgeben
router.get('/', function (req, res) {
	res.send(database.users);
});

//Einen User mit einer bestimmten ID ausgeben
//https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
router.get('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid)		//userIndex -> das eigentliche Objekt
	let user = database.users[userIndex]

	if (userIndex > -1) {
		res.send(user);
	} else {
		// NOTE: Benutzer mit der geben ID existiert nicht
		res.status(404)
		res.send("Der User mit ID " + req.params.userId + " existiert noch nicht!")
	}
});

//Einen neuen User anlegen
//https://jsonformatter.curiousconcept.com/ zum testen
/*
router.post('/', function(req, res){
  newUser.id=shortid.generate();
	console.log(req.body);
	var user = req.body;
	database.users.push(user);
	saveDatabase(database);
	res.format({
		"application/json": function() {
			res.send(user);
			}
	});
});
*/
router.post("/", function(req, res) {
	var userid = shortid.generate();
  //fill json with request data
  users = {
				"id": userid,
				"user_name": req.body.user_name,
				"first_name": req.body.first_name,
				"last_name": req.body.last_name,
				"age": req.body.age,
				"email": req.body.email
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

//Einen User löschen
//let var1 [= wert1] [, var2 [= wert2]] [, ..., varN [= wertN]];
//https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/let
router.delete('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid)		//userIndex -> das eigentliche Objekt
	let user = database.users[userIndex]

	if (userIndex > -1) {
		let user = database.users[userIndex]

		database.users.splice(userIndex, 1)

		saveDatabase(database);

		res.send(user)
	} else {
		// NOTE: Benutzer mit der geben ID existiert nicht
		res.status(404)
		res.send(null)
	}
})

router.patch('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid)
	console.log(req.body);
	if (userIndex > -1) {
		let changes = req.body
		let userBefore = database.users[userIndex]
		let userAfter = Object.assign(userBefore, changes)

		database.users[userIndex] = userAfter

		saveDatabase(database);

		res.send(userAfter)
	} else {
		// NOTE: Benutzer mit der geben ID existiert nicht
		res.status(404)
		res.send(null)
	}
})


module.exports = router
