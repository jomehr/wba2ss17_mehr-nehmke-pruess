var mongoose = require('mongoose');


var participantSchema = mongoose.Schema({


	 gameid : String,
	 id : String,
	 first_name : String,
	 last_name : String,
	 username : String,
	 gameurl :  String,
	 joindate : String

});
module.exports = mongoose.model('Participant',participantSchema);
