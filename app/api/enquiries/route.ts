import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongodb'
import Enquiry from '@/app/models/Enquiry'

export async function GET() {
  try {
    await connectDB()
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(100)
    return NextResponse.json({ enquiries })
  } catch (error) {
    console.error('ENQUIRIES ERROR:', error)
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}