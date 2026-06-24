'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99999 99999',
    href: 'tel:+919999999999',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@northtravels.in',
    href: 'mailto:info@northtravels.in',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Sector 15, Gurugram, Haryana 122001',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', phone: '', message: '' })
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg]   = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.message) {
      setErrMsg('Please fill all fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong.')

      setStatus('success')
      setTimeout(() => {
        setForm({ name: '', phone: '', message: '' })
        setStatus('idle')
      }, 5000)

    } catch (err: unknown) {
      setErrMsg(err instanceof Error ? err.message : 'Failed to send. Try WhatsApp instead.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const btnColor =
    status === 'success' ? '#22c55e' :
    status === 'error'   ? '#ef4444' : '#f97316'

  const btnLabel =
    status === 'loading' ? 'Sending...' :
    status === 'success' ? '✓ Message Sent!' :
    status === 'error'   ? '✗ Failed — Try Again' : 'Send Message'

  return (
    <>
      {/* ── Toast Notification ── */}
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: status === 'success' ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
        opacity: status === 'success' ? 1 : 0,
        pointerEvents: status === 'success' ? 'auto' : 'none',
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          border: '1.5px solid #dcfce7',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px',
          minWidth: '320px',
          maxWidth: '380px',
        }}>
          {/* Green check icon */}
          <div style={{
            width: '40px', height: '40px',
            backgroundColor: '#dcfce7',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div>
            <p style={{
              fontSize: '15px', fontWeight: '700',
              color: '#0f172a', margin: '0 0 4px',
            }}>
              Message Sent Successfully!
            </p>
            <p style={{
              fontSize: '13px', color: '#64748b',
              margin: 0, lineHeight: '1.5',
            }}>
              We&apos;ll contact you within 1–2 hours on{' '}
              <span style={{ color: '#f97316', fontWeight: '600' }}>
                {form.phone || 'your number'}
              </span>
            </p>
          </div>
        </div>
      </div>

    <section
      id="contact"
      style={{ backgroundColor: '#f8fafc', padding: '100px 24px' }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: '800', color: '#0f172a',
            marginBottom: '16px', letterSpacing: '-0.02em',
          }}>
            Get in Touch
          </h2>
          <p style={{
            fontSize: '16px', color: '#64748b',
            lineHeight: '1.75', marginBottom: '48px', maxWidth: '360px',
          }}>
            Have questions about routes, pricing, or private hire? Reach out
            to us anytime — we&apos;re here to help plan your journey.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon
              const inner = (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    backgroundColor: '#fff7ed', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color="#f97316" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '11px', fontWeight: '700', color: '#94a3b8',
                      marginBottom: '4px', textTransform: 'uppercase' as const,
                      letterSpacing: '0.06em',
                    }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              )
            })}
          </div>
        </motion.div>

        {/* ── RIGHT — Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            backgroundColor: '#ffffff', borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
            border: '1.5px solid #f1f5f9',
          }}
        >
          <h3 style={{
            fontSize: '20px', fontWeight: '700',
            color: '#0f172a', marginBottom: '28px',
          }}>
            Send Us a Message
          </h3>

          {/* Full Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>FULL NAME</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#f97316')}
              onBlur={e  => (e.currentTarget.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>PHONE NUMBER</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              type="tel"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#f97316')}
              onBlur={e  => (e.currentTarget.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Message */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>MESSAGE</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your travel requirements..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#f97316')}
              onBlur={e  => (e.currentTarget.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Error message */}
          {status === 'error' && errMsg && (
            <p style={{
              fontSize: '14px', color: '#ef4444',
              marginBottom: '12px', fontWeight: '500',
            }}>
              {errMsg}
            </p>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            style={{
              width: '100%', padding: '15px',
              backgroundColor: btnColor,
              border: 'none', borderRadius: '12px',
              fontSize: '16px', fontWeight: '700', color: '#ffffff',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              opacity: status === 'loading' ? 0.8 : 1,
            }}
          >
            {btnLabel}
          </button>

          <p style={{
            fontSize: '13px', color: '#94a3b8',
            textAlign: 'center', marginTop: '14px',
          }}>
            Or WhatsApp us directly at{' '}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25D366', fontWeight: '600', textDecoration: 'none' }}
            >
              +91 99999 99999
            </a>
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: '700',
  color: '#94a3b8', letterSpacing: '0.08em',
  marginBottom: '8px', textTransform: 'uppercase',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px',
  fontSize: '15px', color: '#0f172a',
  backgroundColor: '#ffffff', outline: 'none',
  fontFamily: 'inherit', transition: 'border-color 0.2s',
}