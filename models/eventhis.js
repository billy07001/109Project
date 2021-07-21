var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema(
    {
        hisEveID : Number,
        hisMemID : Number,
        hisEveTime : Date
    }
);

//Export model
module.exports = mongoose.model('eventhistory', HistorySchema);