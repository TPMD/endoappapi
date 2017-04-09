import mongoose from 'mongoose'

const patientSchema = mongoose.Schema({
  name: String,
  doctor: String,
  createdAt: Date,
  modified: Date,
  insurance: String
}, {strict:false})


patientSchema.pre('save', function(next) {
  this.modified = Date.now()
  next()
})




export default mongoose.model('patient', patientSchema)