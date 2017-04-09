import mongoose from 'mongoose'

const doctorSchema = mongoose.Schema({
  name: String,
  description: String,
  hospital: String,
  createdAt: Date
})






export default mongoose.model('doctor', doctorSchema)