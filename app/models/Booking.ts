import mongoose, { Schema, models } from 'mongoose'

const BookingSchema = new Schema({
  name:       { type: String, required: true },
  phone:      { type: String, required: true },
  from:       { type: String, required: true },
  to:         { type: String, required: true },
  date:       { type: String, required: true },
  returnDate: { type: String, default: '' },
  passengers: { type: Number, required: true },
  tripType:   { type: String, enum: ['one-way', 'round'], default: 'one-way' },
  status:     { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt:  { type: Date, default: Date.now },
})

export default models.Booking || mongoose.model('Booking', BookingSchema)