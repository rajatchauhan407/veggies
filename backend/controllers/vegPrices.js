const Vege = require('../models/vege');
const Bucket = require('../models/bucket');
const Orders = require('../models/orders');
/***************Adding Prices to the menu of vegetable*******/
exports.prices = (req,res,next)=>{
 const vege = new Vege({
    vegName:req.body.name,
    vCode:req.body.vCode,
    price:req.body.price,
    availability:req.body.availability
 });
 vege.save().then(result =>{
    res.status(200).json({
        message:"Data is being sent"
    })
 }).catch(error=>{
     console.log(error);
     res.status(501).json({
         message:error
     })
 });  
};
/******************Getting Prices and All products *******/
exports.getPrices=(req,res,next)=>{
        Vege.find().then(result =>{
            res.status(201).json({
              response:result
            });
        }).catch(error=>{
            console.log(error);
        })
};
/********************Adding Vegetables to the Bucket to the Bucket *********/
exports.addVegBucket = (req,res,next)=>{
    const bucket = new Bucket({
        vegId:  req.body.vegId,
        quantity: req.body.quantity,
        price: req.body.price,
        userId: req.body.userId,
        vegName:req.body.vegName
     });
     bucket.save().then(result =>{
        res.status(200).json({
            message:"Data is being sent"
        })
     }).catch(error=>{
         res.status(501).json({
             message:error
         })
     }); 
};
/****************** Getting vegetables in the bucket *******/
exports.getVegBucket = (req, res, next)=>{
    const userId = req.body.userId;
    Bucket.find({'userId': userId}).then(result =>{
            res.status(201).json({
                response : result
            });
    })
};
/******************* Add Orders ***********/
exports.orders = (req, res, next)=>{
    res.status(201).json({
        message: 'Data is being sent'
    })
};