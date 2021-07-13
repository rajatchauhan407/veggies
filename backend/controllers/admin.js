const User = require("../models/user");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const Vege = require('../models/vege');

/****************Admin Auth ****************/
exports.adminAuthentication = (req, res, next) => {
    // const admin = new Admin({
    //   email:"rajatchauha407@gmail.com",
    //   password:"e4b3cd7df927ee037044b83c097bd3573e7b4db1dcb39813da4f964e01d9581e"
    // });
    // admin.save();
      const email = req.body.email;
      const password = req.body.password;
       console.log(req.res.locals.userId);
      Admin.findOne({
        'email':email
      }).then(result =>{
        console.log(result);
       const hash = result.password;
       const salt = "getItSoon1995";
       const hash_from_user = crypto.createHmac("sha256",salt).update(password).digest('hex');
      if(hash_from_user == hash){
        const token = jwt.sign(
          {
           email:email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "24h",
          }
        );
        res.status(201).json({
          token:token,
          expiresIn:24*3600,
          userId:result._id
        });
        console.log("Verified"); 
      }else{
        res.status(501).json({
          error : "Not Verified"
        });
      }
     }).catch(error =>{
       console.log(error);
      });
  
  };

  /*************Add Vegetables ***********/
 exports.addVeggies = (req , res , next) =>{
   const url = req.protocol + "://" + req.get("host");
   const vegetable = req.body.vegetable;
   const price = req.body.price;
   const vege = new Vege({
    vegName       : req.body.vegetable,
    price         : req.body.price,
    availability  : true,
    imagePath     : url + "/images/" + req.file.filename 
   });
   vege.save().then(result =>{
     res.status(201).json({
       message: "New Vegetable Uploaded",
       response : result
     })
   }).catch(error =>{
    res.status(501).json({
      error: error,
      message: "Could Not resolve the request"
    });
  });
 };
 /*********Get Single Veg Data *******/
 exports.getSingleVeg = (req, res, next) =>{
   const id = req.query.id;
   console.log(id);
   Vege.findOne({_id : id}).then(result =>{
     res.status(201).json({
      response:result
     });
   }).catch(error =>{
      res.status(501).json({
        error : 'Could not Resolve Request'
      });
   });
 }
/********************Update Prices of the Vegetabels ***********/
