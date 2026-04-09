'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Shield, Globe, BookOpen, Users } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Complete transparency — no false promises, no hidden costs.' },
  { icon: Star, title: 'Excellence', desc: 'World-class service to every candidate and employer.' },
  { icon: BookOpen, title: 'Empowerment', desc: 'We invest in skills, not just placements.' },
  { icon: Globe, title: 'Compliance', desc: 'Fully registered and following all legal frameworks.' },
  { icon: Heart, title: 'Inclusion', desc: 'Serving candidates from all provinces and backgrounds.' },
];

const team = [
  { name: 'Dr. Muhammad Habib e Ajmi', role: 'CEO / Founder', desc: 'Vision, strategy, and global partnerships.' },
  { name: 'Mr. Shahzad', role: 'MicroDegree Coordinator', desc: 'Manages program enrollments and student support.' },
  { name: 'Mr. Awais', role: 'Documentation & Visa', desc: 'Handles all legal and documentation processes.' },
  { name: 'Ms. Sonober', role: 'Training Manager', desc: 'Oversees skill development programs.' },
];

export default function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section section-alt">
        <div className="hero-grid" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 640 }}>
            <motion.div variants={fadeUp}><span className="badge badge-teal">About Us</span></motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 20, marginBottom: 16 }}>
              Who <span className="teal-text">We Are</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>
              A company built on trust, purpose, and the relentless pursuit of opportunity for Pakistan&apos;s workforce.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="site-container">
          <div className="split-2">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="section-label">Our Story</div>
              <h2 className="heading-lg" style={{ marginBottom: 20 }}>Built on <span className="teal-text">Purpose</span></h2>
              <p style={{ marginBottom: 16 }}>
                Ocean Connect was founded with a singular conviction: Pakistan&apos;s talent deserves global recognition. As the country produces millions of skilled graduates and professionals every year, Ocean Connect was established to be the bridge — a trustworthy, ethical, and expert partner.
              </p>
              <p>Operating at the intersection of recruitment, technology education, and career development, Ocean Connect serves job seekers, employers, and aspiring tech professionals across the country.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {[
                { label: 'Our Mission', text: "To empower Pakistan's workforce through ethical overseas placement, globally recognized technology certifications, and professional development programs — creating pathways to sustainable careers at home and abroad." },
                { label: 'Our Vision', text: "To be Pakistan's most trusted career transformation company — placing 10,000+ professionals globally by 2030 and making world-class tech education accessible to every corner of the country." },
              ].map((item) => (
                <div key={item.label} className="card">
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#14b8a6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{item.label}</div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <div className="section-label">Core Values</div>
            <h2 className="heading-lg">What We Stand For</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeUp} className="card" style={{ textAlign: 'center' }}>
                  <div className="card-icon" style={{ margin: '0 auto 14px' }}>
                    <Icon style={{ width: 18, height: 18, color: '#14b8a6' }} />
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>{v.title}</div>
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <div className="section-label">Our Team</div>
            <h2 className="heading-lg">The People Behind Ocean Connect</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-4">
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users style={{ width: 22, height: 22, color: '#14b8a6' }} />
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#14b8a6', marginBottom: 10 }}>{member.role}</div>
                <p style={{ fontSize: '0.775rem', color: '#334155', margin: 0, lineHeight: 1.6 }}>{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
