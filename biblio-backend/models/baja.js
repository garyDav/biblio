import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const BajaSchema = new Schema({
  detalle: { type: String, required: true },
  libro: { type: ObjectId, ref: 'Libro', required: true }
})

export default mongoose.model('Baja', BajaSchema)
