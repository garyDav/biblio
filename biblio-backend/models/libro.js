import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const LibroSchema = new Schema({
  nombre: { type: String, required: true },
  autor: { type: String, required: true },
  editorial: { type: String, required: true },
  cantidad: { type: Number, required: true },
  estado: { type: String, required: true },
  fecha_lanzamiento: { type: String, required: true },
  baja: [{ type: ObjectId, ref: 'Baja', default: [] }],
  prestamos: [{ type: ObjectId, ref: 'Prestamo', default: [] }]
})

export default mongoose.model('Libro', LibroSchema)
