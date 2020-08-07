const Joi = require('@hapi/joi')

const valschema = Joi.object({

  username: Joi.string().required().lowercase().email(),
  password: Joi.string().required().min(2)
})

module.exports = { valschema } 