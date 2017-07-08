var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var JSONSchema = new Schema({
		json: Object
});
JSONSchema.json = JSON.parse(fs.readFileSync(__dirname + "/games.json"));
module.exports = mongoose.model('GameJSON', JSONSchema);
