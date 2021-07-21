var express = require('express');
var router = express.Router();
var eventhistory = require('../models/eventhis');
var multer = require('multer');
var ObjectId = require("mongoose").Types.ObjectId;

//取得
router.get('/getAlleventhistories', function(req, res){
    eventhistory.find({}, (err, alleventhistory) => {
        //res.render('eventhistory',{ title: '109 Project', alleventhistory : alleventhistory });
        if(err) res.send(err);
        else{
            res.json(alleventhistory);
            console.log(alleventhistory);
        }
    })

});

router.get('getOneeventhistory/:id', function(req, res){
    eventhistory.findOne({}, (err, event) => {
        //res.render('eventhistory', { title: '109 Project', eventhistory : eventhistory });
        if(err) res.send(err);
        else {
            res.json(event);
        }
    })
});


//新增資料
router.post('/createeventhistory', function(req, res, next){
    eventhistory.create({ hisMemID: req.body.hisMemID, hisEveTime: req.body.hisEveTime })
    .catch((error) => {
        res.status(200).json({
           status: "error",
           message: "error!",
        });
    })
    .then(() => {
        res.status(200).json({
            status: "success",
            message: "create eventhistory successfully!",
        })
        res.send('POST');
    });    
});

//更新
router.put('/updateeventhistory/:id', function(req, res){
    eventhistory.updateOne({ _id: ObjectId(req.params.id) }, req.body )
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "update error!",
        });
        console.log(error);
    })
    .then((eventhistory) => {
        res.status(200).json({
            status: "success",
            message: "update history successfully!",
            eventhistory: eventhistory,
        });
    });
});

//刪除
router.delete('/deleteeventhistory/:id', function(req, res){
    eventhistory.deleteOne({ _id: ObjectId(req.params.id) }).catch((error) => {
        res.status(200).json({
            status: "error",
            message: "delete failed!",
        });
        console.log(error);
    })
    .then(() => {
        res.status(200).json({
            status: "success",
            message: "delete successfully!",
        });
    });
});

module.exports = router;