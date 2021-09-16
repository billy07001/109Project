var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {
        chaEveName : String,
        chaIssuerName : String ,
        chaHelperName : String ,
        chatMessage : Object
    }
);

//Export model
module.exports = mongoose.model('chatroom', ChatSchema);