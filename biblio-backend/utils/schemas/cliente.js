import Joi from 'joi'

const clienteIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}&/)

const createClienteSchema = {
  nombre: Joi
    .string()
    .max(70)
    .required(),
  celular: Joi
    .number()
    .min(10000000)
    .max(99999999)
    .required()
}

module.exports = {
  clienteIdSchema,
  createClienteSchema
}
