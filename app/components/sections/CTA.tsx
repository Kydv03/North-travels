'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export default function CTA() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea6c0a 100%)',
            borderRadius: '24px',
            padding: '64px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', top: '-40px', left: '-40px',
            width: '180px', height: '180px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', right: '-30px',
            width: '240px', height: '240px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
          }} />

          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 38px)',
            fontWeight: '800', color: '#ffffff',
            marginBottom: '14px', letterSpacing: '-0.02em',
            position: 'relative',
          }}>
            Ready to Book Your Next Journey?
          </h2>

          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.85)',
            maxWidth: '440px', margin: '0 auto 36px',
            lineHeight: '1.7', position: 'relative',
          }}>
            Get instant confirmation via WhatsApp. No app download needed —
            just message us your route and date.
          </p>

          <div style={{
            display: 'flex', gap: '14px',
            justifyContent: 'center', flexWrap: 'wrap',
            position: 'relative',
          }}>
            {/* Book Now */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                backgroundColor: '#ffffff', border: 'none',
                borderRadius: '50px', padding: '13px 32px',
                fontSize: '15px', fontWeight: '700', color: '#f97316',
                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'
              }}
            >
              Book Now
            </button>

            {/* Call Us */}
            <a
              href="tel:+919999999999"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                backgroundColor: 'transparent',
                border: '2px solid rgba(255,255,255,0.7)',
                borderRadius: '50px', padding: '13px 32px',
                fontSize: '15px', fontWeight: '700', color: '#ffffff',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.borderColor = '#ffffff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'
              }}
            >
              <Phone size={16} />
              Call Us: +91 99999 99999
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}