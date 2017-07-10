var faye = require('faye');

//Einrichten des Clients
var client = new faye.Client('http://localhost:8000');

//Subscribe-Methode
client.subscribe('/messages', function(message){          //client.subscribe(Topic angelegt, Call-Back)
  console.log('Nachricht erhalten:' + message.text);
});

//Publish-Methode
client.publish('/message', {                              //client.publish(Topic auf das gepublisht werden soll)
  text: 'Hallo Spieler'
});
