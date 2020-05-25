import Debug from 'debug'
import { Cliente } from '../models'

const debug = new Debug('biblio-backend:db-api:cliente')

export default {
  findAll: () => {
    debug('Finding all clients')
    return Cliente.find()
  },

  findById: (_id) => {
    debug(`Find client with id ${_id}`)
    return Client.findOne({ _id })
  },

  create: async (p, c) => {
    debug(`Creating new client ${c}`)
    const cliente = new Cliente(c)
    const saveCliente = await cliente.save()
    p.cliente = saveCliente
    await p.save()
    return saveCliente
  }
}
