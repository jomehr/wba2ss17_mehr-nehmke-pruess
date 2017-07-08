
var fs = require('fs')
queryOverpass = require('query-overpass');
var bbbottomleft = "51.02084, 7.55946, ";
var bbtopright = "51.02634, 7.56592";
var amenity = "=restaurant"; //empty for all amenities
var query = "[out:json];node(" + bbbottomleft + bbtopright +")[amenity" +amenity + "];out;"



var overpass = queryOverpass(query, function(err, geojson) {
    if (!err) {
      var data = JSON.stringify(geojson, null, 4);
      console.log(data);

      fs.writeFile(__dirname+"/geojson.json", data, function(err){      //JSON-Datai mit Sortiertem String schreiben
         if (err) throw err;
       });
    } else {
        console.log(err);
      }
});
