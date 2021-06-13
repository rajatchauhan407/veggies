const express= require('express');
const router = express.Router();
const userController= require('../controllers/user');
const priceController= require('../controllers/vegPrices')
const checkUser = require('../middleware/checkPhoneNumber');
const checkAuth= require('../middleware/auth-check');

// Creating a user and Otp verification
router.post("/signUp",checkUser,userController.createUser);
router.post("/login",userController.loginUser);
router.get("/prices",checkAuth,priceController.prices);
module.exports=router;