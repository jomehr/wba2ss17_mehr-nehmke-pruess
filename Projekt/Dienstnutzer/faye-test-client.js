const Faye = require('faye')
const client = new Faye.Client("http://localhost:8000/faye")

// User mit ID 1 abbonieren
client.subscribe('/userAbos/Byh3Q7dSZ', function (message) {
    console.log(message)
})

// Tag "horror" abbonieren
//Web-Sockets
client.subscribe('/tags/horror', function (message) {
    console.log(message)
})
