'use client'

import { Bus } from 'lucide-react'

const QUICK_LINKS = ['Home', 'Services', 'Routes', 'Our Fleet', 'Contact']
const TOP_ROUTES  = ['Delhi → Chandigarh', 'Delhi → Jaipur', 'Delhi → Shimla', 'Gurugram → Panipat', 'Delhi → Manali']
const SERVICES    = ['Fixed Routes', 'Private Hire', 'Wedding Buses', 'School Trips', 'Corporate Travel']

const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z',
  },
  {
    label: 'Twitter',
    href: '#',
    path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    if (id === 'Home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    const map: Record<string, string> = {
      'Services': '#services', 'Routes': '#routes',
      'Our Fleet': '#fleet',   'Contact': '#contact',
    }
    document.querySelector(map[id] ?? '#')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '72px 24px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          paddingBottom: '56px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
          className="footer-grid"
        >

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '40px', height: '40px',
                backgroundColor: '#f97316',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bus size={20} color="#ffffff" />
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>
                NorthTravels
              </span>
            </div>

            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: '1.75',
              maxWidth: '260px',
              marginBottom: '28px',
            }}>
              Your trusted partner for comfortable, affordable bus travel across
              North India. Connecting cities, creating memories.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '38px', height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background-color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f97316')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={colHeadStyle}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {QUICK_LINKS.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(l)}
                    style={linkBtnStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f97316')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Routes */}
          <div>
            <h4 style={colHeadStyle}>Top Routes</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TOP_ROUTES.map((r) => (
                <li key={r}>
                  <button
                    onClick={() => document.querySelector('#routes')?.scrollIntoView({ behavior: 'smooth' })}
                    style={linkBtnStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f97316')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={colHeadStyle}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                    style={linkBtnStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f97316')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 0',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            © {new Date().getFullYear()} NorthTravels. All rights reserved.
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            Made with care in Haryana, India
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}

const colHeadStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#ffffff',
  marginBottom: '20px',
  letterSpacing: '0.03em',
}

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontSize: '14px',
  color: 'rgba(255,255,255,0.5)',
  transition: 'color 0.2s',
  textAlign: 'left',
}