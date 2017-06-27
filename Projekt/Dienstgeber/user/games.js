var express = require('express');
var shortid = require('shortid');

const router = express.Router()

router.get('/', function (req, res) {
  res.send(database.games);
});

router.post('/', function (req, res) {
	var newGame = req.body

	// TODO: valudate request body
	//generiert unique game ID
	newGame.id=shortid.generate()

	database.games.push(newGame)
	console.log(req.body);
	res.send(newGame);
})

module.exports = router
