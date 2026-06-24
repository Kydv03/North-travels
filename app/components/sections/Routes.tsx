'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ROUTES = [
  { from: 'Delhi',     to: 'Chandigarh', duration: '4h 30m', price: '₹449'   },
  { from: 'Delhi',     to: 'Jaipur',     duration: '5h 45m', price: '₹549'   },
  { from: 'Gurugram',  to: 'Panipat',    duration: '2h 30m', price: '₹249'   },
  { from: 'Delhi',     to: 'Shimla',     duration: '7h 00m', price: '₹749'   },
  { from: 'Faridabad', to: 'Ambala',     duration: '3h 45m', price: '₹349'   },
  { from: 'Delhi',     to: 'Manali',     duration: '12h 00m', price: '₹1,099' },
]



export default function Routes() {
  const handleWhatsApp = (from: string, to: string) => {
    const msg = `Hi! I want to book a bus from ${from} to ${to}. Please share available dates and timings.`
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section
      id="routes"
      style={{
        backgroundColor: '#fdf8f4',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Section label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#f97316' }} />
          <span style={{
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            color: '#f97316',
            textTransform: 'uppercase' as const,
          }}>
            Popular Routes
          </span>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#f97316' }} />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          Where We Travel
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            textAlign: 'center',
            fontSize: '17px',
            color: '#64748b',
            maxWidth: '500px',
            margin: '0 auto 64px',
            lineHeight: '1.7',
          }}
        >
          Connecting cities across North India with comfortable, reliable bus
          services every day.
        </motion.p>

        {/* Routes grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}>
          {ROUTES.map((route, i) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: 'easeOut' }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(249,115,22,0.1)' }}
              onClick={() => handleWhatsApp(route.from, route.to)}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #f1e8df',
                borderRadius: '16px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
              }}
            >
              {/* Arrow icon box */}
              <div style={{
                width: '52px',
                height: '52px',
                backgroundColor: '#f97316',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <ArrowRight size={22} color="#ffffff" />
              </div>

              {/* Route info */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '17px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '6px',
                }}>
                  {route.from} → {route.to}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                    {route.duration}
                  </span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px' }}>•</span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#f97316',
                  }}>
                    From {route.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #f97316',
              borderRadius: '50px',
              padding: '13px 36px',
              fontSize: '15px',
              fontWeight: '700',
              color: '#f97316',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#f97316'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#f97316'
            }}
          >
            View All Routes
          </button>
        </motion.div>

      </div>
    </section>
  )
}