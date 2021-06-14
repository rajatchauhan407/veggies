const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*******************Vegetable Schema ***********/
const vegSchema = new Schema({
    vegName:        {type:String, required:true},
    vCode:       {type:String, required:true},
    price:       {type:Number, required:true},
    availability:{type:Boolean, required:true}
});

/******************Bucket Schema **********/
const bucketSchema = new Schema({
        vegId:{type:ObjectId, required:true },
        quantity:{type:Number, required:true},
        price: {type:Number, required:true},
        userId:{type:ObjectId, required:true},
        vegName:{type:String, required:true}
});

/****************** Orders Schema **************/
const orderSchema = new Schema({
orderedOn:{type:Date, required:true},
userId:{type:ObjectId, required:true},
vegetables:{
         veg:{
            vegId:{type:ObjectId, required:true },
            quantity:{type:Number, required:true},
            price: {type:Number, required:true},
            vegName:{type:String, required:true}    
            }
            }
});



module.exports = mongoose.model('Vege',vegSchema);
module.exports = mongoose.model('Bucket',bucketSchema);
module.exports == mongoose.model('Order',orderSchema);