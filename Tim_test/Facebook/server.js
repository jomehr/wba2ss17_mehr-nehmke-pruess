var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');

var User = require('./app/models/user');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url, function(err, db){
	if(!err)
	console.log('Mit Datenbak verbunden!')
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));


// app.use('/', function(req, res){
// 	res.send('Our First Express program!');
// 	console.log(req.cookies);
// 	console.log('================');
// 	console.log(req.session);
// });

require('./app/routes.js')(app);

app.listen(port);
console.log('Server running on port: ' + port);
User.find({}, function(err, users){
	if (err) throw err;

	console.log("=============");
	console.log(users);
})
