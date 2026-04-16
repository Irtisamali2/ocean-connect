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

    let emailWarning = '';
    let emailSent = false;

    try {
      await Promise.race([
        sendMicrodegreeSubmissionEmails(parsed.data, insertId),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Email delivery timed out')), 12000);
        }),
      ]);
      emailSent = true;
    } catch (emailError) {
      emailWarning = emailError instanceof Error ? emailError.message : 'Failed to send notification emails';
      console.error('[microdegree-email] delivery warning', {
        submissionId: insertId,
        applicantEmail: parsed.data.email,
        warning: emailWarning,
      });
    }

    return NextResponse.json({ ok: true, id: insertId, emailSent, emailWarning });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit form';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
