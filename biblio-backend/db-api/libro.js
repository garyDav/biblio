import Debug from 'debug'
import { Libro } from '../models'

const debug = new Debug('biblio-backend:db-api:libro')

export default {
  findAll: () => {
    debug('Finding all libros')
    return Libro
      .find()
      .populate('baja')
      .populate({
        path: 'prestamos',
        populate: { path: 'cliente' }
      })
  },

  findById: (_id) => {
    debug(`Find prestamo with id ${_id}`)
    return Prestamo
      .findOne({ _id })
      .populate('baja')
      .populate({
        path: 'prestamos',
        populate: { path: 'cliente' }
      })
  },

  create: (l) => {
    debug(`Creating new libro ${l}`)
    const libro = new Libro(l)
    return libro.save()
  }
}
