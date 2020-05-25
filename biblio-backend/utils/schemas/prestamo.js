import Joi from 'joi'

const prestamoIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}&/)

const createPrestamoSchema = {
  cliente: Joi.string().regex(/^[0-9a-fA-F]{24}&/),
  fecha_prestamo: Joi
    .string()
    .max(50)
    .required(),
  fecha_devolucion: Joi
    .string()
    .max(50)
    .required(),
  fecha_devuelto: Joi
    .string()
    .max(50)
    .required(),
  libro: Joi.string().regex(/^[0-9a-fA-F]{24}&/)
}

module.exports = {
  prestamoIdSchema,
  createPrestamoSchema
}
