'use client'

import { motion } from 'framer-motion'
import { Layers, LayoutGrid, Clock, MapPin } from 'lucide-react'

const SERVICES = [
  {
    icon: Layers,
    title: 'Fixed Route Buses',
    description:
      'Daily scheduled services on popular routes across Haryana, Delhi, Chandigarh, and Rajasthan with punctual departures.',
  },
  {
    icon: LayoutGrid,
    title: 'Private Bus Hire',
    description:
      'Book entire buses for weddings, corporate outings, school trips, pilgrimages, and family functions at competitive rates.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description:
      'Round-the-clock service for emergency travel needs. Available for early morning and late-night journeys across all routes.',
  },
  {
    icon: MapPin,
    title: 'Custom Itineraries',
    description:
      'Planning a pilgrimage or group tour? We create customized travel plans with multiple stops and flexible scheduling.',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{ backgroundColor: '#ffffff', padding: '100px 24px' }}
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
            What We Offer
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
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: '800', color: '#0f172a',
            marginBottom: '16px', letterSpacing: '-0.02em',
          }}
        >
          Our Premium Services
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            textAlign: 'center', fontSize: '17px', color: '#64748b',
            maxWidth: '540px', margin: '0 auto 64px', lineHeight: '1.7',
          }}
        >
          From daily commutes to special occasions, we have the perfect travel
          solution for every need.
        </motion.p>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(249,115,22,0.12)', borderColor: '#fed7aa' }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #f1f5f9',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  cursor: 'default',
                }}
              >
                {/* Icon box */}
                <div style={{
                  width: '56px', height: '56px',
                  backgroundColor: '#fff7ed',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px',
                }}>
                  <Icon size={26} color="#f97316" strokeWidth={1.8} />
                </div>

                <h3 style={{
                  fontSize: '18px', fontWeight: '700',
                  color: '#0f172a', marginBottom: '12px',
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: '15px', color: '#64748b',
                  lineHeight: '1.7', margin: 0,
                }}>
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}