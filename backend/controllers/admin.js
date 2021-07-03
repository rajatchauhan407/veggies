const User = require("../models/user");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
/****************Admin Auth ****************/
exports.adminAuthentication = (req, res, next) => {
    // const admin = new Admin({
    //   email:"rajatchauha407@gmail.com",
    //   password:"e4b3cd7df927ee037044b83c097bd3573e7b4db1dcb39813da4f964e01d9581e"
    // });
    // admin.save();
      const email = req.body.email;
      const password = req.body.password;
      Admin.findOne({
        email:email
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
          expiresIn:"24",
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