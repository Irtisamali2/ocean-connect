export default function TermsPage() {
  return (
    <section className="section" style={{ paddingTop: 140 }}>
      <div className="site-container" style={{ maxWidth: 860 }}>
        <h1 className="heading-lg" style={{ marginBottom: 28 }}>Terms & Conditions</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: '0.9rem', lineHeight: 1.8 }}>
          <p>By using this website and our services, you agree to the following terms and conditions.</p>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Our Services</h2>
            <p>Ocean Connect provides overseas recruitment, Microsoft MicroDegree program enrollment support, and professional training services. All job offers facilitated by Ocean Connect are with verified, legal employers.</p>
          </section>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Candidate Responsibilities</h2>
            <p>Candidates are required to provide accurate and truthful information. Providing false documentation or misrepresentation may result in immediate termination of services.</p>
          </section>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Fees & Payments</h2>
            <p>All fees are communicated transparently before any service is rendered. Ocean Connect does not charge any hidden fees. Paid fees are non-refundable once services have been rendered.</p>
          </section>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Limitation of Liability</h2>
            <p>Ocean Connect acts as an intermediary between candidates and employers. We are not liable for any disputes arising between candidates and their respective employers after placement.</p>
          </section>

          <section>
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Contact</h2>
            <p>For any queries, contact: <a href="mailto:oceanconnect0786@gmail.com" style={{ color: '#14b8a6' }}>oceanconnect0786@gmail.com</a></p>
          </section>

          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Last Updated: April 2026</p>
        </div>
      </div>
    </section>
  );
}
