import express from 'express'
import { libro } from '../db-api'
import validation from '../utils/middlewares/validationHandler'

import {
  libroIdSchema,
  createLibroSchema
} from '../utils/schemas/libro'

const app = express.Router()

// GET /api/libros
app.get('/', async (req, res, next) => {
  try {
    const libros = await libro.findAll()
    res.status(200).json(libros)
  } catch (err) {
    next(err)
  }
})

// GET /api/libros/:id
app.get('/:id', validation({id: libroIdSchema}, 'params'), async (req, res, next) => {
  const { id } = req.params
  try {
    const libro = await libro.findById(id)
    res.status(200).json(libro)
  } catch (err) {
    next(err)
  }
})

// POST /api/libros
app.post('/', validation(createLibroSchema), async (req, res, next) => {
  const { libro } = req.body

  try {
    const savedLibro = await libro.create({ libro })
    res.status(201).json({
      message: 'Libro guardado',
      data: savedLibro
    })
  } catch (err) {
    next(err)
  }

})

export default app
