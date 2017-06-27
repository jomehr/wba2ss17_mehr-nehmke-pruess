const express = require("express"); //importieren von Express als externes Modul
const router = express.Router();
const bodyParser =  require("body-parser"); //importieren von bodyParser als externes Modul
const fs = require("fs");

const ressourceName ="user";

//user ROUTEN

//Router repräsentiert einen User der Middleware
router.use(function timeLog(req, res, next){
  console.log("User Route Time Log", Date.now());
  next();
})

//Errorhandler
router.use(function(err, req, res, next) {
  console.log(err.stack);
  res.end(err.status + " " + err.messages);
});

//GET auf Pfad "/user"
router.get("/", function(req, res) {
  res.send("Alle user");
});

//POST auf Pfad "/user" um einen neuen anzulegen
router.post("/", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id});
});

//GET auf Pfad "/user" und Parameter userId
router.get("/:userid", function(req, res) {
  res.send("User mit ID: " + req.params.userId);
});

//POST auf Pfad "/user" und Parameter userId
router.post("/:userid", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:userid" + ressourceName + "/:userid" + req.body.id});
});

//GET auf Pfad "/user" und Parameter first_name
router.get("/:first_name", function(req, res) {
  res.send("User mit Vorname: " + req.params.first_name);
});

//POST auf Pfad "/user" und Parameter first_name
router.post("/:first_name", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:first_name" + ressourceName + "/:first_name" + req.body.id});
});

//GET auf Pfad "/user" und Parameter last_name
router.get("/:last_name", function(req, res) {
  res.send("User mit Nachname: " + req.params.last_name);
});

//POST auf Pfad "/user" und Parameter last_name
router.post("/:last_name", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:last_name" + ressourceName + "/:last_name" + req.body.id});
});

//GET auf Pfad "/user" und Parameter age
router.get("/:age", function(req, res) {
  res.send("User mit Alter: " + req.params.age);
});

//POST auf Pfad "/user" und Parameter age
//Es müsste das aktuelle datum Date.now() minus das geburtsdatum gerechnet werden!!!
router.post("/:age", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:age" + ressourceName + "/:age" + req.body.id});
});

//GET auf Pfad "/user" und Parameter level
router.get("/:level", function(req, res) {
  res.send("User mit Level: " + req.params.level);
});

//POST auf Pfad "/user" und Parameter level
router.post("/:level", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:level" + ressourceName + "/:level" + req.body.id});
});

//GET auf Pfad "/user" und Parameter userId und picture
router.get("/:userid", function(req, res) {
  res.send("User mit ID: " + req.params.userId "Anzeige Profilbild:" + req.params.picture);
});

//POST auf Pfad "/user" und Parameter picture
router.post("/:picture", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:picture" + ressourceName + "/:picture" + req.body.id});
});

//Neuen User ausgeben
router.get("/new", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

//Neuen User anlegen
router.post("/new", function(req,res) {
  response = {
    userid: res.query.userid,
    picture: res.query.,
    first_name: res.query.first_name,
    last_name: res.query.last_name,
    age: res.query.age,
    level: res.query.level,
    }
  };
  var tmp = JSON.stringify(response, null, 4);
  console.log(tmp);
  res.end(tmp);
  fs.writeFile(__dirname+"/newuser.json", tmp, function(err){
     if (err) throw err;
  });
});

//zugriff auf den kompletten body des Requests
req.body;

//zugriff auf einzelne übergebene Parameter
req.params;

/*
//Zugriff auf Parameter userId
router.get("/:userId", function(req, res) {
    var userId=parseInt(req.params.userId);   //Parameter aus dem Request Objekt auslesen und in eine Variable speichern
    if (isNaN(userId)){res.status(400).json(data.errors.badParameters)}   //Parameter zur Vailidierung
    var user=data.users.filter(function(u){return u.userId==userId});     //Response mit gefilterten User Daten
    res.status(200).json(user);
});
*/

//POST auf "/" erhält JSON bodies
router.post("/", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({
    uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id
  });
});

//Modul bereitstellen, um es in der Main App zur verfügung zu haben
module.exports = router;
