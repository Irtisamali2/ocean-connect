'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Download, GraduationCap, PlayCircle, ShieldCheck, Sparkles, X } from 'lucide-react';
import {
  careerGoalOptions,
  computerSkillOptions,
  englishLevelOptions,
  feeInstallmentOptions,
  microdegreeCourseOptions,
  qualificationOptions,
  startTimelineOptions,
  studyWorkOptions,
  understandingOptions,
  type MicrodegreeSubmissionInput,
} from '@/lib/microdegree-form';
import { contactInfo } from '@/lib/contact-info';

type FormErrors = Partial<Record<keyof MicrodegreeSubmissionInput, string>>;

type StepField = keyof MicrodegreeSubmissionInput;

const MINIMUM_AGE_YEARS = 10;

const initialForm: MicrodegreeSubmissionInput = {
  fullName: '',
  email: '',
  phoneNumber: '',
  whatsappNumber: '',
  city: '',
  dateOfBirth: '',
  currentQualification: qualificationOptions[0],
  studyOrWorkStatus: studyWorkOptions[0],
  englishLearningAbility: englishLevelOptions[0],
  computerSkills: computerSkillOptions[0],
  primaryCareerGoal: careerGoalOptions[0],
  microdegreeCourse: microdegreeCourseOptions[0],
  feeInstallment: feeInstallmentOptions[0],
  startTimeline: startTimelineOptions[0],
  microsoftProgramUnderstanding: understandingOptions[0],
};

const stepFields: StepField[][] = [
  ['fullName', 'email', 'phoneNumber', 'whatsappNumber', 'city'],
  ['dateOfBirth', 'currentQualification', 'studyOrWorkStatus', 'englishLearningAbility'],
  ['computerSkills', 'primaryCareerGoal', 'microdegreeCourse', 'feeInstallment'],
  ['startTimeline', 'microsoftProgramUnderstanding'],
];

const courseCards = [
  {
    title: 'Cloud & Cybersecurity',
    price: 'PKR 149,000',
    tag: 'Most in-demand for global jobs',
    image: '/microdegree/courses/cloud-cybersecurity.svg',
    formValue: 'Cloud & Cybersecurity (PKR 149,000/-)' as const,
    brochureLink:
      'https://microdegree.hazzainstitute.org/wp-content/uploads/2025/11/1.-Hazza_Cloud-Cybersecurity-Brochure-1.pdf?_gl=1*67wj3w*_gcl_au*MjEyMjYwODQ2NS4xNzc1NTY0MjYyLjM4ODk4NjUwNy4xNzc1NzMzNjM3LjE3NzU3MzM2Mzc.',
  },
  {
    title: 'Power Platform',
    price: 'PKR 119,600',
    tag: 'Low-code productivity path',
    image: '/microdegree/courses/power-platform.svg',
    formValue: 'Power Platform (PKR 119,600/-)' as const,
    brochureLink:
      'https://microdegree.hazzainstitute.org/wp-content/uploads/2025/11/2.-Hazza_Power-Platform-Brochure.pdf?_gl=1*67wj3w*_gcl_au*MjEyMjYwODQ2NS4xNzc1NTY0MjYyLjM4ODk4NjUwNy4xNzc1NzMzNjM3LjE3NzU3MzM2Mzc.',
  },
  {
    title: 'AI Developer',
    price: 'PKR 139,000',
    tag: 'Build and deploy AI apps',
    image: '/microdegree/courses/ai-developer.svg',
    formValue: 'AI Developer (PKR 139,000/-)' as const,
    brochureLink:
      'https://microdegree.hazzainstitute.org/wp-content/uploads/2025/11/3.-Hazza_AI-Developer-Brochure.pdf?_gl=1*67wj3w*_gcl_au*MjEyMjYwODQ2NS4xNzc1NTY0MjYyLjM4ODk4NjUwNy4xNzc1NzMzNjM3LjE3NzU3MzM2Mzc.',
  },
  {
    title: 'Data Engineer',
    price: 'PKR 124,600',
    tag: 'Pipelines and cloud data systems',
    image: '/microdegree/courses/data-engineer.svg',
    formValue: 'Data Engineer (PKR 124,600/-)' as const,
    brochureLink:
      'https://microdegree.hazzainstitute.org/wp-content/uploads/2025/11/4.-Hazza__Data-Engineering-Brochure.pdf?_gl=1*67wj3w*_gcl_au*MjEyMjYwODQ2NS4xNzc1NTY0MjYyLjM4ODk4NjUwNy4xNzc1NzMzNjM3LjE3NzU3MzM2Mzc.',
  },
  {
    title: 'Data Analyst',
    price: 'PKR 124,600',
    tag: 'Business intelligence and reporting',
    image: '/microdegree/courses/data-analyst.svg',
    formValue: 'Data Analyst (PKR 124,600/-)' as const,
    brochureLink:
      'https://microdegree.hazzainstitute.org/wp-content/uploads/2025/11/5.-Hazza_Data-Analyst-Brochure.pdf?_gl=1*67wj3w*_gcl_au*MjEyMjYwODQ2NS4xNzc1NTY0MjYyLjM4ODk4NjUwNy4xNzc1NzMzNjM3LjE3NzU3MzM2Mzc.',
  },
];

const videoTestimonials = [
  {
    title: 'Graduate Story 1',
    youtubeUrl: 'https://www.youtube.com/watch?v=hkZod1SQeZg',
    imageUrl: 'https://hazzainstitute.org/wp-content/uploads/2025/11/maxresdefault.jpg',
  },
  {
    title: 'Graduate Story 2',
    youtubeUrl: 'https://youtu.be/0pk-DcQDDyU?si=1fxSbJMTH4b_-4De',
    imageUrl: 'https://hazzainstitute.org/wp-content/uploads/2025/11/maxresdefault-1.jpg',
  },
  {
    title: 'Graduate Story 3',
    youtubeUrl: 'https://youtu.be/uwmOD5bClv4?si=x2jOHVByJTkpUcdD',
    imageUrl: 'https://hazzainstitute.org/wp-content/uploads/2025/11/maxresdefault-4.jpg',
  },
  {
    title: 'Graduate Story 4',
    youtubeUrl: 'https://youtu.be/inReVZ_As-o?si=9Hwj-oeMQgSQhzLI',
    imageUrl: 'https://hazzainstitute.org/wp-content/uploads/2025/11/maxresdefault-2.jpg',
  },
  {
    title: 'Graduate Story 5',
    youtubeUrl: 'https://youtu.be/r_N35tHKfUI?si=254ySraTB485PUfj',
    imageUrl: 'https://hazzainstitute.org/wp-content/uploads/2025/11/maxresdefault-3.jpg',
  },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
      {children}
    </label>
  );
}

function FieldWrap({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>;
}

function parseIsoDateInput(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  parsed.setHours(0, 0, 0, 0);
  return parsed;
}

function formatDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYoutubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    let videoId = '';

    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.replace('/', '');
    } else if (parsed.pathname.includes('/watch')) {
      videoId = parsed.searchParams.get('v') || '';
    } else if (parsed.pathname.includes('/shorts/')) {
      videoId = parsed.pathname.split('/shorts/')[1] || '';
    }

    if (!videoId) {
      return '';
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return '';
  }
}

export default function MicrodegreeClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<MicrodegreeSubmissionInput>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [videoStartIndex, setVideoStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<(typeof videoTestimonials)[number] | null>(null);

  const progress = useMemo(() => ((step + 1) / 4) * 100, [step]);
  const visibleVideos = useMemo(() => {
    return Array.from({ length: 3 }, (_, offset) => {
      const index = (videoStartIndex + offset) % videoTestimonials.length;
      return videoTestimonials[index];
    });
  }, [videoStartIndex]);
  const maxDateOfBirth = useMemo(() => {
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() - MINIMUM_AGE_YEARS);
    return formatDateInputValue(maxDate);
  }, []);

  function openForm(selectedCourse?: MicrodegreeSubmissionInput['microdegreeCourse']) {
    setSubmitError('');
    setSubmitSuccess('');
    if (selectedCourse) {
      setFormData((prev) => ({ ...prev, microdegreeCourse: selectedCourse }));
    }
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSubmitting) return;
    setIsFormOpen(false);
    setStep(0);
    setErrors({});
  }

  function updateField<K extends keyof MicrodegreeSubmissionInput>(key: K, value: MicrodegreeSubmissionInput[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateFields(fields: StepField[]) {
    const nextErrors: FormErrors = {};

    for (const field of fields) {
      const value = String(formData[field] || '').trim();
      if (!value) nextErrors[field] = 'This field is required';
    }

    if (fields.includes('fullName') && formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name';
    }

    if (fields.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (
      fields.includes('phoneNumber') &&
      !/^[0-9+\-()\s]{10,20}$/.test(formData.phoneNumber.trim())
    ) {
      nextErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (
      fields.includes('whatsappNumber') &&
      !/^[0-9+\-()\s]{10,20}$/.test(formData.whatsappNumber.trim())
    ) {
      nextErrors.whatsappNumber = 'Please enter a valid WhatsApp number';
    }

    if (fields.includes('dateOfBirth') && formData.dateOfBirth) {
      const selected = parseIsoDateInput(formData.dateOfBirth);
      const latestAllowedDate = parseIsoDateInput(maxDateOfBirth);

      if (!selected) {
        nextErrors.dateOfBirth = 'Please select a valid date of birth';
      } else if (!latestAllowedDate || selected > latestAllowedDate) {
        nextErrors.dateOfBirth = `Applicant must be at least ${MINIMUM_AGE_YEARS} years old`;
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (!validateFields(stepFields[step])) return;
    setStep((prev) => Math.min(prev + 1, 3));
  }

  function handlePrevious() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function showPreviousVideos() {
    setVideoStartIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
  }

  function showNextVideos() {
    setVideoStartIndex((prev) => (prev + 1) % videoTestimonials.length);
  }

  async function handleSubmit() {
    const allFieldsValid = validateFields(stepFields[3]) && validateFields(stepFields[2]) && validateFields(stepFields[1]) && validateFields(stepFields[0]);
    if (!allFieldsValid) return;

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('/api/microdegree-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string; emailWarning?: string; emailSent?: boolean };
      if (!response.ok || !data.ok) {
        setSubmitError(data.message || 'Unable to submit right now. Please try again.');
        return;
      }

      if (data.emailWarning) {
        setSubmitSuccess('Your form has been submitted successfully. Email delivery is delayed; our team will follow up shortly.');
      } else {
        setSubmitSuccess('Your form has been submitted successfully and confirmation emails have been sent.');
      }
      setFormData(initialForm);
      setStep(0);
      setErrors({});
    } catch (error) {
      const message = error instanceof Error && error.name === 'AbortError'
        ? 'Request timed out. Please try again in a few moments.'
        : 'Unable to submit right now. Please try again.';
      setSubmitError(message);
    } finally {
      clearTimeout(timeout);
      setIsSubmitting(false);
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    borderRadius: 8,
    border: '1px solid rgba(148, 163, 184, 0.35)',
    padding: '12px 14px',
    background: '#e2e8f0',
    color: '#0f172a',
    fontSize: '0.95rem',
  };

  return (
    <>
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 45%, #f8fafc 100%)' }}>
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="split-2-lg" style={{ alignItems: 'center' }}>
            <div>
              <span className="badge badge-teal">Microsoft MicroDegree Program</span>
              <h1 className="heading-xl" style={{ marginTop: 20, marginBottom: 18 }}>
                Your Fastest Pathway to a <span className="teal-text">Global Tech Career</span>
              </h1>
              <p style={{ fontSize: '1rem', color: '#475569', maxWidth: 580, marginBottom: 24 }}>
                Study job-ready Microsoft tracks with international recognition and practical outcomes. Built for students, professionals, and career switchers.
              </p>
              <div className="btn-row">
                <button type="button" className="btn-primary" onClick={() => openForm()}>
                  Apply Now <ArrowRight style={{ width: 15, height: 15 }} />
                </button>
                <a href="#courses" className="btn-outline">Explore Programs</a>
              </div>
              <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
                <div><strong style={{ color: '#0f172a' }}>85M+</strong> <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Global Opportunities</span></div>
                <div><strong style={{ color: '#0f172a' }}>9.7M+</strong> <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Tech Roles by 2030</span></div>
              </div>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d9488', fontWeight: 700, marginBottom: 12 }}>
                Authorized Partners
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  '/microdegree/04-KAMK.webp',
                  '/microdegree/05-Microsoft.webp',
                  '/microdegree/06-HAZZA.png',
                  '/microdegree/07-Edukamu.webp',
                ].map((src) => (
                  <div key={src} style={{ border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: 10, background: '#fff', padding: 10, minHeight: 78, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={src} alt="Program partner logo" style={{ maxWidth: '100%', maxHeight: 48, objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Why Choose This Program</div>
            <h2 className="heading-lg">A practical, placement-oriented learning track</h2>
          </div>
          <div className="g-3">
            {[
              { icon: ShieldCheck, title: 'Internationally trusted pathway', desc: 'Curriculum mapped to hiring demand and global role requirements.' },
              { icon: GraduationCap, title: 'Industry-ready skill tracks', desc: 'Choose the path that matches your profile and job goals.' },
              { icon: Sparkles, title: 'Guided support from start to finish', desc: 'Career guidance, enrollment support, and post-completion advising.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card">
                  <div className="card-icon"><Icon style={{ width: 20, height: 20, color: '#14b8a6' }} /></div>
                  <h3 className="heading-md" style={{ marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="courses" className="section" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%)' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 34 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Choose Your Track</div>
            <h2 className="heading-lg">MicroDegree Programs</h2>
          </div>
          <div className="g-3">
            {courseCards.map((course) => (
              <div key={course.title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 14 }}>
                <div
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid rgba(15,23,42,0.09)',
                    background: '#0f172a',
                    aspectRatio: '16 / 9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                  }}
                >
                  <img
                    src={course.image}
                    alt={`${course.title} course visual`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '2px 4px 8px' }}>
                  <div className="badge badge-teal" style={{ width: 'fit-content', marginBottom: 8 }}>{course.price}</div>
                  <h3 className="heading-md" style={{ marginBottom: 4 }}>{course.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 0 }}>{course.tag}</p>
                </div>
                <div className="micro-course-actions" style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <button type="button" className="btn-primary" onClick={() => openForm(course.formValue)} style={{ flex: 1, justifyContent: 'center', padding: '11px 16px' }}>
                    Apply for this track
                  </button>
                  <a
                    href={course.brochureLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ flex: 1, justifyContent: 'center', padding: '11px 16px' }}
                  >
                    <Download style={{ width: 14, height: 14 }} /> Download Brochure
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" style={{ paddingTop: 48 }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Success Stories</div>
            <h2 className="heading-lg" style={{ marginBottom: 8 }}>Video Testimonials</h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Hear directly from learners who completed the program.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
            <button type="button" className="btn-outline" onClick={showPreviousVideos} style={{ padding: '9px 12px' }} aria-label="Previous videos">
              <ChevronLeft style={{ width: 16, height: 16 }} />
            </button>
            <button type="button" className="btn-outline" onClick={showNextVideos} style={{ padding: '9px 12px' }} aria-label="Next videos">
              <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

          <div className="g-3">
            {visibleVideos.map((video) => (
              <button
                key={`${video.title}-${video.youtubeUrl}`}
                type="button"
                onClick={() => setActiveVideo(video)}
                className="card"
                style={{ padding: 10, position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(15,23,42,0.08)' }}
              >
                <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', background: '#0f172a' }}>
                  <img
                    src={video.imageUrl}
                    alt={`${video.title} thumbnail`}
                    style={{ display: 'block', width: '100%', aspectRatio: '3 / 4', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(15,23,42,0.05), rgba(15,23,42,0.32))' }}>
                    <PlayCircle style={{ width: 72, height: 72, color: '#ffffff' }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="site-container">
          <div className="card" style={{ background: 'linear-gradient(120deg, #e0f2fe 0%, #ecfeff 100%)', border: '1px solid rgba(20,184,166,0.2)' }}>
            <h2 className="heading-md" style={{ marginBottom: 12 }}>Application process in 4 simple steps</h2>
            <div className="g-4">
              {['Share your profile', 'Get counseling', 'Pick your track', 'Start your journey'].map((stepName, index) => (
                <div key={stepName}>
                  <div style={{ display: 'inline-flex', width: 28, height: 28, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: '#14b8a6', color: '#fff', fontWeight: 700, marginBottom: 8 }}>
                    {index + 1}
                  </div>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem' }}>{stepName}</p>
                </div>
              ))}
            </div>
            <button type="button" className="btn-primary" onClick={() => openForm()} style={{ marginTop: 20 }}>
              Start Application
            </button>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="site-container">
          <h2 className="heading-md" style={{ marginBottom: 14 }}>Frequently Asked Questions</h2>
          <div className="card" style={{ display: 'grid', gap: 12 }}>
            {[
              'How long does enrollment take? Usually 1-3 working days after complete profile submission.',
              'Can beginners apply? Yes, beginners can apply and pick tracks based on guidance.',
              'Is installment option available? Yes, one or two installment options are available in the form.',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <CheckCircle2 style={{ width: 16, height: 16, color: '#14b8a6', marginTop: 3, flexShrink: 0 }} />
                <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>{item}</p>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: 14, borderColor: 'rgba(20,184,166,0.2)', background: '#f0fdfa' }}>
            <h3 className="heading-md" style={{ marginTop: 0, marginBottom: 10 }}>Need help with enrollment?</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155' }}>
              WhatsApp: <a href={contactInfo.microdegree.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ color: '#0d9488', fontWeight: 700 }}>{contactInfo.microdegree.whatsappDisplay}</a> | Email: <a href={`mailto:${contactInfo.microdegree.email}`} style={{ color: '#0d9488', fontWeight: 700 }}>{contactInfo.microdegree.email}</a>
            </p>
          </div>
        </div>
      </section>

      {activeVideo ? (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.78)', zIndex: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            style={{ width: 'min(980px, 100%)', background: '#020617', borderRadius: 14, border: '1px solid rgba(148,163,184,0.25)', overflow: 'hidden', position: 'relative' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              style={{ position: 'absolute', top: 8, right: 8, width: 34, height: 34, borderRadius: 999, border: '1px solid rgba(226,232,240,0.35)', background: 'rgba(2,6,23,0.6)', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1 }}
              aria-label="Close video"
            >
              <X style={{ width: 18, height: 18 }} />
            </button>
            <iframe
              src={`${getYoutubeEmbedUrl(activeVideo.youtubeUrl)}?autoplay=1&rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', aspectRatio: '16 / 9', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      ) : null}

      {isFormOpen ? (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.62)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 14 }}>
          <div style={{ width: 'min(980px, 100%)', maxHeight: '95vh', overflowY: 'auto', borderRadius: 14, background: 'linear-gradient(90deg, #0f2ea8 0%, #0e75cf 100%)', padding: 20, position: 'relative' }}>
            <button
              type="button"
              onClick={closeForm}
              style={{ position: 'absolute', right: 16, top: 16, border: 'none', background: 'transparent', color: '#ffffff', cursor: 'pointer' }}
              aria-label="Close"
            >
              <X style={{ width: 24, height: 24 }} />
            </button>

            <h2 style={{ textAlign: 'center', color: '#ffffff', margin: '12px 0 20px', fontSize: '2rem' }}>SECURE YOUR SPOT NOW</h2>

            <div style={{ marginBottom: 18 }}>
              <div style={{ width: '100%', background: '#e2e8f0', borderRadius: 999, height: 30, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, transition: 'width 0.25s', background: '#16a34a', height: '100%', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 14, color: '#000', fontWeight: 700, fontSize: '1.05rem' }}>
                  {Math.round(progress)}%
                </div>
              </div>
            </div>

            <div className="micro-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {step === 0 ? (
                <>
                  <FieldWrap>
                    <FieldLabel>Full Name *</FieldLabel>
                    <input style={inputBase} placeholder="Full Name" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
                    {errors.fullName ? <span style={{ color: '#fecaca', fontSize: '0.8rem' }}>{errors.fullName}</span> : null}
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Email Address *</FieldLabel>
                    <input style={inputBase} placeholder="Email Address" type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
                    {errors.email ? <span style={{ color: '#fecaca', fontSize: '0.8rem' }}>{errors.email}</span> : null}
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Phone Number *</FieldLabel>
                    <input style={inputBase} placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => updateField('phoneNumber', e.target.value)} />
                    {errors.phoneNumber ? <span style={{ color: '#fecaca', fontSize: '0.8rem' }}>{errors.phoneNumber}</span> : null}
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>WhatsApp Number *</FieldLabel>
                    <input style={inputBase} placeholder="WhatsApp Number" value={formData.whatsappNumber} onChange={(e) => updateField('whatsappNumber', e.target.value)} />
                    {errors.whatsappNumber ? <span style={{ color: '#fecaca', fontSize: '0.8rem' }}>{errors.whatsappNumber}</span> : null}
                  </FieldWrap>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <FieldWrap>
                      <FieldLabel>City *</FieldLabel>
                      <input style={inputBase} placeholder="City" value={formData.city} onChange={(e) => updateField('city', e.target.value)} />
                      {errors.city ? <span style={{ color: '#fecaca', fontSize: '0.8rem' }}>{errors.city}</span> : null}
                    </FieldWrap>
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <FieldWrap>
                    <FieldLabel>Date of Birth *</FieldLabel>
                    <input
                      style={inputBase}
                      type="date"
                      max={maxDateOfBirth}
                      value={formData.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    />
                    {errors.dateOfBirth ? <span style={{ color: '#fecaca', fontSize: '0.8rem' }}>{errors.dateOfBirth}</span> : null}
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Current Qualification *</FieldLabel>
                    <select style={inputBase} value={formData.currentQualification} onChange={(e) => updateField('currentQualification', e.target.value as MicrodegreeSubmissionInput['currentQualification'])}>
                      {qualificationOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Are you currently studying or working? *</FieldLabel>
                    <select style={inputBase} value={formData.studyOrWorkStatus} onChange={(e) => updateField('studyOrWorkStatus', e.target.value as MicrodegreeSubmissionInput['studyOrWorkStatus'])}>
                      {studyWorkOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>English Learning Ability (Self Assessment) *</FieldLabel>
                    <select style={inputBase} value={formData.englishLearningAbility} onChange={(e) => updateField('englishLearningAbility', e.target.value as MicrodegreeSubmissionInput['englishLearningAbility'])}>
                      {englishLevelOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <FieldWrap>
                    <FieldLabel>Computer Skills *</FieldLabel>
                    <select style={inputBase} value={formData.computerSkills} onChange={(e) => updateField('computerSkills', e.target.value as MicrodegreeSubmissionInput['computerSkills'])}>
                      {computerSkillOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Your Primary Career Goal *</FieldLabel>
                    <select style={inputBase} value={formData.primaryCareerGoal} onChange={(e) => updateField('primaryCareerGoal', e.target.value as MicrodegreeSubmissionInput['primaryCareerGoal'])}>
                      {careerGoalOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Microdegree Course *</FieldLabel>
                    <select style={inputBase} value={formData.microdegreeCourse} onChange={(e) => updateField('microdegreeCourse', e.target.value as MicrodegreeSubmissionInput['microdegreeCourse'])}>
                      {microdegreeCourseOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Fee Installment *</FieldLabel>
                    <select style={inputBase} value={formData.feeInstallment} onChange={(e) => updateField('feeInstallment', e.target.value as MicrodegreeSubmissionInput['feeInstallment'])}>
                      {feeInstallmentOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <FieldWrap>
                    <FieldLabel>When are you planning to start the program? *</FieldLabel>
                    <select style={inputBase} value={formData.startTimeline} onChange={(e) => updateField('startTimeline', e.target.value as MicrodegreeSubmissionInput['startTimeline'])}>
                      {startTimelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                  <FieldWrap>
                    <FieldLabel>Do you understand the Microsoft Microdegree Program? *</FieldLabel>
                    <select style={inputBase} value={formData.microsoftProgramUnderstanding} onChange={(e) => updateField('microsoftProgramUnderstanding', e.target.value as MicrodegreeSubmissionInput['microsoftProgramUnderstanding'])}>
                      {understandingOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </FieldWrap>
                </>
              ) : null}
            </div>

            {submitError ? <p style={{ color: '#fecaca', marginTop: 14, fontSize: '0.9rem' }}>{submitError}</p> : null}
            {submitSuccess ? <p style={{ color: '#bbf7d0', marginTop: 14, fontSize: '0.9rem' }}>{submitSuccess}</p> : null}

            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              {step > 0 ? (
                <button type="button" onClick={handlePrevious} className="btn-outline" style={{ background: '#9ca3af', color: '#fff', borderColor: '#9ca3af', minWidth: 150, justifyContent: 'center' }}>
                  PREVIOUS
                </button>
              ) : null}

              {step < 3 ? (
                <button type="button" onClick={handleNext} className="btn-primary" style={{ minWidth: 150, justifyContent: 'center' }}>
                  NEXT
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="btn-primary" style={{ minWidth: 180, justifyContent: 'center', opacity: isSubmitting ? 0.85 : 1 }}>
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT FORM'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
