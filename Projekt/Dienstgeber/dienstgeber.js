
const express =  require ("express");
const app =  express ();
const fs = require ("fs");
const async = require ("async")

const settings = {
  port: 3000,
  datafile: "./gametest.json"
};

//errorhandler
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.end(err.status + " " + err.messages);
});

//log mit pfad und zeit
app.use(function(req, res, next) {
  console.log("Time: %d " + "Request-Pfad: " + req.path, Date.now());
  next();
});

//routing einbinden
const game = require("./game");
const user =  require("./user");
app.use("/game", game);
app.use("/user", user);

//statischer Ordner (klappt noch nicht)
app.use(express.static("game"));

//REST methods
app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

app.get("/process_get", function(req,res) {
  response = {
    titel: req.query.titel,
    description: req.query.description,
    creationdate: req.query.creationdate,
    expirationdate: req.query.expirationdate,
    user: {
      first_name: req.query.first_name,
      last_name: req.query.last_name
    }
  };
  console.log(response);
  var tmp = JSON.stringify(response);
  res.end(tmp);
  fs.writeFile(__dirname+"/testgame.json", tmp, function(err){      //JSON-Datai mit Sortiertem String schreiben
     if (err) throw err;
  });
});

app.get("/", function(req, res) {
  res.send("GET Request");
});

app.post("/", function(req, res) {
  res.send("POST Request");
})

//Server auf localhost 127.0.0.1:3000
app.listen(3000, function(){
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});
