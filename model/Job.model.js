const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSchema = mongoose.Schema(
  {
    CompanyName: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    JobTitle: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Area: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Address: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Salary: {
      Min: {
        type: Number,
        require: true,
      },
      Max: {
        type: Number,
        require: true,
      },
    },
    EndDate: {
      type: Date,
      min: Date.now(),
      require: true,
    },
    Department: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    JobDescription: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Requirement: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Benefit: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Timetable: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Candidate: [{
      type: Schema.ObjectId,
      ref: "Candidate",
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
