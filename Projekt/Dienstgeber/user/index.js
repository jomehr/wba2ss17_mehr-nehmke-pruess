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

//Definition GET auf Pfad "/user"
router.get("/", function(req, res) {
  res.send("Alle user");
});

router.get("/:userId", function(req, res) {
    res.send("User mit ID: " + req.params.userId);
});

router.get("/:userProfilbild", function(req, res) {
    res.send("User mit Profilbild: " + req.params.userProfilbild);
});

router.get("/:userName", function(req, res) {
    res.send("User mit Name: " + req.params.userName);
});

router.get("/:userAlter", function(req, res) {
    res.send("User mit Alter: " + req.params.userAlter);
});


//POST auf "/" erhält JSON bodies
router.post("/", bodyParser.json(), function(req, res) {
  req.accpets("html")           //req=request
  res.format({                  //res=response
    //erstelle einen neuen User aus req.body
    "application/json": function() {
      var data = require("./usertest.json");
      res.send(data);
    }
  });
  console.log(req.body)
  // res.status(200).json({
  //   uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id
  // });
});


//Modul bereitstellen, um es in der Main App zur verfügung zu haben
module.exports = router;
