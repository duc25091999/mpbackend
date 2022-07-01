const User = require("../model/User.model");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  create: async (req, res) => {
    const userExist = await User.findOne({ name: req.body.name });
    if (userExist) return res.status(400).send("User already exist");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      password: hashPassword,
    });
    try {
      await user.save();
      res.status(200).send({ success:true,message:"Create successfully"});
    } catch (err) {
      res.status(200).send({ success:false,message:"Create fail"});
      throw err;
    }
  },
  
  changePassword: async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      try {
        if (req.body.password == req.body.re_password) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          await User.findOneAndUpdate(
            { _id: req.params.id },
            {
              password: hashPassword,
            }
          );
          res.send({success:true,message:"Update successfully"});
        }
        else {
            res.send({success:true,message:"Confirmed password is different"});
        }
      } catch (err) {
        res.status(200).send({success:false,message:"Something went wrong"});
      }
    } else res.status(200).send({success:false,message:"Id is not valid"});
  },
  login: async (req, res) => {
    const user = await User.findOne({ name: req.body.name });
    if (!user)
      return res.send({
        success: false,
        message: "Name is wrong",
      });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.send({ success: false, message: "Invalid password" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({success:true, userId: user._id, token: token });
  },
};
