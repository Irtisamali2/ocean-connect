'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  UserSearch, Briefcase, FileText, Plane, BookOpen, ClipboardCheck,
  Headphones, ArrowRight, CheckCircle, MapPin
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const services = [
  { icon: UserSearch, title: 'Candidate Sourcing & Screening', desc: 'Verified candidate database with structured interviews and skills assessments.' },
  { icon: Briefcase, title: 'Overseas Job Placement', desc: 'Genuine, legally compliant employment across dozens of industries and skill levels.' },
  { icon: FileText, title: 'Documentation Services', desc: 'NOC letters, contracts, attestation, MOFA authentication — zero delays.' },
  { icon: Plane, title: 'Visa Processing', desc: 'Full visa application management, embassy liaison, and personalized guidance.' },
  { icon: BookOpen, title: 'Pre-Departure Orientation', desc: 'Cultural norms, legal rights, emergency contacts, and country-specific guidance.' },
  { icon: ClipboardCheck, title: 'Trade Testing', desc: 'Recognized trade testing to verify technical competency prior to deployment.' },
  { icon: Headphones, title: 'Post-Placement Support', desc: 'Ongoing communication to ensure smooth settlement after you land.' },
];

const countries = {
  'Gulf & Middle East': ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  'Europe & UK': ['Finland', 'Germany', 'UK', 'Poland', 'Romania'],
  'Other Regions': ['Malaysia', 'China', 'South Korea', 'Australia'],
};

const steps = [
  'Register your CV and profile',
  'Screening — interview and profile review',
  'Job Matching with verified overseas employers',
  'Documentation — all paperwork and attestation',
  'Visa Processing with the embassy',
  'Pre-Departure Orientation — prepare for life abroad',
  'Placement — depart with full support',
  'Post-Placement Support — we ensure your success',
];

export default function RecruitmentClient() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section section-alt">
        <div className="hero-grid" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 680 }}>
            <motion.div variants={fadeUp}><span className="badge badge-teal">Overseas Recruitment</span></motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 20, marginBottom: 16 }}>
              Your Trusted Partner for <span className="teal-text">Global Placement</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>
              From skilled trades to corporate roles — we connect Pakistan&apos;s finest with verified employers across the globe.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid — 4 cols desktop → 2 tablet → 1 mobile */}
      <section className="section">
        <div className="site-container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">What We Offer</div>
            <h2 className="heading-lg">Our Recruitment Services</h2>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={fadeUp} className="card">
                  <div className="card-icon"><Icon style={{ width: 18, height: 18, color: '#14b8a6' }} /></div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Countries — 3 cols → 1 col mobile */}
      <section className="section section-alt">
        <div className="site-container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">Global Reach</div>
            <h2 className="heading-lg">Destination Countries</h2>
          </div>
          <div className="g-3">
            {Object.entries(countries).map(([region, list]) => (
              <motion.div key={region} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <MapPin style={{ width: 14, height: 14, color: '#14b8a6' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{region}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {list.map((c) => (
                    <li key={c} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle style={{ width: 13, height: 13, color: '#0d9488', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section">
        <div className="site-container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">Process</div>
            <h2 className="heading-lg">Your Candidate Journey</h2>
          </div>
          <div style={{ maxWidth: 560 }}>
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{ display: 'flex', gap: 16, marginBottom: 8 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#14b8a6', color: '#f8fafc', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  {i < steps.length - 1 && <div className="step-connector" />}
                </div>
                <div style={{ paddingTop: 7, paddingBottom: i < steps.length - 1 ? 8 : 0 }}>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link href="/jobs" className="btn-primary">Apply for Jobs <ArrowRight style={{ width: 15, height: 15 }} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
