'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bus, Users, MessageSquare, LogOut, Phone, RefreshCw } from 'lucide-react'

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

type Booking = {
  _id: string
  name: string
  phone: string
  from: string
  to: string
  date: string
  passengers: number
  tripType: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

type Enquiry = {
  _id: string
  name: string
  phone: string
  message: string
  status: 'new' | 'read' | 'resolved'
  createdAt: string
}

export default function AdminPage() {
  const [authed,   setAuthed]   = useState(false)
  const [password, setPassword] = useState('')
  const [passErr,  setPassErr]  = useState(false)
  const [tab,      setTab]      = useState<'bookings' | 'enquiries'>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [enquiries,setEnquiries]= useState<Enquiry[]>([])
  const [loading,  setLoading]  = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [bRes, eRes] = await Promise.all([
        fetch('/api/booking'),
        fetch('/api/enquiries'),
      ])
      const bData = await bRes.json()
      const eData = await eRes.json()
      setBookings(bData.bookings  || [])
      setEnquiries(eData.enquiries || [])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authed) fetchData()
  }, [authed, fetchData])

  const handleLogin = () => {
    if (password === ADMIN_PASS) { setAuthed(true); setPassErr(false) }
    else { setPassErr(true) }
  }

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/booking/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchData()
  }

  const updateEnquiryStatus = async (id: string, status: string) => {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchData()
  }

  const statusColor = (s: string) =>
    s === 'confirmed' || s === 'resolved' ? '#22c55e' :
    s === 'cancelled' ? '#ef4444' :
    s === 'new'       ? '#f97316' : '#f59e0b'

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#0f172a',
      }}>
        <div style={{
          backgroundColor: '#1e293b', borderRadius: '20px',
          padding: '48px 40px', width: '100%', maxWidth: '400px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '56px', height: '56px', backgroundColor: '#f97316',
              borderRadius: '14px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 16px',
            }}>
              <Bus size={28} color="#fff" />
            </div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0 }}>
              NorthTravels Admin
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
              Enter password to continue
            </p>
          </div>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%', padding: '13px 16px',
              backgroundColor: '#0f172a', border: passErr ? '1.5px solid #ef4444' : '1.5px solid #334155',
              borderRadius: '10px', color: '#fff', fontSize: '15px',
              outline: 'none', marginBottom: '12px', boxSizing: 'border-box',
            }}
          />
          {passErr && (
            <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>
              Incorrect password
            </p>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: '100%', padding: '13px', backgroundColor: '#f97316',
              border: 'none', borderRadius: '10px', color: '#fff',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
            }}
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  // ── DASHBOARD ──
  const pendingBookings  = bookings.filter(b  => b.status  === 'pending').length
  const newEnquiries     = enquiries.filter(e => e.status  === 'new').length

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>

      {/* Top bar */}
      <div style={{
        backgroundColor: '#0f172a', padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', backgroundColor: '#f97316',
            borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bus size={18} color="#fff" />
          </div>
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '17px' }}>
            NorthTravels Admin
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={fetchData} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px',
            padding: '8px 14px', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px',
          }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setAuthed(false)} style={{
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px', padding: '8px 14px', color: '#fca5a5',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px',
          }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Bookings',   value: bookings.length,   icon: Bus,          color: '#f97316' },
            { label: 'Pending Bookings', value: pendingBookings,   icon: Users,        color: '#f59e0b' },
            { label: 'Total Enquiries',  value: enquiries.length,  icon: MessageSquare,color: '#3b82f6' },
            { label: 'New Enquiries',    value: newEnquiries,      icon: Phone,        color: '#22c55e' },
          ].map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} style={{
                backgroundColor: '#fff', borderRadius: '14px',
                padding: '20px 24px', border: '1.5px solid #f1f5f9',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{stat.label}</span>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '9px',
                    backgroundColor: `${stat.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={stat.color} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>
                  {stat.value}
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {(['bookings', 'enquiries'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 24px', borderRadius: '50px', border: 'none',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer',
              backgroundColor: tab === t ? '#f97316' : '#fff',
              color: tab === t ? '#fff' : '#64748b',
              boxShadow: tab === t ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}>
              {t} {t === 'bookings' ? `(${bookings.length})` : `(${enquiries.length})`}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{
          backgroundColor: '#fff', borderRadius: '16px',
          border: '1.5px solid #f1f5f9', overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' }}>
              Loading...
            </div>
          ) : tab === 'bookings' ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #f1f5f9' }}>
                  {['Name', 'Phone', 'Route', 'Date', 'Passengers', 'Status', 'Action'].map(h => (
                    <th key={h} style={{
                      padding: '14px 16px', textAlign: 'left',
                      fontSize: '12px', fontWeight: '700',
                      color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No bookings yet</td></tr>
                ) : bookings.map((b, i) => (
                  <tr key={b._id} style={{ borderBottom: '1px solid #f8fafc', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={tdStyle}>{b.name}</td>
                    <td style={tdStyle}>
                      <a href={`tel:${b.phone}`} style={{ color: '#f97316', fontWeight: '600', textDecoration: 'none' }}>
                        {b.phone}
                      </a>
                    </td>
                    <td style={tdStyle}>{b.from} → {b.to}</td>
                    <td style={tdStyle}>{b.date}</td>
                    <td style={tdStyle}>{b.passengers}</td>
                    <td style={tdStyle}>
                      <span style={{
                        backgroundColor: `${statusColor(b.status)}18`,
                        color: statusColor(b.status),
                        padding: '4px 10px', borderRadius: '50px',
                        fontSize: '12px', fontWeight: '700',
                      }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <select
                        value={b.status}
                        onChange={e => updateBookingStatus(b._id, e.target.value)}
                        style={{
                          padding: '6px 10px', borderRadius: '8px',
                          border: '1.5px solid #e2e8f0', fontSize: '13px',
                          cursor: 'pointer', outline: 'none', backgroundColor: '#fff',
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1.5px solid #f1f5f9' }}>
                  {['Name', 'Phone', 'Message', 'Status', 'Action'].map(h => (
                    <th key={h} style={{
                      padding: '14px 16px', textAlign: 'left',
                      fontSize: '12px', fontWeight: '700',
                      color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No enquiries yet</td></tr>
                ) : enquiries.map((e, i) => (
                  <tr key={e._id} style={{ borderBottom: '1px solid #f8fafc', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={tdStyle}>{e.name}</td>
                    <td style={tdStyle}>
                      <a href={`tel:${e.phone}`} style={{ color: '#f97316', fontWeight: '600', textDecoration: 'none' }}>
                        {e.phone}
                      </a>
                    </td>
                    <td style={{ ...tdStyle, maxWidth: '280px', color: '#64748b' }}>{e.message}</td>
                    <td style={tdStyle}>
                      <span style={{
                        backgroundColor: `${statusColor(e.status)}18`,
                        color: statusColor(e.status),
                        padding: '4px 10px', borderRadius: '50px',
                        fontSize: '12px', fontWeight: '700',
                      }}>
                        {e.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <select
                        value={e.status}
                        onChange={ev => updateEnquiryStatus(e._id, ev.target.value)}
                        style={{
                          padding: '6px 10px', borderRadius: '8px',
                          border: '1.5px solid #e2e8f0', fontSize: '13px',
                          cursor: 'pointer', outline: 'none', backgroundColor: '#fff',
                        }}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

const tdStyle: React.CSSProperties = {
  padding: '14px 16px',
  fontSize: '14px',
  color: '#0f172a',
  verticalAlign: 'middle',
}