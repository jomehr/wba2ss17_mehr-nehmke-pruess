var http = require('http');
var yakbak = require('yakbak');

http.createServer(yakbak('http://api.flickr.com', {
	dirname: __dirname + '/tapes'
})).listen(3000);
console.log("Listening to http://localhost:3000")
