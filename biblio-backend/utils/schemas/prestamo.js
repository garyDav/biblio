import Joi from 'joi'
import { createClienteSchema } from './cliente'

const prestamoIdSchema = Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)

const createPrestamoSchema = {
  id_libro: prestamoIdSchema,
  cliente: createClienteSchema,
  prestamo: {
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
  createPrestamoSchema
}
