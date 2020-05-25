import express from 'express'
import { baja } from '../db-api'
import validation from '../utils/middlewares/validationHandler'

import {
  createBajaSchema
} from '../utils/schemas/baja'

const app = express.Router()

// GET /api/bajas
app.get('/', async (req, res, next) => {

  try {
    const bajas = await baja.findAll()
    res.status(200).json(bajas)
  } catch (err) {
    next(err)
  }

})

// POST /api/bajas
app.post('/', validation(createBajaSchema), async (req, res, next) => {
  const { libro, baja } = req.body

  try {
    const savedBaja = await baja.create({ libro },{ baja })
    res.status(201).json({
      message: 'baja guardado',
      data: savedBaja
    })
  } catch (err) {
    next(err)
  }

})

export default app
