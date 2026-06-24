import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongodb'
import Booking from '@/app/models/Booking'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { status } = await req.json()
    await connectDB()
    await Booking.findByIdAndUpdate(id, { status })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update.' }, { status: 500 })
  }
}