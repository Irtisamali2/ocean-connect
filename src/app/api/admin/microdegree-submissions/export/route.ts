import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, isAdminSessionValid } from '@/lib/admin-auth';
import { listMicrodegreeSubmissions } from '@/lib/microdegree-submissions';

function csvCell(value: string | number | null | undefined) {
  const normalized = value == null ? '' : String(value);
  const escaped = normalized.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValid(sessionToken)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }

  let records: Awaited<ReturnType<typeof listMicrodegreeSubmissions>> = [];

  try {
    records = await listMicrodegreeSubmissions(10000);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to export submissions';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }

  const header = [
    'id',
    'created_at',
    'full_name',
    'email',
    'phone_number',
    'whatsapp_number',
    'city',
    'date_of_birth',
    'current_qualification',
    'study_or_work_status',
    'english_learning_ability',
    'computer_skills',
    'primary_career_goal',
    'microdegree_course',
    'fee_installment',
    'start_timeline',
    'microsoft_program_understanding',
  ];

  const rows = records.map((item) => [
    item.id,
    item.created_at,
    item.full_name,
    item.email,
    item.phone_number,
    item.whatsapp_number,
    item.city,
    item.date_of_birth,
    item.current_qualification,
    item.study_or_work_status,
    item.english_learning_ability,
    item.computer_skills,
    item.primary_career_goal,
    item.microdegree_course,
    item.fee_installment,
    item.start_timeline,
    item.microsoft_program_understanding,
  ]);

  const csv = [
    header.map(csvCell).join(','),
    ...rows.map((row) => row.map((value) => csvCell(value as string | number)).join(',')),
  ].join('\n');

  const filename = `microdegree-submissions-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
