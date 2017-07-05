//Request mitt HTTP Modul
var options = {
  hostname: 'localhost',
  port: 3000,
  path: '/routes',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

/* Request erstmal initialisieren und ggf.
bestimmte Parameter festlegen (z.B. Encoding) */
var req = http.request(options, function(rest){
  res.setEncoding('utf8')
  res.on('data', function (body){
    console.log('Body: ' + body)
  })
})
req.on('error', function(e){
  console.log('problem with request: ' + e.message)
})
//write data to request body
req.write(userData)   //Daten Übermitteln
req.end()             //schließt Request ab









//Request mit Request Modul benutzen
var userData = {"Test"}

var options = {
  uri: url,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
  json: userData
}

//Requestaufruf mit Options die wir übergeben
//Daten werden übermittelt und Request wird automatisch beendet
request (options, function(err, response, body) {
  console.log(body)

  res.json(body)
})




//3 Möglichkeiten anhand eines GET Request-Pfad

//1. Requestaufruf mit einer url = einfachste Möglichkeiten
//funktioniert nur für GET Request wegen url
request(url, function(err, res, body){
  console.log(body)
})

//2. Helper Methode
//ist übersichtlicher
request.get(url, function(err, response, body){
  console.log(body)
})

//3. Options definieren wo Zieladresse als URL angeben wird, Methoden
//explizit nennen und Zusatzinformationen ggf. angeben
const options = {
  url: url,
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}
request(options, function(err, res, body) {
  console.log(json)
})
