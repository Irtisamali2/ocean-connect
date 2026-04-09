'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Services',
    href: '#',
    children: [
      { label: 'Overseas Recruitment', href: '/services/recruitment' },
      { label: 'Microsoft MicroDegree', href: '/services/microdegree' },
      { label: 'Training Programs', href: '/services/training' },
    ],
  },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Industries', href: '/industries' },
  { label: 'Job Portal', href: '/jobs' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar transition-all duration-300 ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
      <div className="site-container h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setIsOpen(false)}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(20,184,166,0.12)',
              border: '1px solid rgba(20,184,166,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Globe style={{ width: 18, height: 18, color: '#14b8a6' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#0f172a', lineHeight: 1.1 }}>
              Ocean Connect
            </div>
            <div className="nav-brand-subtitle" style={{ fontSize: '0.6rem', color: '#14b8a6', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1 }}>
              Recruit · Train · Place
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center" style={{ gap: 4 }}>
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '8px 14px', borderRadius: 7, border: 'none',
                    background: 'transparent', cursor: 'pointer',
                    color: dropdown === link.label ? '#0f172a' : '#64748b',
                    fontSize: '0.875rem', fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                  <ChevronDown style={{ width: 13, height: 13, transition: 'transform 0.2s', transform: dropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                <AnimatePresence>
                  {dropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="nav-dropdown"
                      style={{ position: 'absolute', top: '100%', left: 0, marginTop: 6, minWidth: 240 }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          style={{
                            display: 'block', padding: '11px 18px',
                            fontSize: '0.875rem', color: '#64748b',
                            transition: 'color 0.15s, background 0.15s',
                            borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#2dd4bf'; (e.currentTarget as HTMLElement).style.background = 'rgba(20,184,166,0.05)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748b'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  padding: '8px 14px', borderRadius: 7,
                  fontSize: '0.875rem', fontWeight: 500,
                  color: '#64748b', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0f172a'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748b'; }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link href="/jobs" className="btn-primary">
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
          style={{
            padding: 8, borderRadius: 8, background: 'rgba(15, 23, 42, 0.07)',
            border: '1px solid rgba(15, 23, 42, 0.10)', color: '#64748b', cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(248,250,252,0.97)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div className="site-container" style={{ paddingTop: 16, paddingBottom: 16 }}>
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#14b8a6', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '10px 0 4px' }}>
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        style={{ display: 'block', padding: '9px 16px', fontSize: '0.875rem', color: '#64748b', borderRadius: 8 }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{ display: 'block', padding: '10px 0', fontSize: '0.9rem', color: '#334155', borderBottom: '1px solid rgba(15, 23, 42, 0.06)' }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div style={{ paddingTop: 16 }}>
                <Link href="/jobs" onClick={() => setIsOpen(false)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
