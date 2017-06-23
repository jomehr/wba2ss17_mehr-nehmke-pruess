const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");

const ressourceName ="game";

router.use(function timelog(req, res, next) {
  console.log("Game Route Time Log", Date.now());
  next();
});

router.get("/", function(req, res) {
  res.send("Alle games");
});

router.get("/:gameId", function(req, res) {
    res.send("Game mit ID: " + req.params.gameId);
});

router.post("/", bodyParser.json(), function(req, res) {
  req.accpets("html")

  res.format({
    "application/json": function() {
      var data = require("./gametest.json");
      res.send(data);
    }
  });

  console.log(req.body)
  // res.status(200).json({
  //   uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id
  // });
});



module.exports = router;
