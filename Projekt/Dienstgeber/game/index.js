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
    // var gameId = parseInt(req.params.gameId);
    // if (isNaN(gameId)) {
    //   res.status(400).json(data.errors.badParameters)
    // }
    // var game = data.game.filter(function(u) {
    //   return u.gameId == gameID
    // });
    // res.status(200).json(gameId);
    res.send("Game mit ID: " + req.params.gameId);
});

// router.get("/:gameId/clue", function(req, res) {
//     res.send("Alle clues zu Game mit ID: " + req.params.gameId);
// });
//
// router.get("/:gameId/clue/:clueId", function(req, res) {
//     res.send("Clue mit ID: " + req.params.clueId);
// });

router.post("/", bodyParser.json(), function(req, res) {
  // console.log(req.body);
  // req.params;
  // res.format({
  //   "application/json": function() {
  //     var data = require("./gametest.json");
  //     res.json(data);
  //   }
  //});
  console.log(req.body);
  res.status(200).json({
    uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id
  });
});
router.post("/:gameId/clue/", bodyParser.json(), function(req, res) {

  res.format({
    "application/json": function() {
      var data = require("./clue/cluetest.json");
      res.json(data);
    }
  });
});



module.exports = router;
