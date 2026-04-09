'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Award, UserCheck, Ban, LifeBuoy, DollarSign } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const differentiators = [
  { icon: Shield, title: 'Licensed & Compliant', desc: 'Ocean Connect adheres to all Pakistani emigration laws and international employment standards. Every placement is legal, documented, and protected.' },
  { icon: Award, title: 'Microsoft Authorized Partner', desc: 'Official marketing partner for the Microsoft Skills for Jobs MicroDegree, in collaboration with KAMK University Finland.' },
  { icon: UserCheck, title: 'Verified Employer Network', desc: 'We maintain exclusive partnerships with reputable employers across the Gulf, Middle East, Europe, and beyond — every offer authenticated.' },
  { icon: Ban, title: 'Zero Exploitation Policy', desc: 'Strict prohibition on any form of worker exploitation. Candidates are fully informed of rights, salary, and contract before departure.' },
  { icon: LifeBuoy, title: 'Holistic Support System', desc: 'End-to-end: registration, documentation, visa, orientation, placement, and post-placement follow-up. We never leave you alone.' },
  { icon: DollarSign, title: 'Transparent Fees', desc: 'Fees are communicated upfront. No hidden charges, no surprise deductions. You pay exactly what you agreed.' },
];

export default function WhyUsClient() {
  return (
    <>
      <section className="hero-section section-alt">
        <div className="hero-grid" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 620 }}>
            <motion.div variants={fadeUp}><span className="badge badge-teal">Why Choose Us</span></motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 20, marginBottom: 16 }}>
              Why Pakistan <span className="teal-text">Trusts Ocean Connect</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>
              More than a recruitment company — a career transformation partner built on ethics, expertise, and global reach.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-3">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.title} variants={fadeUp} className="card">
                  <div className="card-icon"><Icon style={{ width: 18, height: 18, color: '#14b8a6' }} /></div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 10, fontFamily: 'Outfit, sans-serif' }}>{d.title}</h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.7, margin: 0 }}>{d.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
