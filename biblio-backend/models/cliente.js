import mongoose, { Schema } from 'mongoose'

const ClienteSchema = new Schema({
  celular: { type: Number, required: true },
  nombre: { type: String, required: true }
})

export default mongoose.model('Cliente', ClienteSchema)
