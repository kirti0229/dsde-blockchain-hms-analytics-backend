const Joi = require('joi');

const registerValidator = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).pattern(/@gmail\.com$/).required(),
  password: Joi.string().min(8).max(20)
    .pattern(/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .required(),
  role: Joi.string().valid('admin', 'user').required()
});

const loginValidator = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).pattern(/@gmail\.com$/).required(),
  password: Joi.string().required()
});

module.exports = { registerValidator, loginValidator };
