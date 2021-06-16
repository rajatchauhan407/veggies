const express= require('express');
const router = express.Router();
const vegController= require('../controllers/vegPrices');



router.post("/prices",vegController.prices);
router.get("/prices",vegController.getPrices);
router.post("/bucket",vegController.addVegBucket);
router.get("/bucket",vegController.getVegBucket);
router.post("/orders",vegController.orders);

module.exports=router;