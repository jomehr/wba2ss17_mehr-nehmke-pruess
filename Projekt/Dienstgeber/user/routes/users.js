var express = require('express')
var shortid = require('shortid')

const router = express.Router()


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
router.get('/:userid', function (req, res) {
	res.send(database.users);
});

//Einen neuen User anlegen
router.post('/', function (req, res) {
	var userNew = req.body

	userNew.userid = shortid.generate()		//mit shortid wird eine unique ID generiert

	database.users.push(userNew)		//userNew wird hinzugefügt
	res.send(userNew)
})

//Einen User löschen
//let var1 [= wert1] [, var2 [= wert2]] [, ..., varN [= wertN]];
//https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/let
router.delete('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid)		//userIndex -> das eigentliche Objekt
	let user = database.users[userIndex]

	if (userIndex > -1) {
		let user = database.users[userIndex]

		database.users.splice(userIndex, 1)

		res.send(user)
	} else {
		// NOTE: Benutzer mit der geben ID existiert nicht
		res.status(404)
		res.send(null)
	}
})

//Einen User aktualisieren
router.patch('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid)

	if (userIndex > -1) {
		let changes = req.body
		let userBefore = database.users[userIndex]
		let userAfter = Object.assign(userBefore, changes)

		database.users[userIndex] = userAfter

		res.send(userAfter)
	} else {
		// NOTE: Benutzer mit der geben ID existiert nicht
		res.status(404)
		res.send(null)
	}
})

module.exports = router
