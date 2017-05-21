
var fs = require('fs')
queryOverpass = require('query-overpass');
var geojson


var overpass = queryOverpass('[out:json];node(57.7,11.9,57.8,12.0)[amenity=bar];out;', function(err, geojson) {
    if (!err) {
      //  data = JSON.stringify(geojson);
      var tmp = geojson.toString();
      console.log(geojson);
      //  data = JSON.parse(geojson);
    } else {
        console.error(err);
      }
      var data = JSON.stringify(geojson);

      fs.writeFile(__dirname+"/geojson.json", data, function(err){      //JSON-Datai mit Sortiertem String schreiben
         if (err) throw err;
       });
});
