'use client';

import { motion } from 'framer-motion';
import {
  Monitor, Stethoscope, HardHat, Hotel, Factory, ShoppingBag,
  BookOpen, Shield, Flame, Landmark, Truck, Briefcase
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const industries = [
  { icon: Monitor, label: 'Information Technology' },
  { icon: Stethoscope, label: 'Healthcare & Medical' },
  { icon: HardHat, label: 'Construction & Engineering' },
  { icon: Hotel, label: 'Hospitality & Tourism' },
  { icon: Factory, label: 'Manufacturing & Industry' },
  { icon: ShoppingBag, label: 'Retail & Commerce' },
  { icon: BookOpen, label: 'Education & Training' },
  { icon: Shield, label: 'Security & Facilities' },
  { icon: Flame, label: 'Oil & Gas' },
  { icon: Landmark, label: 'Banking & Finance' },
  { icon: Truck, label: 'Logistics & Transport' },
  { icon: Briefcase, label: 'Administrative & Corporate' },
];

export default function IndustriesClient() {
  return (
    <>
      <section className="hero-section section-alt">
        <div className="hero-grid" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 600 }}>
            <motion.div variants={fadeUp}><span className="badge badge-teal">Industries</span></motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 20, marginBottom: 16 }}>
              Every Sector, <span className="teal-text">Every Skill</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>
              Ocean Connect recruits, trains, and places professionals across a wide range of industries.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.label} variants={fadeUp} className="industry-card">
                  <div style={{ width: 44, height: 44, borderRadius: 10, margin: '0 auto 14px', background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon style={{ width: 20, height: 20, color: '#14b8a6' }} />
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>{ind.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
