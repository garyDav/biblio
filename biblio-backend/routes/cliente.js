import express from 'express'
import { cliente } from '../db-api'
import validation from '../utils/middlewares/validationHandler'

import {
  clienteIdSchema,
  createClienteSchema
} from '../utils/schemas/cliente'

const app = express.Router()

// GET /api/clientes
app.get('/', async (req, res, next) => {
  try {
    const clientes = await cliente.findAll()
    res.status(200).json(clientes)
  } catch (err) {
    next(err)
  }
})

// GET /api/clientes/:id
app.get('/:id', validation({id: clienteIdSchema}, 'params'), async (req, res, next) => {
  const { id } = req.params
  try {
    const cliente = await cliente.findById(id)
    res.status(200).json(cliente)
  } catch (err) {
    next(err)
  }
})

// POST /api/clientes
app.post('/', validation(createClienteSchema), async (req, res, next) => {
  const { prestamo, cliente } = req.body

  try {
    const savedCliente = await cliente.create({ prestamo },{ cliente })
    res.status(201).json({
      message: 'Cliente guardado',
      data: savedCliente
    })
  } catch (err) {
    next(err)
  }

})

export default app
