import mongoose from 'mongoose'

const doctorSchema = mongoose.Schema({
  name: String,
  description: String,
  hospital: String,
  createdAt: Date
})

doctorSchema.set('toObject', {getters:true})


export default mongoose.model('doctor', doctorSchema)