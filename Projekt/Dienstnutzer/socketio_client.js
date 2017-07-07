var io = require('socket.io-client');

var socket = io.connect('http://localhost:8082/chat');

socket.on('message', function(data) {
  console.log(data);
});

process.stdin.on('data', function(text) {
  if(text[text.length - 1] === 10) {
    var msg = text.slice(0, text.length - 1).toString();
    socket.send(msg);
  }
});
