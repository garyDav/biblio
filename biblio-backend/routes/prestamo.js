import express from 'express'
import PrestamoService from '../services/prestamo'
import validation from '../utils/middlewares/validationHandler'

import {
  prestamoIdSchema,
  createPrestamoSchema
} from '../utils/schemas/prestamo'

const prestamoService = new PrestamoService()
const app = express.Router()

// GET /api/prestamos/libro/:libroId
app.get('/libro/:libroId', validation({libroId: prestamoIdSchema}, 'params'), async (req, res, next) => {
  const { libroId } = req.params
  try {
    const prestamos = await prestamoService.getPrestamosByIdLibro(libroId)
    res.status(200).json(prestamos)
  } catch (err) {
    next(err)
  }
})

// POST /api/prestamos
app.post('/', validation(createPrestamoSchema), async (req, res, next) => {
  const { id_libro, cliente, prestamo } = req.body

  try {
    const savedPrestamo = await prestamoService.createPrestamo({ id_libro, _cliente: cliente, _prestamo: prestamo })
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
