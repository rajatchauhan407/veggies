const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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
module.exports =mongoose.model('Order',orderSchema);