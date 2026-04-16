'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Globe, GraduationCap, BookOpen, CheckCircle,
  Shield, Award, UserCheck, Users, Star, Briefcase, TrendingUp, Headphones,
} from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const services = [
  { icon: Globe, title: 'Overseas Recruitment', desc: 'Connect with verified international employers across the Gulf, Middle East, UK, and Europe. We manage every step — sourcing to placement.', href: '/services/recruitment', cta: 'Learn More' },
  { icon: GraduationCap, title: 'Microsoft MicroDegree', desc: 'Globally recognized IT certifications in AI, Cloud, Cybersecurity & Data Analytics. Jointly awarded with KAMK University Finland.', href: '/services/microdegree', cta: 'Enroll Now' },
  { icon: BookOpen, title: 'Training Programs', desc: 'Vocational & professional training spanning IT, healthcare, hospitality, and construction — preparing you for Pakistan or abroad.', href: '/services/training', cta: 'View Programs' },
];

const whyUs = [
  { icon: Shield, title: 'Compliance First', desc: 'Aligned with Pakistani emigration regulations and international employment standards.' },
  { icon: Award, title: 'Microsoft Authorized', desc: 'Official marketing partner for Microsoft Skills for Jobs in collaboration with KAMK University Finland.' },
  { icon: UserCheck, title: 'Verified Employers', desc: 'Every job offer is authenticated before being shared with candidates. No fake listings.' },
  { icon: CheckCircle, title: 'Zero Exploitation', desc: 'Candidates are fully briefed on salary, rights, and contract terms before departure.' },
  { icon: TrendingUp, title: 'End-to-End Support', desc: 'From registration and documentation to visa and post-placement follow-up.' },
  { icon: Headphones, title: 'Post-Placement Care', desc: 'Our relationship continues after you land. We ensure your smooth settlement abroad.' },
];

const testimonials = [
  { quote: 'Within 3 months, I had a verified job offer in KSA with all documentation handled. I felt supported at every single step.', name: 'Ahmed R.', role: 'Male Nurse, Saudi Arabia' },
  { quote: 'The MicroDegree helped me land a remote internship with an EU company. ECTS credits and global recognition made the difference.', name: 'Fatima K.', role: 'IT Graduate' },
  { quote: 'As an employer, we rely on Ocean Connect for reliable, pre-screened candidates. Their professionalism is unmatched.', name: 'HR Manager', role: 'Riyadh, Saudi Arabia' },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 780 }}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-teal">Pakistan&apos;s Trusted Global Career Partner</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 24, marginBottom: 20 }}>
              Empowering Pakistan&apos;s Talent —{' '}
              <span className="teal-text">Placing Them on the World Stage</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', maxWidth: 560, marginBottom: 36, lineHeight: 1.7 }}>
              Ocean Connect connects skilled professionals with global employers and equips the next generation with Microsoft-certified technology skills.
            </motion.p>
            <motion.div variants={fadeUp} className="btn-row">
              <Link href="/jobs" className="btn-primary">
                Explore Opportunities <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
              <Link href="/services/microdegree" className="btn-outline">
                <GraduationCap style={{ width: 15, height: 15 }} /> MicroDegree Program
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <div className="stats-bar">
        <div className="site-container">
          <div className="stat-grid">
            {[
              { target: 500, suffix: '+', label: 'Professionals Placed', border: true },
              { target: 20, suffix: '+', label: 'Countries Reached', border: true },
              { target: 5, suffix: '', label: 'MS Programs', border: true },
              { target: 100, suffix: '%', label: 'Verified Credentials', border: false },
            ].map((s, i) => (
              <div key={s.label} style={{ borderRight: s.border ? '1px solid rgba(15, 23, 42, 0.08)' : 'none' }}>
                <AnimatedCounter target={s.target} suffix={s.suffix} label={s.label} delay={i * 120} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ABOUT INTRO ─── */}
      <section className="section">
        <div className="site-container">
          <div className="split-2">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="section-label">Welcome to Ocean Connect</div>
              <h2 className="heading-lg" style={{ marginBottom: 20 }}>
                Your Gateway to <span className="teal-text">Global Careers</span> &amp; World-Class Tech Skills
              </h2>
              <p style={{ marginBottom: 16 }}>
                At Ocean Connect, we believe every Pakistani professional deserves a world-class opportunity. Whether you&apos;re seeking employment in the Gulf, aiming for an EU tech career, or an employer searching for reliable talent — we are your trusted partner.
              </p>
              <p style={{ marginBottom: 32 }}>
                Two powerful pathways:{' '}
                <strong style={{ color: '#0f172a' }}>Overseas HR Placement</strong> and{' '}
                <strong style={{ color: '#0f172a' }}>Microsoft-certified Technology Education</strong>.
              </p>
              <Link href="/about" className="btn-outline">Our Story <ArrowRight style={{ width: 15, height: 15 }} /></Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="g-2">
                {[
                  { icon: Globe, label: 'Global Reach', sub: '20+ countries' },
                  { icon: Shield, label: 'Compliance First', sub: 'Legally aligned' },
                  { icon: Award, label: 'MS Authorized', sub: 'Official partner' },
                  { icon: CheckCircle, label: 'Zero Exploitation', sub: 'Ethical first' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="card" style={{ padding: 20 }}>
                      <div className="card-icon" style={{ marginBottom: 12 }}>
                        <Icon style={{ width: 18, height: 18, color: '#14b8a6' }} />
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#334155' }}>{item.sub}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section section-alt">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <div className="section-label">What We Do</div>
            <h2 className="heading-lg" style={{ marginBottom: 12 }}>Three Pillars, One Mission</h2>
            <p style={{ maxWidth: 480 }}>Connecting talent with opportunity through recruitment, technology education, and professional development.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={fadeUp} className="card">
                  <div className="card-icon"><Icon style={{ width: 20, height: 20, color: '#14b8a6' }} /></div>
                  <h3 className="heading-md" style={{ marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', marginBottom: 24, lineHeight: 1.65 }}>{s.desc}</p>
                  <Link href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#14b8a6', fontWeight: 600 }}>
                    {s.cta} <ArrowRight style={{ width: 13, height: 13 }} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="section">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <div className="section-label">Why Us</div>
            <h2 className="heading-lg">Why Thousands Trust Ocean Connect</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-3">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={fadeUp} style={{ display: 'flex', gap: 16 }}>
                  <div className="card-icon" style={{ marginBottom: 0, flexShrink: 0 }}>
                    <Icon style={{ width: 18, height: 18, color: '#14b8a6' }} />
                  </div>
                  <div>
                    <div className="heading-md" style={{ fontSize: '0.9rem', marginBottom: 6 }}>{item.title}</div>
                    <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link href="/why-us" className="btn-outline">Full Story <ArrowRight style={{ width: 14, height: 14 }} /></Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section section-alt">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Testimonials</div>
            <h2 className="heading-lg">What Our Candidates Say</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="testimonial-card">
                <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 14, height: 14, fill: '#d97706', color: '#d97706' }} />)}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users style={{ width: 16, height: 16, color: '#14b8a6' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#334155' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <div className="divider" />
      <div style={{ padding: '48px 0', background: '#f8fafc' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Partners &amp; Affiliations</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
            {['Hazza Institute', 'Thrive Consulting', 'KAMK University Finland', 'Microsoft'].map((p) => (
              <div key={p} style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>{p}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="divider" />

      {/* ─── CTA ─── */}
      <section className="section">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: '#ffffff', border: '1px solid rgba(20,184,166,0.15)', borderRadius: 16, padding: '56px 32px', textAlign: 'center' }}
          >
            <h2 className="heading-lg" style={{ marginBottom: 16 }}>
              Ready to Start Your <span className="teal-text">Global Journey?</span>
            </h2>
            <p style={{ maxWidth: 520, margin: '0 auto 36px', fontSize: '1rem' }}>
              Whether you&apos;re looking for overseas work or a Microsoft-recognized tech certification — Ocean Connect is where your future begins.
            </p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <Link href="/jobs" className="btn-primary">
                <Briefcase style={{ width: 15, height: 15 }} /> Browse Jobs
              </Link>
              <Link href="/services/microdegree" className="btn-outline">
                <GraduationCap style={{ width: 15, height: 15 }} /> Enroll in MicroDegree
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
