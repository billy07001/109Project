var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {
        chaIssuerID : Number ,
        chaHelperID : Number ,
        chatMessage : Object
    }
);

//Export model
module.exports = mongoose.model('chatroom', ChatSchema);