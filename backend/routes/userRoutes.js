const express= require('express');
const router = express.Router();
const userController= require('../controllers/user');
const checkUser = require('../middleware/checkPhoneNumber');

//Creating a user and Otp verification
router.post("/signUp",checkUser,userController.createUser);
router.post("/login",userController.loginUser);
module.exports=router;