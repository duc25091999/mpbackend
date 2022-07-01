const Candidate = require("../model/Candidate.model");
const Job = require("../model/Job.model");

const { CandidateValidation } = require("../validation/Candidate.validation");
const ObjectId = require("mongoose").Types.ObjectId;
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
module.exports = {
  get: async (req, res) => {
    const { page = 1, size = 6, CompanyName = "" } = req.query;
    const filter = {
      CompanyName,
    };
    if (CompanyName == "") {
      delete filter.CompanyName;
    }
    try {
      const job = await Job.find(filter);
      const jobId = job.map((item)=>item._id)
      const total = await Candidate.find(filter);
      const result = await Candidate.find({ "Job": { "$in": jobId } })
        .populate("Job")
        .limit(size)
        .skip(size * (page - 1));
      res.json({
        data: result,
        total: total.length,
      });
    } catch (err) {
      res.status(200).send({ success: false, message: "Error" });
    }
  },
  getById: async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      try {
        const candidate = await Candidate.findById(req.params.id);
        if (candidate) {
          res.status(200).send({ success: true, data: candidate });
        } else {
          res.status(200).send({
            success: false,
            message: "Can't find candidate's infomation",
          });
        }
      } catch (err) {
        res.status(200).send({
          success: false,
          message: "Can't find candidate's infomation",
        });
      }
    } else res.status(200).send({ success: false, message: "Id is not valid" });
  },
  create: async (req, res) => {
    const { error } = CandidateValidation(req.body);
    if (error)
      return res
        .status(200)
        .send({ success: false, message: error.details[0].message });

    const CandidateExist = await Candidate.findOne({ Email: req.body.Email });
    if (CandidateExist)
      return res
        .status(200)
        .send({ success: false, message: "Candidate already exist" });

    const candidate = new Candidate({
      ...req.body,
      Candidate: [],
    });
    try {
      await candidate.save();
      res.send({
        success: true,
        message: "Create candidate successfully",
      });
    } catch (err) {
      res
        .status(200)
        .send({ success: false, message: "Create candidate failed" });
    }
  },
  delete: async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      try {
        await Candidate.findByIdAndRemove(req.params.id);
        res.send("Delete successfully");
      } catch (err) {
        res
          .status(200)
          .send({ success: false, message: "Delete candidate failed" });
      }
    } else res.status(200).send({ success: false, message: "Id is not valid" });
  },
  update: async (req, res) => {
    const { error } = CandidateValidation(req.body);
    if (error)
      return res
        .status(200)
        .send({ success: false, message: error.details[0].message });
    if (ObjectId.isValid(req.params.id)) {
      try {
        await Candidate.findOneAndUpdate(
          { _id: req.params.id },
          {
            ...req.body,
          }
        );
        res.status(200).send({ success: true, message: "Update successfully" });
      } catch (err) {
        res.status(200).send({ success: false, message: err });
      }
    } else res.status(200).send({ success: false, message: "Id is not valid" });
  },
};
