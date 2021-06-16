const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*******************Vegetable Schema ***********/
const vegSchema = new Schema({
    vegName:        {type:String, required:true},
    vCode:          {type:String, required:true},
    price:          {type:Number, required:true},
    availability:   {type:Boolean, required:true}
});

module.exports = mongoose.model('Vege',vegSchema);

