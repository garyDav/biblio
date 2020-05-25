import Joi from 'joi'

const clienteIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}&/)

const createClienteSchema = {
  name: Joi
    .string()
    .max(50)
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
