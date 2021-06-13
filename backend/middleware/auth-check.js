const jwt= require("jsonwebtoken");
module.exports= (req,res,next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY);
        // console.log(decodedToken);
        // req.userData= {
        //     phoneNo: decodedToken.contact
        // };
        // console.log(req.userData.contact);
        next();
    }catch(error){
        res.status(401).json({
            message:'Auth Failed'
        })
    }
};