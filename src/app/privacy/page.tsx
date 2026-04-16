export default function PrivacyPage() {
  return (
    <section className="section" style={{ paddingTop: 140 }}>
      <div className="site-container" style={{ maxWidth: 860 }}>
        <h1 className="heading-lg" style={{ marginBottom: 28 }}>Privacy Policy</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: '0.9rem', lineHeight: 1.8 }}>
          <p>At Ocean Connect, we are committed to protecting your personal information and your right to privacy.</p>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide, including name, contact details, CV/resume, qualifications, and any other information submitted through our forms or WhatsApp inquiries.</p>
          </section>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>How We Use Your Information</h2>
            <p>Your information is used solely for the purpose of recruitment, job placement, training program enrollment, and communication related to our services. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction.</p>
          </section>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Contact</h2>
            <p>For privacy inquiries, contact us at: <a href="mailto:info@connectwithocean.com" style={{ color: '#14b8a6' }}>info@connectwithocean.com</a></p>
          </section>

          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Last Updated: April 2026</p>
        </div>
      </div>
    </section>
  );
}
