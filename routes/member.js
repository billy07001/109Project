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
    member.findOne({ email: req.body.email }).then((user) => {
        if (!user || req.body.password != user.password) {
            res.status(200).json({
                status: "error",
                message:
                    "Oops! Your email address or password doesn't match our record.",
            });
        } 
        
        else {
            let token = generateToken();
            member.findOneAndUpdate({
                query: { memName: user.memName },
                update: { $set: { _token: token } },
            })
                .select(["name"])
                .then((user) => {
                    res.status(200)
                        .cookie("_token", token, {
                            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                        })
                        .json({
                            status: "success",
                            message: "Login success!",
                            user: user,
                        });
                });
        }
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