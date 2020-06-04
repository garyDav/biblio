import Joi from 'joi'

const prestamoIdSchema = Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
const codigoSchema = Joi.string().max(20)

const createPrestamoSchema = {
  codigo: Joi.string().max(20),
  prestamo: {
    nombre: Joi
      .string()
      .max(70)
      .required(),
    celular: Joi
      .number()
      .min(10000000)
      .max(99999999)
      .required(),
    fecha_prestamo: Joi
      .string()
      .max(10)
      .required(),
    fecha_limite_devolucion: Joi
      .string()
      .max(10)
      .required()
  }
}

module.exports = {
  prestamoIdSchema,
  codigoSchema,
  createPrestamoSchema
}
