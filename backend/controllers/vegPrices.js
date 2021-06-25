const Vege = require('../models/vege');
const Bucket = require('../models/bucket');
const Orders = require('../models/orders');
const url = require('url');
/***************Adding Prices to the menu of vegetable*******/
exports.prices = (req,res,next)=>{
 const vege = new Vege({
    vegName:req.body.name,
    vCode:req.body.vCode,
    price:req.body.price,
    availability:req.body.availability
 });
 vege.save().then(result =>{
     console.log(req.userId);
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
        console.log(req.res.locals.userId);
            res.status(201).json({
              response:result,
              userId: req.res.locals.userId
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
    const userId = req.query.id;
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    // console.log(req.query);
    const BucketQuery = Bucket.find({'userId': userId});
    let fetchedBucket;
    let subTotal=0;
    function calculateSubtotal(){
        Bucket.find({'userId' : userId}).then((result) => {
            result.forEach(data => {
                subTotal += data.quantity * data.price;
                // console.log(data.quantity * data.price);
            });
            console.log(subTotal);
        });
    }
    calculateSubtotal();
    if(userId && pageSize && currentPage){
        BucketQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }   
        BucketQuery.then(result =>{
            fetchedBucket = result;
           return Bucket.countDocuments({'userId': userId});
    }).then(count =>{
            res.status(201).json({
                response : fetchedBucket,
                bucketCount : count,
                subTotal :subTotal
            });
    }).catch(error=>{
        console.log(error);
        res.status(501).json({
            message:"Could not get resolve the request"
        })
    });
};
/******************* Add Orders ***********/
exports.orders = (req, res, next)=>{
    res.status(201).json({
        message: 'Data is being sent'
    })
};

/***********Delete data from bucket ********/
exports.bucketDelete = (req,res,next) =>{
    const id = req.query.id;
    console.log(id);
    Bucket.deleteOne({ _id : id}).then(
        result =>{
            if(result.n > 0){
                res.status(201).json({
                    message: " Deleted Successfully"
                })
            }
        }
    ).catch(error => {
        res.status(501).json({
            message: "Could not delete successfully",
            error : error
        })
    })
}
/******************Confirm Order From the bucket ****************/
exports.confirmOrder = (req, res, next) => {
    const orderedOn = new Date();
    const orderData= req.body.order;
    const data = [];
    orderData.forEach((orders)=>{
        data.push({
            
            vegId:orders.vegId,
            quantity: orders.quantity,
            price: orders.price,
            vegName:orders.vegName
        });
    });
    const order = new Orders({
        orderedOn: orderedOn,
        userId: req.body.userId,
        orderTotal: req.body.orderTotal,
        vegetables: data
    });
    order.save().then(result =>{
        res.status(201).json({
            message: "Oder Confirmed"
        });
    }).catch(error => {
        console.log(error);
        res.status(501).json({
            message:" An Error has occured"
        })
    });
   
};
/**************Get Orders ************/
exports.getOrders = (req, res, next) =>{
    const userId = req.query.id;
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    const OrdersQuery = Orders.find({'userId': userId});
    let fetchedOrders;
    // console.log(req.query);
    
    if(userId && pageSize && currentPage){
        OrdersQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    OrdersQuery.then(result => {
            fetchedOrders = result;
           return Orders.countDocuments({'userId': userId});
    }).then(count =>{
        res.status(201).json({
            data: fetchedOrders,
            count:count
        })
    }).catch(error =>{
        res.status(501).json({
            error:error,
            message:"could Not resolve request"
        })
    });
};