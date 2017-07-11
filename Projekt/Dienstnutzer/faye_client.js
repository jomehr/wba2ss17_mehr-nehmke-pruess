var faye = require('faye');

//Einrichten des Clients
var client = new faye.Client('http://localhost:8000');

//Subscribe-Methode
client.subscribe('/games', function(data){          //client.subscribe(Topic angelegt, Call-Back)
  alert('Nachricht erhalten:' + data.text);
});

// //Publish-Methode
client.publish('/games', {                              //client.publish(Topic auf das gepublisht werden soll)
  text: 'Hallo Spieler'
});
