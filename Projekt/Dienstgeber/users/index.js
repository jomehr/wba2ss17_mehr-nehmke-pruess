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

//Helper-Funktion zum finden eines tag im Array
//function findtagabosIndexByString (tagabos) {                                                     //überprüft ob beide Strings & den selben Index haben
//    return userdatabase.users.id.tagabos.findIndex(
//        users => users.id.tagabos === tagabos   //überprüft ob beide Strings & den selben Index haben
//    );
//};


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

router.get("/:userid/tagabos", function(req, res) {
	let userIndex = findUserIndexById(req.params.userid);
  if (userIndex < 0) {
    res.status(404);
		res.send("Der User mit der ID " + req.params.userId + " besitzt noch keine Tag Abos!");
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
		res.send("Der User mit der ID " + req.params.userId + " besitzt noch keine Followers!");
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
  //fill json with request data
  users = {
				"id": userid,
				"url": "https://wba2ss17-team38.herokuapp.com/users/" + userid,
				"user_name": req.body.user_name || "template username",
				"first_name": req.body.first_name || "template firstname",
				"last_name": req.body.last_name || "template lastname",
				"age": req.body.age || "template age",
				"email": req.body.email || "template email",
				"password": passwordHash.generate(req.body.password),
				"experience_points": 0,
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
router.delete("/:userid", function (req, res) {
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

router.delete("/:userid/tagabos", function(req, res) {
	//create latest userid according to array lenght in json
  for (var i = 0; i < userdatabase.users.length; i++) {
		if (userdatabase.users[i].id == req.params.userid) {
			for (var j = 0; j < userdatabase.users.tagabos.length; j++) {
				if (userdatabase.users[i].id.tagabos[j] == req.params.userid.tagabos[j]) {
					break;
				}
			}
		}
  }
	if (tagIndex < 0) {
			res.status(404);
			res.send("Der User mit der ID " + req.params.userId + " besitzt noch keine Tag Abos!");
		} else {
			let deletedTag = tagsOfUser[tagIndex]

			tagsOfUser.splice(tagIndex, 1) 	//splice löscht genau EIN Element

			res.send(deletedTag) 						//gelöschten Tag anzeigen
		}
});

router.delete("/:userid/followers/:follower", function(req, res) {
	let userIndex = findUserIndexById(req.params.userid);
	let followersOfUser = userdatabase.users[userIndex].followers
	let followerIndex = followersOfUser.findIndex(follower => follower === req.params.follower)

	//gesuchter String Vergleich mit Strings im Array
	//true = wenn followers gleich req.params.followers --> Index gefunden
	function searchFollower (follower) {
			return follower === req.params.follower
	}

	if (followerIndex < 0) {
			res.status(404);
			res.send("Der User mit der ID " + req.params.userId + " besitzt noch keine Followers!");
		} else {
			let deletedFollower = followersOfUser[followerIndex]

			followersOfUser.splice(followerIndex, 1) 	//splice löscht genau EIN Element

			res.send(deletedFollower) 								//gelöschten Tag anzeigen
		}
});


//router.delete("/:userid/tagabos", function(req, res) {
//	let userIndex = findUserIndexById(req.params.userid);
//	let tagabosIndex = findtagabosIndexByString(userIndex, req.params.tagaboString);
//  if (tagabosIndex < 0) {
//      res.status(404);
//			res.send("Der User mit der ID " + req.params.userId + " besitzt noch keine Tag Abos!");
//  } else {
//			br = new BufferedReader(new InputStreamReader(System.in));
//			StringToBeChecked = br.readLine();
//			for (int j = 0 ; j < userdatabase.users[i].tagabos.length; j++) {
//			   if(tagabos[index]==StringToBeChecked)
//			   {
//			      System.out.println("Der Tag " + tagabos[index] + " existiert!");
//						let user = userdatabase.users[userIndex];
//						userdatabase.users.splice(userIndex, 1);
//						saveUserData(userdatabase);
//						res.format({
//							"application/json": function() {
//								res.json(user);
//							}
//						});
//					}
//				} else {
//			     System.out.println("Der Tag " + tagabos[index] + " existiert nicht!");
//				}
//		 }
//	});

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
