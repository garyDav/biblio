import express from 'express'
import ClienteService from '../services/cliente'

const clienteService = new ClienteService()
const app = express.Router()

// GET /api/clientes
app.get('/', async (req, res, next) => {
  try {
    const clientes = await clienteService.getClientes()
    res.status(200).json(clientes)
  } catch (err) {
    next(err)
  }
})

export default app
