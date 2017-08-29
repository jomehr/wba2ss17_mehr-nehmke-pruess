var mongoose = require('mongoose');


var mediaSchema = mongoose.Schema({

    gameid  : String,
    clueid  :String,
    id  : String,
    titel  : String ,
    uploader  : String ,
    mediaurl  :String,
    gameurl  :  String,
    creationdate  : String

});
module.exports = mongoose.model('Media',mediaSchema);
