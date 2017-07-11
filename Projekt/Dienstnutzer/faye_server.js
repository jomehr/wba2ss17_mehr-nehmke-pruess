var http = require('http'),
    faye = require('faye');                               //für Transport der asynchronen Meldungen

//https://faye.jcoglan.com/
//https://faye.jcoglan.com/node.html
//Server aufsetzen
var server = http.createServer();

//Node Adapter über den sich die Clients verbinden und kommunizieren
var fayeservice = new faye.NodeAdapter({
  mount: '/faye',                                     //Pfad wo Faye-Service verfügbar ist
  timeout: 25                                         //max. Zeit in Sek. bis eine Antwort versendet wird
});

// client.publish('/games', {
//   text: "test"
// });

fayeservice.attach(server);
server.listen(8000);
