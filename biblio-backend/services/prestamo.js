import { prestamo } from '../db-api'

class PrestamoService {
  async getPrestamosByCodigoLibro(codigo) {
    const data = await prestamo.findLibroByCodigo(codigo)
    return data || []
  }

  async createPrestamo({ codigo, _prestamo }) {
    const savedPrestamo = await prestamo.create({ codigo, _prestamo})
    return savedPrestamo
  }

  async devolucionPrestamo({ id_prestamo }) {
    const _prestamo = await prestamo.devolucion({ id_prestamo })
    return _prestamo
  }
}

module.exports = PrestamoService
