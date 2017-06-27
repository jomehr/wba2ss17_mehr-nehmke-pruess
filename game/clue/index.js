const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");

const ressourceName ="clue";

router.use(function timelog(req, res, next) {
  console.log("Game Route Time Log", Date.now());
  next();
});

router.get("/", function(req, res) {
  res.send("Alle clues");
});

router.get("/:clueID", function(req, res) {
    res.send("Hinweis mit ID: " + req.params.clueID);
});

router.post("/", bodyParser.json(), function(req, res) {

  res.format({
    "application/json": function() {
      var data = require("./cluetest.json");
      res.json(data);
    }
  });
//     console.log(req.body);
//     res.status(200).json({
//     uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id
//   });
});

module.exports = router;
