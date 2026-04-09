import type { Metadata } from 'next';
import AdminLoginForm from './AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin Login | Ocean Connect',
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next && params.next.startsWith('/') ? params.next : '/admin/microdegree-submissions';

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="site-container" style={{ maxWidth: 520 }}>
        <div className="card" style={{ padding: 28 }}>
          <h1 className="heading-md" style={{ marginBottom: 10 }}>Admin Login</h1>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 20 }}>
            Enter dashboard password to view microdegree submissions.
          </p>
          <AdminLoginForm nextPath={nextPath} />
        </div>
      </div>
    </section>
  );
}
