var express = require('express');
var shortid = require('shortid');

const router = express.Router()

router.get('/', function (req, res) {
  res.send(database.users);
});

router.post('/', function (req, res) {
	var newUser = req.body

	// TODO: valudate request body
	// TODO: create user ID
	newUser.id=shortid.generate()

	database.users.push(newUser)
	console.log(req.body);
	res.send(newUser);
})

/*
router.delete('/:userId', function (req, res) {
  res.send(req.params.userId);
  //res.send("User mit ID: " + req.params.userId); //ohne string, da json dann nicht mehr richtig geparst wird
});
*/

module.exports = router
