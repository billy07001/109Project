var express = require('express');
var router = express.Router();
var eventhistory = require('../models/eventhis');
var multer = require('multer');

//取得
router.get('getOneeventhistory/:memname', function(req, res){
    eventhistory.findOne({hisEveIssName: req.params.memname}, (err, eventhistory) => {
        //res.render('eventhistory', { title: '109 Project', eventhistory : eventhistory });
        if(err) res.send(err);
        else {
            res.json(eventhistory);
        }
    })
});


//新增資料
router.post('/createeventhistory', function(req, res, next){
    const evename = req.body.evename;
    const issname = req.body.issname;
    const helpname = req.body.helpname;
    const date = req.body.date;

    eventhistory.create({ hisEveName: evename, hisEveIssName : issname, hisEveHelpName : helpname, hisEveDate: date }, (err)=>{
        if(err){
            console.log(err);
            res.send(err);
        }

        else{
            res.json({
                status: "success",
                message: "create eventhistory successfully!",
                body: req.body,
            })
        }
    });
});


//更新
router.put('/updateeventhistory/:evename', function(req, res){
    eventhistory.updateOne({ hisEveName: req.params.evename }, req.body )
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
router.delete('/deleteeventhistory/:evename', function(req, res){
    eventhistory.deleteOne({ hisEveName: req.params.evename }).catch((error) => {
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