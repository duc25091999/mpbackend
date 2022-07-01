const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
});

module.exports = mongoose.model('User',userSchema);