var fs = require('fs'); //File System einbinden

fs.readFile(__dirname+"/staedte.json", function(err, data){ //Daten einlesen

    if (err) throw err;

	var tmp = data.toString(); //Daten von Binär nach String ändern

	var obj = JSON.parse(tmp); //String in Java Objek ändern

	console.log('\n');

	for ( var i=0; i < obj.cities.length; i++){
		console.log('Name: ' + obj.cities[i].name);
		console.log('Land: ' + obj.cities[i].country);
		console.log('Population: ' + obj.cities[i].population);
		console.log('---------------------------');
	}
});
