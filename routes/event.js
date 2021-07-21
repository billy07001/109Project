var express = require('express');
var router = express.Router();
var event = require('../models/event');
var multer = require('multer');
var ObjectId = require("mongoose").Types.ObjectId;

//event List
//取得
router.get('/getAllevents', function(req, res){
    event.find({}, (err, allevent) => {
        //res.render('event',{ title: '109 Project', allevent : allevent });
        if(err) res.send(err);
        else{
            res.json(allevent);
            console.log(allevent);
        }
    })
});

router.get('getOneevents/:id', function(req, res){
    event.findOne({_id: ObjectId(req.params.id)}, (err, event) => {
        //res.render('event', {title: '109 Project' , allevent : allevent });
        if(err) res.send(err);
        else{
            res.json(event);
        }
    })
});

router.get('/createevent', function(req, res){
    event.find({}, (err, allevent) => {
        res.render('addevent', { title: '109 Project', allevent : allevent});
    })
});

//新增資料
router.post('/createevent', function(req, res, next){
    event.create({ eveName: req.body.eveName, eveState: req.body.eveState, eveType: req.body.eveType, eveLoc: req.body.eveLoc, eveIssuerID: req.body.eveIssuerID, eveHelper: req.body.eveHelper, eveTime: req.body.eveTime})
    .catch((error) => {
        res.status(200).json({
           status: "error",
           message: "error!",
        });
    })
    .then(() => {
        res.status(200).json({
            status: "success",
            message: "create event successfully!",
        });
    });
});

//更新
router.put('/updatemember/:id', function(req, res){
    event.updateOne({ _id: ObjectId(req.params.id) }, req.body )
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "update error!",
        });
        console.log(error);
    })
    .then((event) => {
        res.status(200).json({
            status: "success",
            message: "update event successfully!",
            event: event,
        });
    });
});

//刪除
router.delete('/deleteevent/:id', function(req, res){
    event.deleteOne({ _id: ObjectId(req.params.id) })
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
            message: "delete successfully!",
        });
    });
});

module.exports = router;
