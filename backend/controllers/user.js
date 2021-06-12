const User = require("../models/user");
const jwt = require("jsonwebtoken");
// creating the user and otp verification
var val;
var response;

const generateOtp = (phoneNo) => {
  const promise = new Promise((resolve, reject) => {
    var accountSid = "ACf80221260dd9ab17e8d3b8714fc49e2e";
    var authToken = "0510f9d5032ec7fdfbb07cba10023b6e";
    var twilio = require("twilio");
    var client = new twilio(accountSid, authToken);
    val = Math.floor(1000 + Math.random() * 9000);
    // console.log(message.dateCreated);

    client.messages
      .create({
        body: `Your Veggies verification Code is ${val}`,
        to: "+91" + phoneNo,
        from: "+19123488069",
      })
      .then((message) => {
        resolve(val);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

exports.createUser = (req, res, next) => {
  // console.log(req.body.contact);\
  const contactNo = req.body.contact;
  const user = new User(contactNo);
  generateOtp(contactNo)
    .then((data) => {
      const otpSent = data;
      user.save().then((result) => {
        res.status(200).json({
          otp: otpSent,
          message: "Message sent successfully",
        });
      });
      // console.log("data sent successfully");
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal Error ! Could not resolve the request",
        message1: "Incorrect phone Number! Could not send message",
        error: error,
      });
    });
};
exports.loginUser = (req, res, next) => {
  const contactNo = req.body.contact;
  const user = new User(contactNo);

  user
    .findUser(contactNo)
    .then((result) => {
        if(result != null){
            generateOtp(contactNo).then((data) => {
                const otpSent = data;
                const token = jwt.sign({
                  contact: contactNo
                },
                process.env.JWT_KEY,
                {
                  expiresIn:'1h'
                });
                res.status(200).json({
                  otp: otpSent,
                  token:token,
                  expiresIn: 3600
                });
              })
        }else {
            res.json({
                message: 'user does not exist'
            })
        } 
    })
    .catch((error) => {
      res.status(501).json({
        message: "user does not exist",
        error: error,
      });
    });
};
// console.log(otp);
// res.status(200).json({
//     otp:val,
//     message:"message sent successfully"
// });

// sending text sms
// const user = new User(contactNo);
// user.save().then(
//     result=>{
//         res.status(201).json({
//             message:"Phone No added SuccessFully",
//             sid:"Message send to user",
//             otp:val,
//             responseData:response
//         })
//     }
// ).catch(error=>{
//     res.status(501).json({
//         message:"Could Not Add Phone Number",
//         error:error
//     })
// })
// stat = {
//     agentsCount: '',
//     salesPartener: '',
//     hostCount: '',
//     tenantCount: '',
//     totalRevenue: ''
// }