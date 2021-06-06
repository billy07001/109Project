var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        proPoint : Number ,
        proPic : String ,
        proName : String ,
        proSponsor : String ,
        proInfo : String       
    }
);

//Export model
module.exports = mongoose.model('product', ProductSchema);