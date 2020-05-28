import { cliente } from '../db-api'

class ClienteService {
  async getClientes() {
    const data = await cliente.findAll()
    return data || []
  }

  async createCliente({ _cliente }) {
    const create = await cliente.create(_cliente)
    return create
  }
}

module.exports = ClienteService
