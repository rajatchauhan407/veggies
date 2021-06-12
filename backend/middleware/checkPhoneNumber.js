const User = require("../models/user");
module.exports = (req, res, next) => {
  try {
    const contactNo = req.body.contact;
    const user = new User(contactNo);
    user.findUser(contactNo).then((result) => {
      if (result == null) {
        console.log(result);
        next();
      } else {
        console.log(result);
        res.status(500).json({
          message: "user already exists",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "user already exists",
    });
  }
};
