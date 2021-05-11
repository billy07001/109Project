var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema(
    {
        memID : Number ,
        memName : String ,
        memEmail : String ,
        memPoint : Number ,
        memGrade : Number ,
        memSex : String ,
        memCount : Number 
    }
);

//Export model
module.exports = mongoose.model('member', MemberSchema);