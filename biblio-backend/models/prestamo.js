import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const PrestamoSchema = new Schema({
  cliente: { type: ObjectId, ref: 'Cliente', required: true },
  fecha_prestamo: { type: String, required: true },
  fecha_devolucion: { type: String, required: true },
  fecha_devuelto: { type: String, required: false },
  libro: { type: ObjectId, ref: 'Libro', required: true }
})

export default mongoose.model('Prestamo', PrestamoSchema)
