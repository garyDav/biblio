import Debug from 'debug'
import { Libro } from '../models'

const debug = new Debug('biblio-backend:db-api:libro')

export default {
  findAll: () => {
    //throw Error('error generado')
    debug('Finding all libros')
    return Libro.find()
  },

  findAllDetails: () => {
    debug('Finding all libros and prestamos')
    return Libro
      .find()
      .populate({
        path: 'prestamos',
        populate: { path: 'cliente' }
      })
  },

  findById: (_id) => {
    debug(`Find prestamo with id ${_id}`)
    return Libro
      .findOne({ _id })
      .populate({
        path: 'prestamos',
        populate: { path: 'cliente' }
      })
  },

  create: (l) => {
    debug(`Creating new libro ${l}`)
    const libro = new Libro(l)
    return libro.save()
  },

  bajaLibro: async ({ libroId, motivo_baja }) => {
    debug(`Update baja libro ${ libroId } ${ motivo_baja }`)
    const libro = await Libro.findOne({ _id: libroId})
    if (Object.keys(libro).length !== 0) {
      if (libro.estado !== 'baja') {
        libro.estado = 'baja'
        libro.motivo_baja = motivo_baja
        return libro.save()
      } else throw Error('error libro: Libro ya fue dado de baja')
    } else throw Error('error libro._id: Libro no encontrado')
  }
}
