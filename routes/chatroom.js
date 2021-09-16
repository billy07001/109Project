var express = require('express');
var router = express.Router();
var chatroom = require('../models/chatroom');
var multer = require('multer');

//Socket
router.post('/chat', (req, res, io) => {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events
        socket.on('admin', function () {
            console.log('Successful Socket Test');
        });

        //End ON Events
    });
})

router.get('/getAllchatrooms', function(req, res){
    chatroom.find({}, (err, allchatroom) => {
        if(err) res.send(err);
        else{
            res.json(allchatroom);
            console.log(allchatroom);
        }
    })

});

router.get('/getOnechatrooms/:name', function(req, res){
    chatroom.findOne( { chaIssuerName: req.params.name }, (err, chatroom) => {
        if(err) res.send(err);
        else {
            res.json(chatroom);
        }
    })
});
router.get('/getOnechatrooms/:name', function(req, res){
    chatroom.findOne( { chaHelperName: req.params.name }, (err, chatroom) => {
        if(err) res.send(err);
        else {
            res.json(chatroom);
        }
    })
});


//新增資料
router.post('/createchatroom', function(req, res, next){
    const evename = req.body.evename;
    const issname = req.body.issname;
    const helpname = req.body.helpname;
    const message = req.body.message;

    chatroom.create({ chaEveName: evename, chaIssuerName: issname, chaHelperName: helpname, chaMessage: message },(err)=>{
        if(err){
            console.log(err);
            res.send(err);
        }

        else{
            res.json({
                status: "success",
                message: "create chatroom successfully!",
                body: req.body,
            })
        }
    })
});

//更新
router.put('/updatechatroom/:evename', function(req, res){
    chatroom.updateOne({ chaEveName: req.params.evename }, req.body )
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
router.delete('/deletechatroom/:evename', function(req, res){
    member.deleteOne({ chaEveName: req.params.evename})
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "delete failed!",
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