
const express =  require ("express");
const app =  express ();
const fs = require ("fs");
const async = require ("async")

const settings = {
  port: 3000,
  datafile: "./testgame.json"
};

global.data = require("./data");
//read data from disk to memory
async.waterfall( [
  //reads data asynchronous and uses waterfall callback
  function(callback) {
    fs.readFile(settings.datafile, "utf-8", function(err, filestring) {
      callback(null, err, filestring);
    });
  },
  //parse as JSON and modify it to fit data strucuture
  function(err, filestring, callback) {
    if (err != null) { callback(null, false); }
    else {
      data.game = JSON.parse(filestring).game;
      callback(null, true);
    }
  }
], function(err, success) {
  if (err != null) { success = false }
  console.log("Gamedaten wurden " + (success ? "erfolgreich" : "nicht erfolgreich") + "in den Speicher geladen.");
});

//routing einbinden
const game = require("./game");
const user =  require("./user");
app.use("/game", game);
app.use("/user", user);

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

//statischer Ordner (klappt noch nicht)
//app.use(express.static("game"));

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
  var tmp = JSON.stringify(response, null, 4);
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
});

//PUT Request auf Pfad "/user"
app.put("/user", function (req, res){
  res.send("PUT User")
}),

//DELETE Request auf Pfad "/user"
app.delete("/user", function (req, res){
  res.send("DELETE User")
}),

//GET Request auf Parameter userId
app.get("/user/:userId", function (req, res){
  res.send("UserId: " +req.params.userId)
});

//Server auf localhost 127.0.0.1:3000
app.listen(3000, function(){
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});
