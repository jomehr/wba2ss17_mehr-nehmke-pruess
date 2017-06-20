const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");

const ressourceName ="game";

router.get("/", function(req, res) {
  res.send("Alle games");
});

module.exports = router;
