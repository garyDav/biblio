import Joi from 'joi'

const libroIdSchema = Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)

const createLibroSchema = {
  codigo: Joi
    .string()
    .max(10)
    .required(),
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
  libroIdSchema,
  createLibroSchema
}
