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

app.post("/", function(req, res) {
  res.send("POST Request");
});

//GET-Requests
app.get('/users/:userID', function(req, res) {
  var userID = req.params.userID
  var url = dHost + ':' + dPort + '/users/' + userID

  //TODO implement GET Request
});

//POST
app.post('/users', function(req, res) {
  var userData = {
    "name": "Peter",
    "city": "Köln",
    "country": "Deutschland"
    "zipcode": 642456,
    "foodPreferences": [
      "foodPreferences.pizza"
    ],
    "activityPreferences": [
      "activityPreferences.football"
    ]
  }
  var url = dURL + '/users'

  //TODO implement POST method

})

//DELETE Request
app.delete('/users/:id', function(req, res) {
  var id = req.params.id
  var url = dURL + '/users/' + id

  //TODO implement DELETE Method

})

//Dienstnutzer über Port 8080 mittels express zur Verfügung stellen
app.listen(8080, function() {
  console.log("Dienstnutzer it nun auf Port 8080 verfügbar")
})
