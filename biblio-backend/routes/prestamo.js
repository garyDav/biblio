import express from 'express'
import { prestamo } from '../db-api'
import validation from '../utils/middlewares/validationHandler'

import {
  prestamoIdSchema,
  createPrestamoSchema
} from '../utils/schemas/prestamo'

const app = express.Router()

// GET /api/prestamos/:id
app.get('/:id', validation({id: prestamoIdSchema}, 'params'), async (req, res, next) => {
  const { id } = req.params
  try {
    const prestamos = await prestamo.findLibroById(id)
    res.status(200).json(prestamos)
  } catch (err) {
    next(err)
  }
})

// POST /api/prestamos
app.post('/', validation(createPrestamoSchema), async (req, res, next) => {
  const { libro, prestamo } = req.body

  try {
    const savedPrestamo = await prestamo.create({ libro },{ prestamo })
    res.status(201).json({
      message: 'Prestamo guardado',
      data: savedPrestamo
    })
  } catch (err) {
    next(err)
  }

})

export default app
