import { libro } from '../db-api'

class LibroService {
  async getLibros() {
    const data = await libro.findAll()
    return data || []
  }

  async getLibrosAll() {
    const data = await libro.findAllDetails()
    return data || []
  }

  async getLibro({ libroId }) {
    const data = await libro.findById(libroId)
    return data || {}
  }

  async createLibro({ _libro }) {
    const create = await libro.create(_libro)
    return create
  }

  async bajaLibro({ libroId, motivo_baja }) {
    const baja = await libro.bajaLibro({ libroId, motivo_baja })
    return baja
  }
}

module.exports = LibroService
