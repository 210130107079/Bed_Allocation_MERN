import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  roomNumber: {
    type: Number,
    required: true
  },
  bedNumber: {
    type: Number,
    required: true
  },
  doctorName:{
    type:String,
    required:true
  },
  totalDays: {
    type: Number,
    required: true
  },
  admissionDate: {
    type: Date,
    required: true
  },
  dischargeDate: {
    type: Date,
    default: null
  }
}, { timestamps: true });

patientSchema.plugin(mongoosePaginate)

export const Patient = mongoose.model('Patient', patientSchema);