var fs = require('fs'); //File System einbinden(ermöglicht Asynchronität)

fs.readFile(__dirname+"/staedte.json", function(err, data){ //Daten einlesen

    if (err) throw err;

	var tmp = data.toString(); //Binärdaten in String umwandeln
	//console.log(tmp); //test
	var obj = JSON.parse(tmp); //JSON-String in Javascript-Objekt umwandeln

	console.log('\n');
	//Objekt auslesen
	for ( var i=0; i < obj.cities.length; i++){
		console.log('Name: ' + obj.cities[i].name);
		console.log('Land: ' + obj.cities[i].country);
		console.log('Population: ' + obj.cities[i].population);
		console.log('---------------------------');
	}
});
