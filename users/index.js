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
		userurls.push(userdatabase.users[i].id + ": " + userdatabase.users[i].url);
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
		res.send("Der User mit ID " + req.params.userid + " existiert noch nicht!");
	} else {
		let user = userdatabase.users[userIndex];
		res.format({
			"application/json": function() {
				res.json(user);
			}
		});
	}
});

router.get("/:userid/tagabos", function(req, res) {
	let userIndex = findUserIndexById(req.params.userid);
  if (userIndex < 0) {
    res.status(404);
		res.send("Der User mit der ID " + req.params.userid + " besitzt noch keine Tag Abos!");
  } else {
		let tagabos = userdatabase.users[userIndex].tagabos;
    res.format({
      "application/json": function() {
        res.json(tagabos);
      }
    });
  }
});

router.get("/:userid/followers", function(req, res) {
	let userIndex = findUserIndexById(req.params.userid);
  if (userIndex < 0) {
    res.status(404);
		res.send("Der User mit der ID " + req.params.userid + " besitzt noch keine Followers!");
  } else {
		let followers = userdatabase.users[userIndex].followers;
    res.format({
      "application/json": function() {
        res.json(followers);
      }
    });
  }
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
+				"coordinates": {
+					"latitude": req.body.latitude,
+					"longitude": req.body.longitude
+				},
				"email": req.body.email,
+				"url": url + userid,
				"password": passwordHash.generate(req.body.password)
				"tagabos": [],
				"followers": []
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

router.post("/:userid/tagabos", function(req, res) {
	//create latest userid according to array lenght in json
  for (var i = 0; i < userdatabase.users.length; i++) {
		if (userdatabase.users[i].id == req.params.userid) {
			break;
		}
  }
  //fill json with request data
	var newTag = req.body.newTag;
  //push data into existing json and stringify it for saving
  userdatabase.users[i].tagabos.push(newTag);
  saveUserData(userdatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
			res.json(userdatabase.users[i].tagabos);
    }
  });
});

router.post("/:userid/followers", function(req, res) {
	//create latest userid according to array lenght in json
  for (var i = 0; i < userdatabase.users.length; i++) {
		if (userdatabase.users[i].id == req.params.userid) {
			break;
		}
  }
  //fill json with request data
	var newFollower = req.body.followers;
  //push data into existing json and stringify it for saving
  userdatabase.users[i].followers.push(newFollower);
  saveUserData(userdatabase);
  //formats responds to json
  res.format({
    "application/json": function() {
			res.json(userdatabase.users[i].followers);
    }
  });
});

//DELETE Request
router.delete('/:userid', function (req, res) {
	let userIndex = findUserIndexById(req.params.userid);
	if (userIndex < 0) {
		res.status(404);
		res.send("Der User mit ID " + req.params.userid + " existiert noch nicht!");
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

router.delete("/:userid/tagabos", function(req, res) {
	var deltag = req.body.tagabos;
	var check = true;
	console.log(deltag);
	for(var c = 0; c < userdatabase.users.length; c++) {
		if(userdatabase.users[c].id === req.params.userid) {
			var userIndex = c;
		}
	}
	console.log(userIndex);
  if (userdatabase.users[userIndex].tagabos.length === 0) {
    res.status(404);
		res.send("Der User mit der ID " + req.params.userid + " besitzt noch keine Tag Abos!");
  } else {
		for(var i = 0; i < userdatabase.users[userIndex].tagabos.length; i++) {
			if(userdatabase.users[userIndex].tagabos[i] == deltag) {
				check = false;
				userdatabase.users[userIndex].tagabos.splice(i, 1);
				saveUserData(userdatabase);
			}
		}
			res.format({
				"application/json": function() {
					if(!check) {
						res.json(userdatabase.users[userIndex].tagabos);
					} else {
						res.status(200);
						res.send("Der User mit der ID " + req.params.userid + " hat den Tag " + deltag+ "!");
					}
				}
			});
  }
});

router.delete("/:userid/followers", function(req, res) {
	var delfollower = req.body.followers;
	var check = true;
	console.log(delfollower);
	for(var d = 0; d < userdatabase.users.length; d++) {
		if(userdatabase.users[d].id === req.params.userid) {
			var userIndex = d;
		}
	}
	console.log(userIndex);
  if (userdatabase.users[userIndex].followers.length === 0) {
    res.status(404);
		res.send("Der User mit der ID " + req.params.userid + " hat noch keine Followers!");
  } else {
		for(var i = 0; i < userdatabase.users[userIndex].tagabos.length; i++) {
			if(userdatabase.users[userIndex].followers[i] == delfollower) {
				check = false;
				userdatabase.users[userIndex].followers.splice(i, 1);
				saveUserData(userdatabase);
			}
		}
			res.format({
				"application/json": function() {
					if(!check) {
						res.json(userdatabase.users[userIndex].followers);
					} else {
						res.status(200);
						res.send("Der Follower " + delfollower + " wurde für den user User mit der ID " + req.params.userId + " gelöscht!");
					}
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
		res.send("Der User mit ID " + req.params.userid + " existiert noch nicht!");
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
