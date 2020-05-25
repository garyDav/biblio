import Joi from 'joi'

const libroIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}&/)

const createLibroSchema = {
  nombre: Joi
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
  cantidad: Joi
    .number()
    .min(0)
    .max(100),
  estado: Joi
    .string()
    .max(50)
    .required(),
  fecha_lanzamiento: Joi
    .string()
    .max(8)
    .required(),
  baja: [],
  prestamos: []
}

module.exports = {
  libroIdSchema,
  createLibroSchema
}
