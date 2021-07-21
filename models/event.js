var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema(
    {
        eveName : String ,
        eveState : Boolean ,
        eveType : String ,
        eveLoc : String ,
        eveIssuerID : Number ,
        eveHelper : Number ,
        eveTime : Date
    }
);

//Export model
module.exports = mongoose.model('event', EventSchema);
