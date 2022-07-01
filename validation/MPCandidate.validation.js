const Joi = require("@hapi/joi");

const MPCandidateValidation = (data) => {
  const schema = Joi.object({
    Name: Joi.string().min(0).max(255).required(),
    Email: Joi.string().email().required(),
    Phone: Joi.string().required(),
    DateOfBirth: Joi.date().required(),
  });
  return schema.validate(data);
};

module.exports.MPCandidateValidation = MPCandidateValidation;