const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = mongoose.Schema({
  Job: {
    type: Schema.ObjectId,
    ref: "Job",
  },
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
  CV: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
