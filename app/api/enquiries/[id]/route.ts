import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongodb'
import Enquiry from '@/app/models/Enquiry'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    await connectDB()
    await Enquiry.findByIdAndUpdate(params.id, { status })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update.' }, { status: 500 })
  }
}