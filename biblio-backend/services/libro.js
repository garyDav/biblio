import { libro } from '../db-api'

class LibroService {
  async getLibros() {
    const data = await libro.findAll()
    return data || []
  }

  async getLibrosReporte() {
    const data = await libro.findAllReporte()
    return data || []
  }

  async getLibrosAll() {
    const data = await libro.findAllDetails()
    return data || []
  }

  async getLibro({ codigo }) {
    const data = await libro.findByCodigo(codigo)
    return data || {}
  }

  async createLibro({ _libro }) {
    const create = await libro.create(_libro)
    return create
  }

  async bajaLibro({ codigo, motivo_baja }) {
    const baja = await libro.bajaLibro({ codigo, motivo_baja })
    return baja
  }
}

module.exports = LibroService
