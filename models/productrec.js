var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema(
    {
        recTime : String ,
        recMemName : String
    }
);

//Export model
module.exports = mongoose.model('records', RecordSchema);