const Joi = require("@hapi/joi");

const candidate = Joi.object().keys({
    Name: Joi.string().min(0).max(255).required(),
    Email: Joi.string().email().required(),
    Phone: Joi.string().required(),
    CV: Joi.binary(),
  });
const JobValidation = (data) => {
  const schema = Joi.object({
    CompanyName: Joi.string().required(),
    JobTitle: Joi.string().required(),
    Address: Joi.string().required(),
    Area: Joi.string().required(),
    Salary: Joi.object({
        Min: Joi.number().required(),
        Max: Joi.number().required(),
    }).required(),
    EndDate: Joi.date().required(),
    Department: Joi.string().required(),
    JobDescription: Joi.string().required(),
    Requirement: Joi.string().required(),
    Benefit: Joi.string().required(),
    Timetable: Joi.string().required(),
    Candidate: Joi.array().items(candidate),
  });
  return schema.validate(data);
};

module.exports.JobValidation = JobValidation;