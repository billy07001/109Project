var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema(
    {
        memName : String ,
        memEmail : String ,
        memPass : String ,
        memPoint : Number ,
        memGrade : Number ,
        memSex : String ,
        memCount : Number 
    }
);

//Export model
module.exports = mongoose.model('member', MemberSchema);