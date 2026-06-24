'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const CITIES = [
  'Delhi', 'Chandigarh', 'Jaipur', 'Shimla', 'Manali',
  'Gurugram', 'Faridabad', 'Ambala', 'Panipat', 'Rohtak',
  'Hisar', 'Karnal', 'Ludhiana', 'Amritsar', 'Dehradun',
]

const STATS = [
  { value: '12,000+', label: 'Happy Passengers' },
  { value: '50+',     label: 'Routes Covered'   },
  { value: '25+',     label: 'Premium Buses'     },
]

export default function Hero() {
  const [tripType, setTripType]   = useState<'one-way' | 'round'>('one-way')
  const [from,     setFrom]       = useState('')
  const [to,       setTo]         = useState('')
  const [date,     setDate]       = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('1')

  const handleWhatsApp = () => {
    if (!from || !to || !date) {
      alert('Please fill From, To and Journey Date before booking.')
      return
    }
    const msg = tripType === 'one-way'
      ? `Hi! I want to book a bus.\nFrom: ${from}\nTo: ${to}\nDate: ${date}\nPassengers: ${passengers}`
      : `Hi! I want to book a round trip bus.\nFrom: ${from}\nTo: ${to}\nDeparture: ${date}\nReturn: ${returnDate}\nPassengers: ${passengers}`
    const url = `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  // Today's date for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dots pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
      }} />

      {/* Orange glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px', margin: '0 auto', width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
      }}
        className="hero-grid"
      >
        {/* LEFT — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.3)',
            borderRadius: '50px',
            padding: '8px 16px',
            marginBottom: '28px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316', display: 'inline-block' }} />
            <span style={{ color: '#fdba74', fontSize: '14px', fontWeight: '500' }}>
              North India&apos;s Trusted Bus Service
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: '800',
            lineHeight: '1.1',
            color: '#ffffff',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            Travel in{' '}
            <span style={{ color: '#f97316' }}>Comfort</span>
            <br />
            Across North India
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: '17px', lineHeight: '1.7',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '48px',
            maxWidth: '420px',
          }}>
            Book affordable, comfortable bus rides across Haryana,
            Delhi, Chandigarh, Jaipur and more. Private hire for
            weddings, corporate events &amp; school trips.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <div style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: '800',
                  color: '#ffffff',
                  lineHeight: '1',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          id="booking"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          }}
        >
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
            Book Your Journey
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
            Quick booking via WhatsApp — instant confirmation
          </p>

          {/* Trip Type Toggle */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '24px',
          }}>
            {(['one-way', 'round'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  backgroundColor: tripType === type ? '#f97316' : 'transparent',
                  color: tripType === type ? '#ffffff' : '#64748b',
                }}
              >
                {type === 'one-way' ? 'One Way' : 'Round Trip'}
              </button>
            ))}
          </div>

          {/* From */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '8px' }}>
              FROM
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select pickup city</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* To */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '8px' }}>
              TO
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select destination city</option>
              {CITIES.filter((c) => c !== from).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Date row */}
          <div style={{ display: 'grid', gridTemplateColumns: tripType === 'round' ? '1fr 1fr' : '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '8px' }}>
                JOURNEY DATE
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {tripType === 'round' ? 'RETURN DATE' : 'PASSENGERS'}
              </label>
              {tripType === 'round' ? (
                <input
                  type="date"
                  value={returnDate}
                  min={date || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={inputStyle}
                />
              ) : (
                <select value={passengers} onChange={(e) => setPassengers(e.target.value)} style={selectStyle}>
                  {[1,2,3,4,5,6,7,8,9,10,15,20,30,40,50].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Round trip passenger row */}
          {tripType === 'round' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '8px' }}>
                PASSENGERS
              </label>
              <select value={passengers} onChange={(e) => setPassengers(e.target.value)} style={selectStyle}>
                {[1,2,3,4,5,6,7,8,9,10,15,20,30,40,50].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          )}

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#f97316',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'background-color 0.2s, transform 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ea6c0a'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f97316'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <MessageCircle size={20} />
            Book via WhatsApp
          </button>
        </motion.div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '56px',
          height: '56px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          zIndex: 999,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '15px',
  color: '#0f172a',
  backgroundColor: '#ffffff',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'auto',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '15px',
  color: '#0f172a',
  backgroundColor: '#ffffff',
  outline: 'none',
}