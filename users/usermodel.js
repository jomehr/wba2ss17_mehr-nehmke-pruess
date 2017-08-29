var mongoose = require('mongoose');


var userSchema = mongoose.Schema({

		id: String,
		url: String,
		user_name: String,
		first_name: String,
		last_name: String,
		age: Number,
		coordinates: [{}],
		email: String,
		password: String,
		tagabos: [{}],
		followers: [{}]
});
module.exports = mongoose.model('User',userSchema);
