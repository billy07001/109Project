var express = require('express');
var router = express.Router();
var records = require('../models/productrec');
var multer = require('multer');
var ObjectId = require("mongoose").Types.ObjectId;

//Product Record List
//GET
router.get('/getAllproductrecs', function(req, res){
    records.find({}, (err, allproductrec)=>{
        if (err) res.send(err);
        else {
            res.json(allproductrec);
            console.log(allproductrec);
        }
    })
});

router.get('/getOneproductrecs/:id', function(req, res){
    records.findOne({_id: ObjectId(req.params.id)}, (err, productrec)=>{
        if (err) res.send(err);
        else {
            res.json(productrec);
        }
    })
});

router.post('/createproductrec', function(req, res){
    records.create({recTime: req.body.time , recMemName: req.body.name}, (err)=>{
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

//DELETE
router.delete('/deleteproductrec/:id', function(req, res){
    records.deleteOne({ _id: ObjectId(req.params.id) })
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

module.exports = router;