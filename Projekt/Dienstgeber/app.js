const fs = require("fs");
const redis = require ("redis"),
    client = redis.createClient();

//speicher aktuelle zeit ab
var date = Date();

function loadData() {
	return JSON.parse(fs.readFileSync(__dirname + '/game/games.json'))
};

function saveData (data) {
	fs.writeFileSync(__dirname + '/games.json', JSON.stringify(data, 0, 4))
};

global.gamedatabase = loadData();

client.on('error', function(err){
  console.log("Error " + err);
});

client.set("gamejson", JSON.stringify(gamedatabase), redis.print);
client.get("gamejson", redis.print);
