'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

type FormData = { fullName: string; phone: string; email: string; subject: string; message: string; };

export default function ContactClient() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    const text = `*Ocean Connect Inquiry*\n\nName: ${data.fullName}\nPhone: ${data.phone}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage: ${data.message}`;
    window.open(`https://wa.me/923228341507?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true); reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactItems = [
    { icon: Phone, label: 'Phone', value: '0322-8341507', href: 'tel:+923228341507' },
    { icon: MessageCircle, label: 'WhatsApp', value: '0322-8341507', href: 'https://wa.me/923228341507', ext: true },
    { icon: Mail, label: 'Email', value: 'oceanconnect0786@gmail.com', href: 'mailto:oceanconnect0786@gmail.com' },
    { icon: MapPin, label: 'Office', value: 'Office No. 3, Grand Royal Hotel Building, Davis Road, Lahore', href: undefined },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9:00 AM – 6:00 PM', href: undefined },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-section section-alt">
        <div className="hero-grid" />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: 600 }}>
            <motion.div variants={fadeUp}><span className="badge badge-teal">Contact</span></motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginTop: 20, marginBottom: 16 }}>
              Get in Touch with <span className="teal-text">Ocean Connect</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>
              Candidate, employer, or training partner — we&apos;re ready to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          {/* Use split-2-lg which collapses to 1-col on mobile */}
          <div className="split-2-lg">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="section-label">Contact Details</div>
              <h2 className="heading-lg" style={{ marginBottom: 28 }}>Our Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0, background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: 15, height: 15, color: '#14b8a6' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                        {item.href ? (
                          <a href={item.href} target={(item as { ext?: boolean }).ext ? '_blank' : undefined}
                            rel={(item as { ext?: boolean }).ext ? 'noopener noreferrer' : undefined}
                            style={{ fontSize: '0.875rem', color: '#64748b', wordBreak: 'break-all' }}
                          >{item.value}</a>
                        ) : (
                          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{item.value}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Map */}
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(15, 23, 42, 0.09)', height: 180 }}>
                <iframe
                  src="https://maps.google.com/maps?q=Davis+Road+Lahore+Pakistan&output=embed"
                  width="100%" height="100%" loading="lazy" title="Ocean Connect Office"
                  style={{ filter: 'grayscale(0.6) brightness(0.7)', display: 'block' }}
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="section-label">Send a Message</div>
              <h2 className="heading-lg" style={{ marginBottom: 28 }}>Write to Us</h2>
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="g-2">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input {...register('fullName', { required: true })} placeholder="Your full name" className="form-input" />
                    {errors.fullName && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>Required</p>}
                  </div>
                  <div>
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input {...register('phone', { required: true })} placeholder="0300 0000000" className="form-input" />
                    {errors.phone && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>Required</p>}
                  </div>
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input {...register('email')} type="email" placeholder="your@email.com" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Subject *</label>
                  <select {...register('subject', { required: true })} className="form-input" defaultValue="">
                    <option value="" disabled>Select a subject</option>
                    <option value="Overseas Job Inquiry">Overseas Job Inquiry</option>
                    <option value="MicroDegree Enrollment">MicroDegree Enrollment</option>
                    <option value="Employer Partnership">Employer Partnership</option>
                    <option value="Training Program">Training Program</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.subject && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>Required</p>}
                </div>
                <div>
                  <label className="form-label">Message *</label>
                  <textarea {...register('message', { required: true })} rows={5} placeholder="Tell us how we can help..." className="form-input" style={{ resize: 'none' }} />
                  {errors.message && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>Required</p>}
                </div>
                {submitted && (
                  <div style={{ fontSize: '0.8rem', color: '#14b8a6', background: 'rgba(20,184,166,0.08)', padding: '10px 14px', borderRadius: 8 }}>
                    ✓ Opening WhatsApp with your message...
                  </div>
                )}
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', paddingTop: 14, paddingBottom: 14 }}>
                  <Send style={{ width: 14, height: 14 }} /> Send via WhatsApp
                </button>
                <p style={{ fontSize: '0.75rem', color: '#374151', textAlign: 'center' }}>Clicking submit opens WhatsApp with your message pre-filled.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
