import Debug from 'debug'
import { Prestamo } from '../models'

const debug = new Debug('biblio-backend:db-api:prestamo')

export default {
  findLibroById: (_id) => {
    debug('Finding all prestamo')
    return Prestamo.find({ libro: _id })
  },

  create: async (l, p) => {
    debug(`Creating new prestamo ${p}`)
    const prestamo = new Prestamo(p)
    const savePrestamo = await prestamo.save()
    l.prestamos.push(savePrestamo)
    await l.save()
    return savePrestamo
  }
}
