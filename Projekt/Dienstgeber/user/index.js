var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require("fs")

global.database = JSON.parse(fs.readFileSync('data.json', 'utf8'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var usersRoutes = require('./users.js');

app.use('/users', usersRoutes)

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
})
