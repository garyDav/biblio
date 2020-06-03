import express from 'express'
import PrestamoService from '../services/prestamo'
import validation from '../utils/middlewares/validationHandler'

import {
  prestamoIdSchema,
  codigoSchema,
  createPrestamoSchema
} from '../utils/schemas/prestamo'

const prestamoService = new PrestamoService()
const app = express.Router()

// GET /api/prestamos/libro/:codigo
app.get('/libro/:codigo', validation({codigo: codigoSchema}, 'params'), async (req, res, next) => {
  const { codigo } = req.params
  try {
    const prestamos = await prestamoService.getPrestamosByCodigoLibro(codigo)
    res.status(200).json(prestamos)
  } catch (err) {
    next(err)
  }
})

// POST /api/prestamos
app.post('/', validation(createPrestamoSchema), async (req, res, next) => {
  const { codigo, prestamo } = req.body

  try {
    const savedPrestamo = await prestamoService.createPrestamo({ codigo, _prestamo: prestamo })
    res.status(201).json({
      message: 'Prestamo guardado',
      data: savedPrestamo
    })
  } catch (err) {
    next(err)
  }

})

// PUT /api/prestamos/devolucion/:prestamoId
app.put('/devolucion/:prestamoId', validation({prestamoId: prestamoIdSchema}, 'params'), async (req, res, next) => {
  const { prestamoId } = req.params

  try {
    const prestamo = await prestamoService.devolucionPrestamo({ id_prestamo: prestamoId })
    res.status(201).json({
      message: 'Prestamo devuelto',
      data: prestamo
    })
  } catch (err) {
    next(err)
  }
})

export default app
