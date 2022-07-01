const Joi = require("@hapi/joi");

const CandidateValidation = (data) => {
  const schema = Joi.object({
    Name: Joi.string().min(0).max(255).required(),
    Email: Joi.string().email().required(),
    Phone: Joi.string().required(),
    CV: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.CandidateValidation = CandidateValidation;
