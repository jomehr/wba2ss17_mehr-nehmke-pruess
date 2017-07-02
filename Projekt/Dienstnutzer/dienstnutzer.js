var express = require('express'),
    http = require('http'),
    request = require('request')
var app = express()

var dHost = 'http://localhost'    //Ziel-URL vom Dienstgeber
var dPort = 3000
var dURL = dHost + ':' + dPort


//mögiche Requests die der Dienstgeber zur Verfügung stellt

//GET-Requests
app.get('/users', function(req, res) {
  var url = dURL+ '/users'

  //TODO implement GET Request
  request(url, function(err, response, body) {
    body = JSON.parse(body)
    res.json(body)
  })
});

//GET-Requests
app.get('/users/:id', function(req, res) {
  var userID = req.params.userID
  var url = dHost + ':' + dPort + '/users/' + userID

  //TODO implement GET Request  
/*
  router.get('/:userid', function (req, res) {
  	let userIndex = findUserIndexById(req.params.userid)		//userIndex -> das eigentliche Objekt
  	let user = database.users[userIndex]

  	if (userIndex > -1) {
  		res.send(user);
  	} else {
  		// NOTE: Benutzer mit der geben ID existiert nicht
  		res.status(404)
  		res.send(null)
  	}
  });
  */
});

//POST
app.post('/users', function(req, res) {
  var userData = {
      "user_name":"Glücksbärchie",
      "first_name":"Jared",
      "last_name":"Prüß",
      "age":22,
      "id":"SkPVA6AXb"
    }
  })

/*
  var url = dURL + '/users'

  //TODO implement POST method

  app.post("/", function(req, res) {
    res.send("POST Request");
  });

  router.post('/create', function(req, res){
  	console.log(req.body);
  	database.users.push(req.body);

  	saveDatabase(database);
  });
})*/

//DELETE Request
app.delete('/users/:id', function(req, res) {
  var id = req.params.id
  var url = dURL + '/users/' + id

  //TODO implement DELETE Method
/*
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
    */
})

//Dienstnutzer über Port 8080 mittels express zur Verfügung stellen
app.listen(80, function() {     //<- hier muss eigentlich Port 8080!!! wirft aber Fehler!
  console.log("Dienstnutzer ist nun auf Port 8080 verfügbar")
})
