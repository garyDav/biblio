import { prestamo } from '../db-api'
import ClienteService from './cliente'

const clienteService = new ClienteService()

class PrestamoService {
  async getPrestamosByIdLibro(_id) {
    const data = await prestamo.findLibroById(_id)
    return data || []
  }

  async createPrestamo({ id_libro, _cliente, _prestamo }) {
    const cliente = await clienteService.createCliente({ _cliente })
    const id_cliente = cliente._id
    const savedPrestamo = await prestamo.create({ id_libro, id_cliente, _prestamo})
    return savedPrestamo
  }

  async devolucionPrestamo({ id_prestamo }) {
    const _prestamo = await prestamo.devolucion({ id_prestamo })
    return _prestamo
  }
}

module.exports = PrestamoService
