import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongodb'
import Booking from '@/app/models/Booking'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, from, to, date, returnDate, passengers, tripType } = body

    if (!name || !phone || !from || !to || !date) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }

    await connectDB()
    const booking = await Booking.create({
      name, phone, from, to, date,
      returnDate: returnDate || '',
      passengers: Number(passengers) || 1,
      tripType: tripType || 'one-way',
      status: 'pending',
    })

    return NextResponse.json({ success: true, bookingId: booking._id })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Booking failed. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100)
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('BOOKING ERROR:', error)
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}