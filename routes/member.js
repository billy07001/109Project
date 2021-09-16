var express = require('express');
var router = express.Router();
var member = require('../models/member');
var multer = require('multer');
var ObjectId = require("mongoose").Types.ObjectId;

var generateToken = () => {
    return Math.random().toString(36).substr(2);
};

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

router.get('/getOnemembers/:name', function(req, res){
    member.findOne({memName: req.params.name}, (err, member)=>{
        //res.render('member',{ title: '109 Project', allmember : allmember });
        if (err) res.send(err);
        else {
            res.json(member);
        }
    })
});

//POST
router.post('/createmember', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const sex = req.body.sex;

    member.create({memName: name , memEmail: email , memPass: password , memPoint: 100 , memGrade: 5.0 , memSex: sex , memCount: 0}, (err)=>{
        if (err) {
            console.log(err);
            res.send(err);
        }

        else {
            res.json({
                status: "success",
                message: "Registered successfully!",
                body: req.body
                })
        }
    })
});


router.post('/login', function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    member.find({memEmail:email}, function(err, user){
        if (err || user[0].memPass != password){
            res.json({
                status: "Error",
                message: "Login Fail",
                err: err
            })
        }

        else {
            res.json({
                status: "Success",
                message: "Login Success",
                token: user[0].memName
            })
        }
    })
});


//DELETE
router.delete('/deletemember/:name', function(req, res){
    member.deleteOne({ memName: req.param.name})
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
router.put('/updatemember/:name', function(req, res){
    member.updateOne({ memName: req.params.name }, req.body)
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