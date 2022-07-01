const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MPCandidateSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  Email: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  Phone: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  DateOfBirth: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("MPCandidate", MPCandidateSchema);
