const fs = require("fs")	//filesystem
const express = require('express')
const shortid = require('shortid')
const bodyParser =  require("body-parser")

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
function loadDatabase() {
	return JSON.parse(fs.readFileSync(__dirname + '/database.json'))			//parse -> wandelt JSON in JavaScript
}

function saveDatabase (data) {
	fs.writeFileSync(__dirname + '/database.json', JSON.stringify(data))	//stringify -> wandelt JavaScript in JSON
}

//Daten aus Datei laden, wenn der Server startet
global.database = loadDatabase()

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
		user => user.userid === userId		//=== -> überprüft ob beide Strings sind und beide den selben Index haben
	)
}

//Alle User ausgeben
router.get('/', function (req, res) {
	res.send(database.users);
});

//Einen User mit einer bestimmten ID ausgeben
//https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
router.get('/:userid', function (req, res) {
  for(var i = 0; i < database.users.length; i++){
		if(req.params.userid == database.users[i].id)
		res.send(database.users[i]);
	}
});

//Einen neuen User anlegen
//https://jsonformatter.curiousconcept.com/ zum testen
router.post('/create', function(req, res){
	console.log(req.body);
	database.users.push(req.body);

	saveDatabase(database);
});

//Einen User löschen


//Einen User aktualisieren


module.exports = router
