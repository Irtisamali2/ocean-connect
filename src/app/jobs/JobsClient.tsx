'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, DollarSign, CheckCircle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const jobs = [
  {
    id: 1, title: 'Female Nurse', country: 'Saudi Arabia',
    salary: 'SAR 3,500 – 5,500 + SAR 300 Food Allowance',
    qualification: 'BSN / Post RN', age: '25–35 Years',
    experience: 'Min. 2 Years Post Qualification', license: 'Valid PNMC License',
    benefits: ['Medical Insurance', 'Accommodation', 'Transportation', 'Annual Paid Leaves', 'Visa Provided', 'Ticket Provided'],
    badge: 'Urgent Hiring', badgeClass: 'job-badge-urgent',
  },
  {
    id: 2, title: 'Nurse Technician', country: 'Saudi Arabia',
    salary: 'SAR 3,500 + SAR 300 Food Allowance',
    qualification: 'Diploma in Nursing, Midwifery', age: '25–35 Years',
    experience: 'Min. 2 Years Post Qualification', license: 'Valid PNMC License',
    benefits: ['Medical Insurance', 'Accommodation', 'Transportation', 'Visa Provided', 'Annual Paid Leaves'],
    badge: 'Open', badgeClass: 'job-badge-open',
  },
  {
    id: 3, title: 'Caregiver (Female)', country: 'Saudi Arabia',
    salary: 'SAR 2,500 + SAR 200 Food Allowance',
    qualification: '1–2 Yr Nursing Diploma / CNA', age: '23–40 Years',
    experience: 'Min. 2 Years', license: 'Certified Nursing Assistant (CNA)',
    benefits: ['Medical Insurance', 'Accommodation', 'Pick & Drop', 'Visa Provided', 'Ticket Provided'],
    badge: 'Urgent', badgeClass: 'job-badge-urgent',
    note: 'Home visits or stay with female patients if needed',
  },
  {
    id: 4, title: 'Domestic Worker / Maid (Female)', country: 'Saudi Arabia',
    salary: 'SAR 1,200 + SAR 200 Food Allowance',
    qualification: 'Matric / Intermediate', age: '25–35 Years',
    experience: '2 Years', license: 'N/A',
    benefits: ['Meals Provided', 'Accommodation', 'Medical per Saudi Labor Law', '15 Days Annual Leave', '2-Year Return Ticket'],
    badge: 'Open', badgeClass: 'job-badge-open',
    contract: '2 Years',
  },
];

export default function JobsClient() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section section-alt">
        <div className="hero-grid" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 640 }}>
            <motion.div variants={fadeUp}><span className="badge badge-teal">Job Portal</span></motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 20, marginBottom: 16 }}>
              Current <span className="teal-text">Overseas Openings</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>
              All positions are with verified international employers. Send CV via WhatsApp or Email to apply.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section">
        <div className="site-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="g-2">
            {jobs.map((job) => (
              <motion.div key={job.id} variants={fadeUp} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Card Header */}
                <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(15, 23, 42, 0.07)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <span className={`badge ${job.badgeClass}`} style={{ fontSize: '0.65rem' }}>{job.badge}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: '#334155' }}>
                      <MapPin style={{ width: 12, height: 12, color: '#14b8a6' }} /> {job.country}
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>{job.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#14b8a6', fontWeight: 600, fontSize: '0.85rem' }}>
                    <DollarSign style={{ width: 14, height: 14 }} /> {job.salary}
                  </div>
                  {job.note && <p style={{ fontSize: '0.75rem', color: '#d97706', marginTop: 6, fontStyle: 'italic' }}>{job.note}</p>}
                </div>

                {/* Card Body */}
                <div style={{ padding: '18px 22px' }}>
                  <div className="g-2" style={{ marginBottom: 16, gap: 10 }}>
                    {[
                      { label: 'Qualification', value: job.qualification },
                      { label: 'Age Range', value: job.age },
                      { label: 'Experience', value: job.experience },
                      { label: 'License', value: job.license },
                      ...(job.contract ? [{ label: 'Contract', value: job.contract }] : []),
                    ].map((d) => (
                      <div key={d.label}>
                        <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2, fontWeight: 600 }}>{d.label}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{d.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontWeight: 600 }}>Benefits</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {job.benefits.map((b) => (
                        <span key={b} className="tag-pill">
                          <CheckCircle style={{ width: 9, height: 9 }} /> {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="job-apply-row" style={{ display: 'flex', gap: 10 }}>
                    <a href="https://wa.me/923228341507" target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 0', borderRadius: 8, background: '#25d366', color: '#fff', fontWeight: 600, fontSize: '0.8rem' }}
                    >
                      <MessageCircle style={{ width: 14, height: 14 }} /> Apply via WhatsApp
                    </a>
                    <a href="mailto:oceanconnect0786@gmail.com"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 8, border: '1px solid rgba(15, 23, 42, 0.12)', color: '#64748b', fontSize: '0.8rem' }}
                    >
                      <Mail style={{ width: 14, height: 14 }} /> Email
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* How to Apply */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: 36, background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 12, padding: '22px 28px', textAlign: 'center' }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#14b8a6', marginBottom: 8 }}>How to Apply</div>
            <p style={{ fontSize: '0.8rem', color: '#334155', marginBottom: 12 }}>
              Send your CV and documents as a single PDF. Mention the position name.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
              <a href="https://wa.me/923228341507" style={{ fontSize: '0.8rem', color: '#14b8a6', fontWeight: 500 }}>WhatsApp: 0322-8341507</a>
              <a href="mailto:oceanconnect0786@gmail.com" style={{ fontSize: '0.8rem', color: '#14b8a6', fontWeight: 500 }}>oceanconnect0786@gmail.com</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
