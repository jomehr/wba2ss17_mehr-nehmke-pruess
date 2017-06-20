
const express =  require ("express");
const app =  express();
//const router = express.Router();
const settings = {
  port: 3000
};

app.listen(3000, function(){
  console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});

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

const game = require("./game");

app.use("/game", game);

app.get('/', function(req, res) {
  res.send('GET Request Hello World');
});

app.post('/', function(req, res) {
  res.send('POST Request');
})

app.put('/game', function(req, res) {
  res.send('PUT Request at /game');
})

app.delete('/game', function(req, res) {
  res.send('DELETE Request at /game');
})

app.get('/', function(req, res) {
  res.send('GET Request game userid');
});
