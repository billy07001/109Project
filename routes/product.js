var express = require('express');
var router = express.Router();
var product = require('../models/product');
var multer = require('multer');
var ObjectId = require("mongoose").Types.ObjectId;

//Product List
//GET
router.get('/getAllproducts', function(req, res){
    product.find({}, (err, allproduct)=>{
        if (err) res.send(err);
        else {
            res.json(allproduct);
            console.log(allproduct);
        }
    })
});

router.get('/getOneproducts/:id', function(req, res){
    product.findOne({_id: ObjectId(req.params.id)}, (err, product)=>{
        if (err) res.send(err);
        else {
            res.json(product);
        }
    })
});

//POST
router.post('/createproduct', function(req, res){
    product.create({proPoint: req.body.point , proPic: req.body.pic , proName: req.body.name , proSponsor: req.body.sponsor , proInfo: req.body.info}, (err)=>{
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
router.delete('/deleteproduct/:id', function(req, res){
    product.deleteOne({ _id: ObjectId(req.params.id) })
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
router.put('/updateproduct/:id', function(req, res){
    product.updateOne({ _id: ObjectId(req.params.id) }, req.body)
    .catch((error) => {
        res.status(200).json({
            status: "error",
            message: "Query error!",
        });
        console.log(error);
    })
    .then((product) => {
        res.status(200).json({
            status: "success",
            product: product,
        });
    });
})

module.exports = router;