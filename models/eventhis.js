var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema(
    {
        hisEveName : String,
        hisEveIssName : String,
        hisEveHelpName : String,
        hisEveDate : Date
    }
);

//Export model
module.exports = mongoose.model('eventhistory', HistorySchema);