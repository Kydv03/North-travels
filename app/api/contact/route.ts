import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create transporter ONCE outside the handler (reused across requests)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,           // SSL — faster and more reliable than service:'gmail'
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,   // 10s max — fail fast if Gmail unreachable
  greetingTimeout: 5000,
  socketTimeout: 10000,
})

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = await req.json()

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Send both emails in PARALLEL (not sequential) — cuts time in half
    await Promise.all([
      // Email to owner
      transporter.sendMail({
        from: `"NorthTravels Website" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: `New Enquiry from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#f97316;padding:24px;border-radius:12px 12px 0 0;">
              <h2 style="color:white;margin:0;">New Travel Enquiry</h2>
              <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;">From NorthTravels website</p>
            </div>
            <div style="background:#f8fafc;padding:28px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#64748b;width:120px;">Name</td>
                  <td style="padding:10px 0;color:#0f172a;font-weight:600;">${name}</td>
                </tr>
                <tr style="border-top:1px solid #e2e8f0;">
                  <td style="padding:10px 0;font-weight:bold;color:#64748b;">Phone</td>
                  <td style="padding:10px 0;">
                    <a href="tel:${phone}" style="color:#f97316;font-weight:600;">${phone}</a>
                  </td>
                </tr>
                <tr style="border-top:1px solid #e2e8f0;">
                  <td style="padding:10px 0;font-weight:bold;color:#64748b;vertical-align:top;">Message</td>
                  <td style="padding:10px 0;color:#0f172a;">${message}</td>
                </tr>
              </table>
              <div style="margin-top:20px;padding:14px;background:#fff7ed;border-radius:8px;border-left:4px solid #f97316;">
                <p style="margin:0;color:#92400e;font-size:14px;">
                  💡 Call the customer directly at <strong>${phone}</strong>
                </p>
              </div>
            </div>
          </div>
        `,
      }),

      // Confirmation to owner (acts as receipt — add customer email field later)
      transporter.sendMail({
        from: `"NorthTravels" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: `✓ Enquiry received — ${name} (${phone})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0f172a;padding:24px;border-radius:12px 12px 0 0;">
              <h2 style="color:white;margin:0;">Enquiry Logged</h2>
            </div>
            <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
              <p style="color:#374151;">Customer <strong>${name}</strong> enquired. Contact: <strong>${phone}</strong></p>
              <p style="color:#374151;">Message: ${message}</p>
            </div>
          </div>
        `,
      }),
    ])

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send. Please try WhatsApp.' },
      { status: 500 }
    )
  }
}