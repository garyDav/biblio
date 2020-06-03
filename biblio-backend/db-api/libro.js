import Debug from 'debug'
import { Libro } from '../models'

const debug = new Debug('biblio-backend:db-api:libro')

const getCodigo = _ => {
  const date = new Date()
  const _date = new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
  const formatted = _date.toISOString().slice(0,10).split('-')
  return `${formatted[0]}-${date.getTime()}`
}

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
        path: 'prestamos'
      })
  },

  findByCodigo: (codigo) => {
    debug(`Find prestamo with codigo ${codigo}`)
    return Libro
      .findOne({ codigo })
      .populate({
        path: 'prestamos'
      })
  },

  create: (l) => {
    debug(`Creating new libro ${l}`)
    l.codigo = getCodigo()
    const libro = new Libro(l)
    return libro.save()
  },

  bajaLibro: async ({ codigo, motivo_baja }) => {
    debug(`Update baja libro ${ codigo } ${ motivo_baja }`)
    const libro = await Libro.findOne({ codigo })
    if (Object.keys(libro).length !== 0) {
      if (libro.estado !== 'baja') {
        libro.estado = 'baja'
        libro.motivo_baja = motivo_baja
        return libro.save()
      } else throw Error('error libro: Libro ya fue dado de baja')
    } else throw Error('error libro._id: Libro no encontrado')
  }
}
