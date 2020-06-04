import Joi from 'joi'

const codigoSchema = Joi.string().max(20)

const createLibroSchema = {
  isbn: Joi
    .string()
    .max(20)
    .required(),
  titulo: Joi
    .string()
    .max(50)
    .required(),
  autor: Joi
    .string()
    .max(50)
    .required(),
  editorial: Joi
    .string()
    .max(50)
    .required(),
  año_pub: Joi
    .number()
    .required()
}

module.exports = {
  codigoSchema,
  createLibroSchema
}
