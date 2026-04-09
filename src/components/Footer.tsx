'use client';

import Link from 'next/link';
import { Globe, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-grid" style={{ marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Globe style={{ width: 16, height: 16, color: '#14b8a6' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                  Ocean Connect
                </div>
                <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Recruit · Train · Place · Globally
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.7, maxWidth: 260 }}>
              Connecting Pakistan&apos;s talent with global employers and world-class tech education.
            </p>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Services
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Overseas Recruitment', href: '/services/recruitment' },
                { label: 'Visa & Documentation', href: '/services/recruitment' },
                { label: 'Microsoft MicroDegree', href: '/services/microdegree' },
                { label: 'Training Programs', href: '/services/training' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    style={{ fontSize: '0.8rem', color: '#64748b', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#14b8a6'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Quick Links
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', href: '/' }, { label: 'About Us', href: '/about' },
                { label: 'Why Us', href: '/why-us' }, { label: 'Industries', href: '/industries' },
                { label: 'Job Portal', href: '/jobs' }, { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    style={{ fontSize: '0.8rem', color: '#64748b', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#14b8a6'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Contact
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: Phone, label: '0322-8341507', href: 'tel:+923228341507' },
                { icon: MessageCircle, label: 'WhatsApp: 0322-8341507', href: 'https://wa.me/923228341507', ext: true },
                { icon: Mail, label: 'oceanconnect0786@gmail.com', href: 'mailto:oceanconnect0786@gmail.com' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a href={item.href} target={(item as { ext?: boolean }).ext ? '_blank' : undefined}
                      rel={(item as { ext?: boolean }).ext ? 'noopener noreferrer' : undefined}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.8rem', color: '#64748b', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#14b8a6'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
                    >
                      <Icon style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2, color: '#14b8a6' }} />
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.8rem', color: '#64748b' }}>
                  <MapPin style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2, color: '#14b8a6' }} />
                  Office No: 3, Grand Royal Hotel Building, Davis Road, Lahore
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(15, 23, 42, 0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.75rem', color: '#374151', margin: 0 }}>
            © 2026 Ocean Connect. All Rights Reserved.
          </p>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: '0.75rem', color: '#374151' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#14b8a6'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#374151'}
            >Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: '0.75rem', color: '#374151' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#14b8a6'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#374151'}
            >Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
