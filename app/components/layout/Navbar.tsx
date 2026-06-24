'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Bus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'Services', href: '#services' },
  { label: 'Routes',   href: '#routes'   },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleNav = (href: string) => {
    setIsOpen(false)
    setTimeout(() => {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        const navHeight = 72
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: scrolled ? '#ffffff' : 'transparent',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
    }}>
      {/* Main navbar row */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* ── Logo ── */}
        <button
          onClick={() => handleNav('#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#f97316',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Bus size={22} color="#ffffff" />
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: '700',
            color: scrolled ? '#0f172a' : '#ffffff',
            transition: 'color 0.3s',
            whiteSpace: 'nowrap',
          }}>
            NorthTravels
          </span>
        </button>

        {/* ── Desktop nav links (hidden on mobile) ── */}
        {!isMobile && (
          <ul style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: scrolled ? '#374151' : '#ffffff',
                    transition: 'color 0.2s',
                    padding: '4px 0',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f97316')}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? '#374151' : '#ffffff')}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* ── Desktop CTA buttons (hidden on mobile) ── */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => handleNav('#contact')}
              style={{
                background: 'transparent',
                border: scrolled ? '1.5px solid #d1d5db' : '1.5px solid rgba(255,255,255,0.6)',
                borderRadius: '50px',
                padding: '8px 22px',
                fontSize: '14px',
                fontWeight: '600',
                color: scrolled ? '#374151' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#f97316'
                e.currentTarget.style.color = '#f97316'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = scrolled ? '#d1d5db' : 'rgba(255,255,255,0.6)'
                e.currentTarget.style.color = scrolled ? '#374151' : '#ffffff'
              }}
            >
              Login
            </button>
            <button
              onClick={() => handleNav('#booking')}
              style={{
                backgroundColor: '#f97316',
                border: 'none',
                borderRadius: '50px',
                padding: '10px 26px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.15s',
                boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#ea6c0a'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#f97316'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Book Now
            </button>
          </div>
        )}

        {/* ── Hamburger (mobile only) ── */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: scrolled ? '#0f172a' : '#ffffff',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid #f1f5f9',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '12px 16px 20px' }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#374151',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#fff7ed'
                    e.currentTarget.style.color = '#f97316'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#374151'
                  }}
                >
                  {link.label}
                </button>
              ))}

              <div style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                gap: '10px',
              }}>
                <button
                  onClick={() => handleNav('#contact')}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: '50px',
                    border: '1.5px solid #d1d5db',
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer',
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('#booking')}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: '#f97316',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}