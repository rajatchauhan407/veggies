const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const adminController = require('../controllers/admin');
const vegController= require('../controllers/vegPrices');

router.post("/adminAuth", adminController.adminAuthentication);

router.get("/admin-prices", vegController.getPrices);

module.exports=router;