import { NextResponse } from 'next/server';
import { createMicrodegreeSubmission, microdegreeSubmissionSchema } from '@/lib/microdegree-submissions';
import { sendMicrodegreeSubmissionEmails } from '@/lib/microdegree-email';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = microdegreeSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || 'Invalid form data';
      return NextResponse.json({ ok: false, message: firstIssue }, { status: 400 });
    }

    const insertId = await createMicrodegreeSubmission(parsed.data);

    try {
      const delivery = await sendMicrodegreeSubmissionEmails(parsed.data, insertId);
      return NextResponse.json({ ok: true, id: insertId, delivery });
    } catch (emailError) {
      const message = emailError instanceof Error ? emailError.message : 'Failed to send notification emails';
      return NextResponse.json(
        {
          ok: false,
          message: `Submission saved, but email delivery failed. ${message}`,
          saved: true,
          id: insertId,
        },
        { status: 502 },
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit form';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
