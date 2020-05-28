import express from 'express'
import LibroService from '../services/libro'
import validation from '../utils/middlewares/validationHandler'

import {
  libroIdSchema,
  createLibroSchema
} from '../utils/schemas/libro'

const libroService = new LibroService()
const app = express.Router()

// GET /api/libros
app.get('/', async (req, res, next) => {
  try {
    //throw Error('error generado')
    const libros = await libroService.getLibros()
    res.status(200).json(libros)
  } catch (err) {
    next(err)
  }
})

// GET /api/libros/:libroId
app.get('/:libroId', validation({libroId: libroIdSchema}, 'params'), async (req, res, next) => {
  const { libroId } = req.params
  try {
    const libro = await libroService.getLibro({ libroId })
    res.status(200).json(libro)
  } catch (err) {
    next(err)
  }
})

// POST /api/libros
app.post('/', validation(createLibroSchema), async (req, res, next) => {
  const _libro = req.body

  try {
    const savedLibro = await libroService.createLibro({ _libro })
    res.status(201).json({
      message: 'Libro guardado',
      data: savedLibro
    })
  } catch (err) {
    next(err)
  }

})

// PUT /api/libros/baja/:libroId
app.put('/baja/:libroId', validation({ libroId: libroIdSchema }, 'params'), async (req, res, next) => {
  const { libroId } = req.params
  const { motivo_baja } = req.body

  try {
    const libro = await libroService.bajaLibro({ libroId, motivo_baja })
    res.status(201).json({
      message: 'Libro dado de baja',
      data: libro
    })
  } catch (err) {
    next(err)
  }
})

export default app
