const express = require("express");
const router = express.Router();
const bodyParser =  require("body-parser");

const ressourceName ="user";

router.get("/", function(req, res) {
  res.send("Alle user");
});

module.exports = router;
