import Debug from 'debug'
import { Baja } from '../models'

const debug = new Debug('biblio-backend:db-api:baja')

export default {
  findAll: () => {
    debug('Finding all baja')
    return Baja.find()
  },

  create: async (l, b) => {
    debug(`Creating new baja ${b}`)
    const baja = new Baja(p)
    const saveBaja = await baja.save()
    l.baja.push(saveBaja)
    await l.save()
    return saveBaja
  }
}
