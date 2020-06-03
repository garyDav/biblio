import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const PrestamoSchema = new Schema({
  nombre: { type: String, required: true },
  celular: { type: Number, required: true },
  fecha_prestamo: { type: String, required: true },
  fecha_limite_devolucion: { type: String, required: true },
  fecha_devolucion: { type: String, required: false, default: '' },
  libro: { type: ObjectId, ref: 'Libro', required: true }
})

export default mongoose.model('Prestamo', PrestamoSchema)
