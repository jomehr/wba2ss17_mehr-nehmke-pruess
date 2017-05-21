
var fs = require('fs')
queryOverpass = require('query-overpass');
//
// test('can execute basic query', function(t) {
//     var req = queryOverpass('[out:json];node(57.7,11.9,57.8,12.0)[amenity=bar];out;', function(err, geojson) {
//         if (err) {
//             return t.fail(err);
//         }
//
//         t.ok(geojson, 'Should return data');
//         t.equal(geojson.type, 'FeatureCollection', 'Should return a FeatureCollection');
//         t.ok(geojson.features && geojson.features.length > 0, 'Should return at least one feature');
//
//         var f = geojson.features[0];
//         t.ok(f.properties && f.properties.tags, 'Properties are not flattened');
//
//         t.ok(req.path, 'Should return request object');
//
//         t.end();
//     });
// });
//
// test('can flatten properties', function(t) {
//     queryOverpass('[out:json];node(57.7,11.9,57.8,12.0)[amenity=restaurant];out;', function(err, geojson) {
//         if (err) {
//             return t.fail(err);
//         }
//
//         t.ok(geojson, 'Should return data');
//         t.equal(geojson.type, 'FeatureCollection', 'Should return a FeatureCollection');
//         t.ok(geojson.features && geojson.features.length > 0, 'Should return at least one feature');
//
//         var f = geojson.features[0];
//         t.ok(f.properties && !f.properties.tags && f.properties.name, 'Properties are not flattened');
//         t.end();
//     }, { flatProperties: true });
// });

    var req = queryOverpass('[out:json];node(57.7,11.9,57.8,12.0)[amenity=bar];out;', function(err, geojson) {
        if (!err) {
            var data = JSON.stringify(geojson);
            console.log(data);
        } else {
            console.error(err);

        }
});

// fs.writeFile(__dirname+"/geojson.json", data, function(err){      //JSON-Datai mit Sortiertem String schreiben
//
//    if (err) throw err;
//    });
