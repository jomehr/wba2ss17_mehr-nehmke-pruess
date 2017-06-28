const SERVER_PORT = 3000

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var usersRoutes = require('./routes/users.js');
// TODO hier noch alle anderen Routen eintragen

app.use('/users', usersRoutes)
// TODO hier soll die App die Routen benutzen



module.exports = function () {
	app.listen(SERVER_PORT, function () {
		console.log('started Server on port: '+ SERVER_PORT);
	})
}
