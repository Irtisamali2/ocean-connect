'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { contactInfo } from '@/lib/contact-info';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-grid" style={{ marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <img src="/ocean-connect-logo.svg" alt="Ocean Connect" style={{ width: 150, height: 46, objectFit: 'contain', flexShrink: 0 }} />
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
                { icon: Phone, label: contactInfo.general.phoneDisplay, href: contactInfo.general.phoneHref },
                { icon: MessageCircle, label: `WhatsApp: ${contactInfo.general.whatsappDisplay}`, href: contactInfo.general.whatsappHref, ext: true },
                { icon: Mail, label: contactInfo.general.email, href: `mailto:${contactInfo.general.email}` },
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
