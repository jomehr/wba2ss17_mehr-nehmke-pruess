var mongoose = require('mongoose'),
		Schema = mongoose.Schema;
const fs = require("fs");
var JSONSchema = new Schema({
		json: Object
});
module.exports = mongoose.model('UserJSON', JSONSchema);
