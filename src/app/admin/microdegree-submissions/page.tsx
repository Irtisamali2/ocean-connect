import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, isAdminSessionValid } from '@/lib/admin-auth';
import { listMicrodegreeSubmissions } from '@/lib/microdegree-submissions';

export const metadata: Metadata = {
  title: 'MicroDegree Submissions | Ocean Connect Admin',
};

export default async function MicrodegreeSubmissionsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValid(sessionToken)) {
    redirect('/admin/login?next=/admin/microdegree-submissions');
  }

  let submissions = await Promise.resolve([] as Awaited<ReturnType<typeof listMicrodegreeSubmissions>>);
  let dbError = '';

  try {
    submissions = await listMicrodegreeSubmissions();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load submissions';
    dbError = message;
  }

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="site-container" style={{ maxWidth: 1180 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, gap: 12, flexWrap: 'wrap' }}>
          <h1 className="heading-md" style={{ margin: 0 }}>MicroDegree Submissions</h1>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="/api/admin/microdegree-submissions/export" className="btn-primary" style={{ minWidth: 170, justifyContent: 'center' }}>
              Export CSV (Excel)
            </a>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="btn-outline">Logout</button>
            </form>
          </div>
        </div>

        {dbError ? (
          <div className="card" style={{ borderColor: 'rgba(239,68,68,0.25)', background: '#fff7f7', marginBottom: 16 }}>
            <h2 className="heading-md" style={{ marginTop: 0, marginBottom: 8 }}>Database configuration required</h2>
            <p style={{ margin: 0, color: '#7f1d1d', fontSize: '0.95rem' }}>
              {dbError}. Set <strong>DATABASE_URL</strong> (or <strong>MYSQL_URL</strong>) in your environment and restart the server.
            </p>
          </div>
        ) : null}

        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1900 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {[
                  'Date',
                  'Name',
                  'Email',
                  'Phone',
                  'WhatsApp',
                  'City',
                  'DOB',
                  'Qualification',
                  'Study/Work',
                  'English',
                  'Computer Skills',
                  'Course',
                  'Installment',
                  'Goal',
                  'Timeline',
                  'Program Understanding',
                ].map((head) => (
                  <th key={head} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.78rem', color: '#334155', borderBottom: '1px solid rgba(15,23,42,0.09)' }}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.full_name}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.email}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.phone_number}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.whatsapp_number}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.city}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.date_of_birth}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.current_qualification}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.study_or_work_status}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.english_learning_ability}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.computer_skills}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.microdegree_course}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.fee_installment}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.primary_career_goal}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.start_timeline}</td>
                  <td style={{ padding: '10px 12px', fontSize: '0.8rem', borderBottom: '1px solid rgba(15,23,42,0.07)' }}>{item.microsoft_program_understanding}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!dbError && !submissions.length ? (
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: 16 }}>No submissions yet.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
