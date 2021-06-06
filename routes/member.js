var express = require('express');
var router = express.Router();
var member = require('../models/member');
var multer = require('multer');
var ObjectId = require("mongoose").Types.ObjectId;

//Member List
//GET
router.get('/getAllmembers', function(req, res){
    member.find({}, (err, allmember)=>{
        //res.render('member',{ title: '109 Project', allmember : allmember });
        if (err) res.send(err);
        else {
            res.json(allmember);
            console.log(allmember);
        }
    })
});

router.get('/getOnemembers/:id', function(req, res){
    member.findOne({_id: ObjectId(req.params.id)}, (err, member)=>{
        //res.render('member',{ title: '109 Project', allmember : allmember });
        if (err) res.send(err);
        else {
            res.json(member);
        }
    })
});

router.get('/createmember', function(req, res){
    member.find({}, (err, allmember)=>{
        res.render('addmember',{ title: '109 Project', allmember: allmember});
    })
});

//POST
router.post('/createmember', function(req, res, next){
    member.create({memName: req.body.name , memEmail: req.body.email , memPass: req.body.password , memPoint: 100 , memGrade: 5.0 , memSex: req.body.sex , memCount: 0})
       .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "Something went wrong!",
        });
        })
       .then(() => {
        res.status(200).json({
            status: "success",
            message: "Registered successfully!",
            })
        });
});


//DELETE
router.delete('/deletemember/:id', function(req, res){
    member.deleteOne({ _id: ObjectId(req.params.id)})
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "Query error!",
        });
        console.log(error);
    })
    .then(() => {
        res.status(200).json({
            status: "success",
            message: "Query successfully!",
        });
    });
})

//PUT
router.put('/updatemember/:id', function(req, res){
    member.updateOne({ _id: ObjectId(req.params.id) }, req.body)
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "Query error!",
        });
        console.log(error);
    })
    .then((member) => {
        res.status(200).json({
            status: "success",
            member: member,
        });
    });
})


module.exports = router;