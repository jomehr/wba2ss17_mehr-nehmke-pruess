var fs = require('fs');
var chalk = require('chalk');   //chalk einbinden

fs.readFile(__dirname+"/staedte.json", function(err, data){ //Daten einlesen

    if (err) throw err;

	var tmp = data.toString();     //Daten in String umwandeln
	var obj = JSON.parse(tmp);     //in Objekt umwandeln

	for ( var i=0; i < obj.cities.length; i++){  //Objekt auslesen
		console.log('Name: ' + chalk.red(obj.cities[i].name));
		console.log('Land: ' + chalk.green(obj.cities[i].country));
		console.log('Population: ' + chalk.blue(obj.cities[i].population));
		console.log('---------------------------');
	}
});
