var mongoose = require('mongoose');


var clueSchema = mongoose.Schema({


				gameid: String,
				 id : String,
				 titel : String,
				 description :String ,
				 coordinate : String ,
				 creator : String ,
			  gameurl :  String,
				 creationdate : String


});
module.exports = mongoose.model('Clue',clueSchema);
