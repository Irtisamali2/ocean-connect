import nodemailer from 'nodemailer';
import type { MicrodegreeSubmissionInput } from '@/lib/microdegree-form';
import { contactInfo } from '@/lib/contact-info';

type MicrodegreeSmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
  notifyEmail: string;
};

type SendEmailsOptions = {
  applicantEmailOverride?: string;
  notifyEmailOverride?: string;
};

type EmailDeliveryResult = {
  applicantMessageId: string;
  adminMessageId: string;
};

function resolveSmtpConfig(): MicrodegreeSmtpConfig {
  const user = process.env.MICRODEGREE_SMTP_USERNAME || process.env.SMTP_USERNAME || '';
  const pass = process.env.MICRODEGREE_SMTP_PASSWORD || process.env.SMTP_PASSWORD || '';

  if (!user || !pass) {
    throw new Error('Missing SMTP credentials. Set MICRODEGREE_SMTP_USERNAME and MICRODEGREE_SMTP_PASSWORD');
  }

  return {
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    user,
    pass,
    fromEmail: process.env.MICRODEGREE_FROM_EMAIL || user,
    fromName: process.env.MICRODEGREE_FROM_NAME || 'MicroDegree Programs',
    notifyEmail: process.env.MICRODEGREE_NOTIFY_EMAIL || 'Microdegree@connectwithocean.com',
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applicantEmailHtml(fullName: string) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 720px; margin: 0 auto;">
      <p>Dear <strong>${escapeHtml(fullName)}</strong>,</p>

      <p>Thank you for registering for the <strong>Microsoft Skills for Jobs Microdegree Program</strong> at <strong>Hazza Institute of Technology</strong>. We have successfully received your submission.</p>

      <p>Welcome to the future of professional tech education - a joint initiative by <strong>Microsoft</strong>, in partnership with <strong>KAMK University Finland</strong>, leading <strong>EU universities</strong>, and global mentor tech companies.</p>

      <p>The Microsoft Microdegree Programs provide <strong>industry-recognized certifications</strong> in high-demand tech fields. These programs are designed to fast-track Pakistani talent into quality international and local tech careers, addressing the global IT skills shortage and offering pathways to EU universities.</p>

      <h3 style="margin-top: 26px; margin-bottom: 10px;">Microsoft Skills for Jobs Microdegree Program Fees</h3>
      <ul>
        <li><strong>Cloud &amp; Cybersecurity:</strong> PKR 149,000</li>
        <li><strong>Power Platform:</strong> PKR 119,600</li>
        <li><strong>AI Developer:</strong> PKR 139,600</li>
        <li><strong>Data Engineer:</strong> PKR 124,600</li>
        <li><strong>Data Analyst:</strong> PKR 124,600</li>
      </ul>

      <p>
        <strong>Download the Study Program Brochure:</strong><br />
        <a href="https://hazzainstitute.org/hazza-microdegree-program/" target="_blank" rel="noopener noreferrer">https://hazzainstitute.org/hazza-microdegree-program/</a>
      </p>

      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #cbd5e1;" />

      <h3 style="margin-top: 0; margin-bottom: 10px;">Next Steps: Microdegree Program Fee Payment</h3>
      <ol>
        <li>Register on the dashboard: <a href="https://hazzainstitute.org/dashboard" target="_blank" rel="noopener noreferrer">https://hazzainstitute.org/dashboard</a></li>
        <li>Submit your application for the <strong>Microsoft Microdegree Program</strong>.</li>
        <li>After submission, your application will be reviewed and approved.</li>
        <li>Once reviewed, you will receive an email and gain access to download your fee voucher.</li>
        <li><strong>Pay your fee using the One Bill option in any mobile banking app by entering the voucher PSID.</strong></li>
        <li>After payment, you will receive a confirmation email and your dashboard status will update automatically.</li>
        <li>You will then receive another email with all details and credentials required to access your course.</li>
      </ol>

      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #cbd5e1;" />

      <p>
        For any questions or assistance, feel free to contact us:<br />
        Email: <a href="mailto:${contactInfo.general.email}">${contactInfo.general.email}</a><br />
        Phone: <a href="tel:${contactInfo.microdegree.phoneHref.replace('tel:', '')}">${contactInfo.microdegree.phoneDisplay}</a>
      </p>

      <p>
        Best regards,<br />
        <strong>Ocean Connect</strong><br />
        <a href="https://connectwithocean.com" target="_blank" rel="noopener noreferrer">connectwithocean.com</a>
      </p>
    </div>
  `;
}

function adminEmailHtml(input: MicrodegreeSubmissionInput, submissionId: number | string) {
  const rows: Array<[string, string]> = [
    ['Submission ID', String(submissionId)],
    ['Full Name', input.fullName],
    ['Email', input.email],
    ['Phone Number', input.phoneNumber],
    ['WhatsApp Number', input.whatsappNumber],
    ['City', input.city],
    ['Date of Birth', input.dateOfBirth],
    ['Current Qualification', input.currentQualification],
    ['Study/Work Status', input.studyOrWorkStatus],
    ['English Learning Ability', input.englishLearningAbility],
    ['Computer Skills', input.computerSkills],
    ['Primary Career Goal', input.primaryCareerGoal],
    ['Microdegree Course', input.microdegreeCourse],
    ['Fee Installment', input.feeInstallment],
    ['Start Timeline', input.startTimeline],
    ['Program Understanding', input.microsoftProgramUnderstanding],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 10px;border:1px solid #cbd5e1;background:#f8fafc;font-weight:600;">${escapeHtml(label)}</td><td style="padding:8px 10px;border:1px solid #cbd5e1;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a; max-width: 860px; margin: 0 auto;">
      <h2 style="margin-bottom: 8px;">New Microdegree Form Submission</h2>
      <p style="margin-top: 0; color: #475569;">A new entry has been submitted on connectwithocean.com.</p>
      <table style="border-collapse: collapse; width: 100%; margin-top: 14px;">${tableRows}</table>
    </div>
  `;
}

async function sendWithRetry(
  send: () => Promise<{ messageId?: string }>,
  label: string,
  retries = 0,
) {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const result = await send();
      return result;
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
    }
  }

  const message = lastError instanceof Error ? lastError.message : `Unknown ${label} error`;
  throw new Error(`Unable to send ${label} email: ${message}`);
}

export async function sendMicrodegreeSubmissionEmails(
  input: MicrodegreeSubmissionInput,
  submissionId: number | string,
  options?: SendEmailsOptions,
): Promise<EmailDeliveryResult> {
  const cfg = resolveSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
  });

  const from = `${cfg.fromName} <${cfg.fromEmail}>`;
  const applicantRecipient = options?.applicantEmailOverride || input.email;
  const notifyRecipient = options?.notifyEmailOverride || cfg.notifyEmail;

  const applicantResponse = await sendWithRetry(
    () =>
      transporter.sendMail({
        from,
        to: applicantRecipient,
        subject: 'Microsoft Skills for Jobs Microdegree Program - Submission Received',
        html: applicantEmailHtml(input.fullName),
      }),
    'applicant',
  );

  const adminResponse = await sendWithRetry(
    () =>
      transporter.sendMail({
        from,
        to: notifyRecipient,
        subject: `New Microdegree Submission - ${input.fullName}`,
        html: adminEmailHtml(input, submissionId),
      }),
    'admin notification',
  );

  return {
    applicantMessageId: applicantResponse.messageId || '',
    adminMessageId: adminResponse.messageId || '',
  };
}
