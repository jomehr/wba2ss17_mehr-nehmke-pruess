var fs = require('fs');
var chalk = require('chalk');   //chalk einbinden
var obj;

fs.readFile(__dirname+"/staedte.json", function(err, data){ //Daten einlesen

    if (err) throw err;

	var tmp = data.toString();     //Daten in String umwandeln
	obj = JSON.parse(tmp);         //in Objekt umwandeln



    var sor = obj.cities.sort(function (a, b) {       //aufsteigend sortieren
      return a.population - b.population;
	});
	var str = JSON.stringify(sor);     //sortierte Objekte in String umwandeln

	fs.writeFile(__dirname+"/staedte_sortiert.json", str, function(err){      //JSON-Datai mit Sortiertem String schreiben

	   if (err) throw err;

	});
	print();
});


function print(){ 	//Objekt auslesen

	for ( var i=0; i < obj.cities.length; i++){
		console.log('Name: ' + chalk.red(obj.cities[i].name));
		console.log('Land: ' + chalk.green(obj.cities[i].country));
		console.log('Population: ' + chalk.blue(obj.cities[i].population));
		console.log('---------------------------');
	}
};
