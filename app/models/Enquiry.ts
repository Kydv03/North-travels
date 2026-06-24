import mongoose, { Schema, models } from 'mongoose'

const EnquirySchema = new Schema({
  name:      { type: String, required: true },
  phone:     { type: String, required: true },
  message:   { type: String, required: true },
  status:    { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
})

export default models.Enquiry || mongoose.model('Enquiry', EnquirySchema)