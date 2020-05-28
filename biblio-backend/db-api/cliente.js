import Debug from 'debug'
import { Cliente } from '../models'

const debug = new Debug('biblio-backend:db-api:cliente')

export default {
  findAll: () => {
    debug('Finding all clientes')
    return Cliente.find()
  },

  create: async (c) => {
    debug(`Creating new cliente ${c}`)
    const cliente = new Cliente(c)
    return cliente.save()
  }
}
