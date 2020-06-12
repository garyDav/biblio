import Debug from 'debug'
import { Prestamo, Libro } from '../models'

const debug = new Debug('biblio-backend:db-api:prestamo')
const date_dmy = _ => {
  const date = new Date()
  const _date = new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
  const formatted = _date.toISOString().slice(0,10).split('-')
  return `${formatted[2]}/${formatted[1]}/${formatted[0]}`
}

export default {
  findLibroByCodigo: async (codigo) => {
    debug('Finding all prestamos by one libro')
    let libro = await Libro.findOne({ codigo })
    return Prestamo.find({ libro: libro._id })
  },

  create: async ({ codigo, _prestamo }) => {
    debug(`Creating new prestamo ${_prestamo}`)
    const libro = await Libro.findOne({ codigo })
    if(Object.keys(libro).length !== 0) {
      if(libro.estado == 'disponible') {
        _prestamo.libro = libro._id
        const prestamo = new Prestamo(_prestamo)
        const savePrestamo = await prestamo.save()
        libro.prestamos.push(savePrestamo._id)
        libro.estado = 'prestado'
        await libro.save()
        return savePrestamo
      } else throw Error('error libro: Libro no disponible')
    } else throw Error('error libro._id: Libro no encontrado')
  },

  devolucion: async ({ id_prestamo }) => {
    debug(`devolver el prestamo ${id_prestamo}`)
    const prestamo = await Prestamo.findOne({ _id: id_prestamo})
    if (Object.keys(prestamo).length !== 0) {
      const libro = await Libro.findOne({ _id: prestamo.libro })
      if (Object.keys(libro).length !== 0) {
        if(libro.estado == 'prestado' || libro.estado == 'deben') {
          prestamo.fecha_devolucion = date_dmy()
          libro.estado = 'disponible'
          await libro.save()
          return await prestamo.save()
        } else throw Error('error libro._id: Libro no disponible')
      } else throw Error('error libro._id: Libro no encontrado')
    } else throw Error('error prestamo._id: Préstamo no encontrado')
  }
}
