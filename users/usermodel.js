var mongoose = require('mongoose');


var userSchema = mongoose.Schema({

		id: String,
		url: String,
		user_name: String,
		first_name: String,
		last_name: String,
		age: Number,
		email: String,
		password: String
});
module.exports = mongoose.model('User',userSchema);
