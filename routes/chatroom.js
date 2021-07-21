var express = require('express');
var router = express.Router();
var chatroom = require('../models/chatroom');
var multer = require('multer');
var ObjectId = require("mongoose").Types.ObjectId;


router.get('/getAllchatrooms', function(req, res){
    chatroom.find({}, (err, allchatroom) => {
        if(err) res.send(err);
        else{
            res.json(allchatroom);
            console.log(allchatroom);
        }
    })

});

router.get('/getOnechatrooms/:id', function(req, res){
    chatroom.findOne({_id: ObjectId(req.params.id)}, (err, chatroom) => {
        if(err) res.send(err);
        else {
            res.json(chatroom);
        }
    })
});


//新增資料
router.post('/createchatroom', function(req, res, next){
    chatroom.create({ chaIssuerID: req.body.chaIsssuerID, chaHelperID: req.body.chaHelperID, chaMessage: req.body.chatMessage })
    .catch((error) => {
        res.status(200).json({
           status: "error",
           message: "error!",
        });
    })
    .then(() => {
        res.status(200).json({
            status: "success",
            message: "create chatroom successfully!",
        });
        res.send('POST');
    });
});

//更新
router.put('/updatechatroom/:id', function(req, res){
    chatroom.updateOne({ _id: ObjectId(req.params.id) }, req.body )
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "update error!",
        });
        console.log(error);
    })
    .then((chatroom) => {
        res.status(200).json({
            status: "success",
            message: "udate chatroom successfully!",
            chatroom: chatroom,
        });
    });
});

//刪除
router.delete('/deletechatroom/:id', function(req, res){
    member.deleteOne({ _id: ObjectId(req.params.id)})
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "error!",
        });
        console.log(error);
    })
    .then(() => {
        res.status(200).json({
            status: "success",
            message: "Delete successfully!",
        });
    });
});

module.exports = router;