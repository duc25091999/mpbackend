const jwt = require("jsonwebtoken");
const User = require("./model/User.model");

module.exports.isValidToken = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports.isUserExist = async function (req, res, next) {
  try {
    const result = await User.findById(req.user._id);
    if (result) next();
    else res.status(401).send("User does not exist!");
  } catch (err) {
    res.status(400).send(err);
  }
};
// module.exports.isPdf = async function (req, res, next) {
//   try {
//     console.log(req)
//     // const result = await User.findById(req.user._id);
//     // if (result) next();
//     // else res.status(401).send("User does not exist!");
//   } catch (err) {
//     // res.status(400).send(err);
//   }
// };

module.exports.isAdmin = async function (req, res, next) {
    try {
      const result = await User.findById(req.user._id);
      if(result) next()
      else res.status(401).send("You don't have permission to access");
    } catch (err) {
      res.status(400).send(err);
    }
};

  
