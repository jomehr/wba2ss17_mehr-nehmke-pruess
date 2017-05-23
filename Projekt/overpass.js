
var fs = require('fs')
queryOverpass = require('query-overpass');
var query = '[out:json];node(57.7,11.9,57.8,12.0)[amenity=bar];out;'



var overpass = queryOverpass(query, function(err, geojson) {
    if (!err) {
      console.log(geojson);
      var data = JSON.stringify(geojson, null, 4);
      console.log(data);

      fs.writeFile(__dirname+"/geojson.json", data, function(err){      //JSON-Datai mit Sortiertem String schreiben
         if (err) throw err;
       });
    } else {
        console.log(err);
      }
});
