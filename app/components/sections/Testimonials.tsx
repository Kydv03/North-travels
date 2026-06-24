'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    initials: 'RK',
    name: 'Rajesh Kumar',
    route: 'Delhi → Shimla',
    stars: 5,
    review:
      'Booked a sleeper bus for our family trip to Shimla. The bus was clean, driver was professional, and we reached on time. Will definitely use again!',
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    route: 'Corporate Event, Gurugram',
    stars: 4,
    review:
      'We hired a luxury coach for our office picnic — 40 employees. The booking process was smooth via WhatsApp and the bus was top-notch. Great experience!',
  },
  {
    initials: 'AS',
    name: 'Amit Singh',
    route: 'Delhi → Jaipur Regular',
    stars: 5,
    review:
      'Best bus service for the Delhi-Jaipur route. Affordable pricing, punctual timing, and the driver knows all the good dhaba stops. Highly recommended!',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Section label */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '12px', marginBottom: '16px',
        }}>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#f97316' }} />
          <span style={{
            fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em',
            color: '#f97316', textTransform: 'uppercase' as const,
          }}>
            Testimonials
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
            fontWeight: '800', color: '#ffffff',
            marginBottom: '16px', letterSpacing: '-0.02em',
          }}
        >
          What Our Passengers Say
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            textAlign: 'center', fontSize: '17px',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '480px', margin: '0 auto 64px', lineHeight: '1.7',
          }}
        >
          Real reviews from real travelers who trust NorthTravels for their journeys.
        </motion.p>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              style={{
                backgroundColor: '#1e293b',
                border: '1.5px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '32px 28px',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={18}
                    fill={si < t.stars ? '#f97316' : 'none'}
                    color={si < t.stars ? '#f97316' : '#475569'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Review */}
              <p style={{
                fontSize: '15px', color: 'rgba(255,255,255,0.75)',
                lineHeight: '1.75', fontStyle: 'italic', marginBottom: '28px',
              }}>
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px', height: '46px',
                  backgroundColor: '#f97316', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '15px', fontWeight: '700', color: '#ffffff', flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>
                    {t.route}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}