import Joi from 'joi'

const createBajaSchema = {
  detalle: Joi
    .string()
    .max(100)
    .required(),
  libro: Joi
    .string()
    .regex(/^[0-9a-fA-F]{24}&/)
    .required()
}

module.exports = {
  createBajaSchema
}
