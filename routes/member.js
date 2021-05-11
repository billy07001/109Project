var express = require('express');
var router = express.Router();
var member = require('../models/member');

//Member List
router.get('/', function(req, res){
    member.find({}, (err, allmember)=>{
        res.render('member',{ title: '109 Project', allmember : allmember });
    })
});


module.exports = router;