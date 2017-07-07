var express = require('express');
var app = express();
var httpServer = require('http').Server(app);     //weil socket.io braucht diesen von express unabhängigen Server
var io = require('socket.io')(httpServer);

var port = process.env.PORT || 8082;

app.use(express.static(__dirname + '/public'));   //guckt ob statische Datei sich im Public-Ordner befindet

var clientSockets = [];                            //Array, wo die Client-Sockets festgehalten werden

//io.set('origins', '*');                         //Bei Prolemen mit CORS

//Funktion wird jedes mal aufgerufen, wenn Client sich verbindet
io.of('chat').on('connection', function(socket) {

  //ClientSocket der Socket-Liste (Array) hinzufügen
  clientSockets.push(socket);
  console.log('Die Verbindung ist hergestellt.');

  //horchen auf vom Client geschickte Nachricht
  socket.on('message', function(data) {
    console.log('msg:', data);

    //Nachricht, die von einem Client kommt, an alle anderen Clients weiterleiten
    clientSockets.forEach(function(clientSocket) {
      if(clientSocket !== socket)
        clientSocket.send(data);
    });
  });

  //ClientSocket bei Verbindungsabbruch aus der Socket-Liste entfernen
  socket.on('disconnect', function() {
    console.log('Die Verbindung wurde abgebrochen.');
    clientSockets.splice(clientSockets.indexOf(socket), 1);       //Socket wird aus dem Array gelöscht
  });
});


httpServer.listen(port);

console.log("Listening on http://localhost:" + port);
