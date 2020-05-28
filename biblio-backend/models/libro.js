import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { ObjectId } = Schema.Types

const LibroSchema = new Schema({
  codigo: { type: String, required: true, unique: true, index: true},
  isbn: { type: String, required: true },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editorial: { type: String, required: true },
  año_pub: { type: Number, required: true },
  estado: { type: String, required: false, default: 'disponible' },
  motivo_baja: { type: String, required: false, default: '' },
  prestamos: [{ type: ObjectId, ref: 'Prestamo', default: [] }]
})

LibroSchema.plugin(uniqueValidator)
export default mongoose.model('Libro', LibroSchema)
