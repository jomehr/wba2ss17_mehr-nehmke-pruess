var mongoose = require('mongoose');


var gameSchema = mongoose.Schema({

	 id:  String,
	 titel :  String,
	 description :  String,
	 endcoordinates :  String ,
	 creator :   String ,
	 creationdate : String,
	 startdate : String ,
	 expirationdate :  String ,
	 finished : Boolean,
	 reward :  String,
	 url :  String ,
	 clues: [{}],
	 participants: [{}]
});
module.exports = mongoose.model('Game',gameSchema);
