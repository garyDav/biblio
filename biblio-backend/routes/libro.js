import express from 'express'
import LibroService from '../services/libro'
import validation from '../utils/middlewares/validationHandler'

import {
  codigoSchema,
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

// GET /api/libros/reporte
app.get('/reporte', async (req, res, next) => {
  try {
    const libros = await libroService.getLibrosReporte()
    res.status(200).json(libros)
  } catch (err) {
    next(err)
  }
})

// GET /api/libros/:codigo
app.get('/:codigo', validation({codigo: codigoSchema}, 'params'), async (req, res, next) => {
  const { codigo } = req.params
  try {
    const libro = await libroService.getLibro({ codigo })
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

// PUT /api/libros/baja/:codigo
app.put('/baja/:codigo', validation({ codigo: codigoSchema }, 'params'), async (req, res, next) => {
  const { codigo } = req.params
  const { motivo_baja } = req.body

  try {
    const libro = await libroService.bajaLibro({ codigo, motivo_baja })
    res.status(201).json({
      message: 'Libro dado de baja',
      data: libro
    })
  } catch (err) {
    next(err)
  }
})

export default app
