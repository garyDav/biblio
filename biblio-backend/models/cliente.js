import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const ClienteSchema = new Schema({
  celular: { type: Number, required: true, unique: true, index: true },
  nombre: { type: String, required: true }
})

ClienteSchema.plugin(uniqueValidator)
export default mongoose.model('Cliente', ClienteSchema)
