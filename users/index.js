const fs = require("fs")	//filesystem
const express = require('express')
const shortid = require('shortid')
const bodyParser =  require("body-parser")

const router = express.Router()

//bodyparser für json und html einbinden
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function loadDatabase() {
	return JSON.parse(fs.readFileSync(__dirname + '/database.json'))			//parse -> wandelt JSON in JavaScript
}

function saveDatabase (data) {
	fs.writeFileSync(__dirname + '/database.json', JSON.stringify(data,0,4))	//stringify -> wandelt JavaScript in JSON
}

//Daten aus Datei laden, wenn der Server startet
global.database = loadDatabase()

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
