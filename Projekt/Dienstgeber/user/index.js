const express = require("express"); //importieren von Express als externes Modul
const router = express.Router();
const bodyParser =  require("body-parser"); //importieren von bodyParser als externes Modul

const ressourceName ="user";

//user ROUTEN

//Router repräsentiert einen User der Middleware
router.use(function timeLog(req, res, next){
  console.log("User Route Time Log", Date.now());
  next();
})

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
router.get("/:userId", function(req, res) {
  res.send("User mit ID: " + req.params.userId);
});

//POST auf Pfad "/user" und Parameter userId
router.post("/:userId", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:userId" + ressourceName + "/:userId" + req.body.id});
});

router.get("/:userId/media", function(req, res) {
  res.send("User mit ID: " + req.params.userId + "Anzeige Profilbild:" + req.params.userId.media);
});

//POST auf Pfad "/user" und Parameter userId
router.post("/:userId/media", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/:userId/media" + ressourceName + "/:userId/media" + req.body.id});
});

// //Zugriff auf Parameter userId
// router.get("/:userId", function(req, res) {
//     var userId=parseInt(req.params.userId);   //Parameter aus dem Request Objekt auslesen und in eine Variable speichern
//     if (isNaN(userId)){res.status(400).json(data.errors.badParameters)}   //Parameter zur Vailidierung
//     var user=data.users.filter(function(u){return u.userId==userId});     //Response mit gefilterten User Daten
//     res.status(200).json(user);
// });


//POST auf "/" erhält JSON bodies
router.post("/", bodyParser(), function(req,res) {
  console.log(req.body)
  res.status(200).json({
    uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id
  });
});


//Modul bereitstellen, um es in der Main App zur verfügung zu haben
module.exports = router;
