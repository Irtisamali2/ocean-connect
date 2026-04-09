'use client';

import { motion } from 'framer-motion';
import { Monitor, Stethoscope, Hotel, HardHat, MessageSquare, Globe } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const verticals = [
  { icon: Monitor, title: 'Technology & IT', desc: 'Microsoft MicroDegree programs, coding basics, digital marketing, and software skills for the modern workplace.' },
  { icon: Stethoscope, title: 'Healthcare & Allied Health', desc: 'Training for nurses, paramedics, caregivers, medical assistants, and healthcare support staff.' },
  { icon: Hotel, title: 'Hospitality & Tourism', desc: 'Front office, culinary arts, housekeeping, customer service, and F&B operations for international placements.' },
  { icon: HardHat, title: 'Construction & Technical Trades', desc: 'Electricians, plumbers, carpenters, welders — trade-tested and deployment-ready.' },
  { icon: MessageSquare, title: 'Soft Skills & Professional Dev.', desc: 'Communication, workplace ethics, English proficiency, and interview preparation.' },
  { icon: Globe, title: 'Pre-Departure Orientation', desc: 'Country-specific modules on workplace culture, legal rights, and emergency contacts — mandatory before deployment.' },
];

export default function TrainingClient() {
  return (
    <>
      <section className="hero-section section-alt">
        <div className="hero-grid" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 620 }}>
            <motion.div variants={fadeUp}><span className="badge badge-teal">Training Programs</span></motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 20, marginBottom: 16 }}>
              Skills That Open Doors <span className="teal-text">Everywhere</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>
              Ocean Connect&apos;s training programs prepare candidates for real-world employment — in Pakistan or abroad.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-3">
            {verticals.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeUp} className="card">
                  <div className="card-icon">
                    <Icon style={{ width: 20, height: 20, color: '#14b8a6' }} />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 10, fontFamily: 'Outfit, sans-serif' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
