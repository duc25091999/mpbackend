const Job = require("../model/Job.model");
const Candidate = require("../model/Candidate.model");
const { CandidateValidation } = require("../validation/Candidate.validation");
const { JobValidation } = require("../validation/Job.validation");
const ObjectId = require("mongoose").Types.ObjectId;
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

module.exports = {
  get: async (req, res) => {
    const {
      page = 1,
      size = 6,
      Area = "",
      JobTitle = "",
      All = true,
    } = req.query;
    const filter = {
      Area,
      JobTitle,
    };
    if (Area == "") {
      delete filter.Area;
    }
    if (JobTitle == "") {
      delete filter.JobTitle;
    }
    if (All == "false") {
      filter.EndDate = {$gte: Date.now()};
    }
    try {
      const total = await Job.find(filter);
      const result = await Job.find(filter)
        .sort({
          EndDate: -1, //Sort by Date Added DESC
        })
        .populate("Candidate")
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
        const job = await Job.findById(req.params.id);
        if (job) {
          res.status(200).send({ success: true, data: job });
        } else {
          res.status(200).send({
            success: false,
            message: "Can't find job's infomation",
          });
        }
      } catch (err) {
        res.status(200).send({
          success: false,
          message: "Can't find job's infomation",
        });
      }
    } else res.status(200).send({ success: false, message: "Id is not valid" });
  },
  create: async (req, res) => {
    const { error } = JobValidation(req.body);
    if (error)
      return res
        .status(200)
        .send({ success: false, message: error.details[0].message });

    const job = new Job({
      ...req.body,
      Candidate: [],
    });
    try {
      await job.save();
      res.send({
        success: true,
        message: "Create job successfully",
      });
    } catch (err) {
      res.status(200).send({ success: false, message: "Create job failed" });
    }
  },
  delete: async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      try {
        await Job.findByIdAndRemove(req.params.id);
        res.send("Delete successfully");
      } catch (err) {
        res.status(200).send({ success: false, message: "Delete job failed" });
      }
    } else res.status(200).send({ success: false, message: "Id is not valid" });
  },
  update: async (req, res) => {
    const { error } = JobValidation(req.body);
    if (error)
      return res
        .status(200)
        .send({ success: false, message: error.details[0].message });
    if (ObjectId.isValid(req.params.id)) {
      try {
        await Job.findOneAndUpdate(
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
  registerJob: async (req, res) => {
    const { error } = CandidateValidation(req.body);
    if (error)
      return res
        .status(200)
        .send({ success: false, message: error.details[0].message });

    const candidate = new Candidate({
      Job: req.params.id,
      ...req.body,
    });
    try {
      await candidate.save();
      if (ObjectId.isValid(req.params.id)) {
        try {
          const job = await Job.findById(req.params.id);
          if (job) {
            job.Candidate.push(candidate._id);
            await job.save();
            res
              .status(200)
              .send({ success: true, message: "Update successfully" });
          } else {
            res.status(200).send({ success: false, message: "Can't find job" });
          }
        } catch (err) {
          res.status(200).send({ success: false, message: err });
        }
      } else
        res.status(200).send({ success: false, message: "Id is not valid" });
    } catch (err) {
      res.status(200).send({ success: false, message: "Đăng kí thành công" });
    }
  },
};
