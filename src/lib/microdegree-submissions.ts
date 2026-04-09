import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { getDbPool } from '@/lib/db';
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

const phoneRegex = /^[0-9+\-()\s]{10,20}$/;
const MINIMUM_AGE_YEARS = 10;

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

function latestAllowedDateOfBirth() {
  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);
  maxDate.setFullYear(maxDate.getFullYear() - MINIMUM_AGE_YEARS);
  return maxDate;
}

export const microdegreeSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(120),
  email: z.string().trim().email('Please enter a valid email address').max(160),
  phoneNumber: z.string().trim().regex(phoneRegex, 'Please enter a valid phone number'),
  whatsappNumber: z.string().trim().regex(phoneRegex, 'Please enter a valid WhatsApp number'),
  city: z.string().trim().min(2, 'City is required').max(100),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, 'Date of birth is required')
    .refine((value) => parseIsoDateInput(value) !== null, 'Please enter a valid date of birth')
    .refine((value) => {
      const parsed = parseIsoDateInput(value);
      if (!parsed) return false;
      return parsed <= latestAllowedDateOfBirth();
    }, `Applicant must be at least ${MINIMUM_AGE_YEARS} years old`),
  currentQualification: z.enum(qualificationOptions),
  studyOrWorkStatus: z.enum(studyWorkOptions),
  englishLearningAbility: z.enum(englishLevelOptions),
  computerSkills: z.enum(computerSkillOptions),
  primaryCareerGoal: z.enum(careerGoalOptions),
  microdegreeCourse: z.enum(microdegreeCourseOptions),
  feeInstallment: z.enum(feeInstallmentOptions),
  startTimeline: z.enum(startTimelineOptions),
  microsoftProgramUnderstanding: z.enum(understandingOptions),
});

let tableReady = false;

async function ensureTable() {
  if (tableReady) return;

  const db = getDbPool();

  await db.query(`
    CREATE TABLE IF NOT EXISTS microdegree_submissions (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      phone_number VARCHAR(25) NOT NULL,
      whatsapp_number VARCHAR(25) NOT NULL,
      city VARCHAR(100) NOT NULL,
      date_of_birth DATE NOT NULL,
      current_qualification VARCHAR(64) NOT NULL,
      study_or_work_status VARCHAR(64) NOT NULL,
      english_learning_ability VARCHAR(64) NOT NULL,
      computer_skills VARCHAR(80) NOT NULL,
      primary_career_goal VARCHAR(80) NOT NULL,
      microdegree_course VARCHAR(120) NOT NULL,
      fee_installment VARCHAR(30) NOT NULL,
      start_timeline VARCHAR(40) NOT NULL,
      microsoft_program_understanding VARCHAR(50) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_microdegree_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  tableReady = true;
}

export async function createMicrodegreeSubmission(input: MicrodegreeSubmissionInput) {
  await ensureTable();
  const db = getDbPool();

  const [result] = await db.query<ResultSetHeader>(
    `
      INSERT INTO microdegree_submissions (
        full_name, email, phone_number, whatsapp_number, city, date_of_birth,
        current_qualification, study_or_work_status, english_learning_ability,
        computer_skills, primary_career_goal, microdegree_course, fee_installment,
        start_timeline, microsoft_program_understanding
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      input.fullName,
      input.email,
      input.phoneNumber,
      input.whatsappNumber,
      input.city,
      input.dateOfBirth,
      input.currentQualification,
      input.studyOrWorkStatus,
      input.englishLearningAbility,
      input.computerSkills,
      input.primaryCareerGoal,
      input.microdegreeCourse,
      input.feeInstallment,
      input.startTimeline,
      input.microsoftProgramUnderstanding,
    ],
  );

  return result.insertId;
}

export type MicrodegreeSubmissionRecord = RowDataPacket & {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  whatsapp_number: string;
  city: string;
  date_of_birth: string;
  current_qualification: string;
  study_or_work_status: string;
  english_learning_ability: string;
  computer_skills: string;
  primary_career_goal: string;
  microdegree_course: string;
  fee_installment: string;
  start_timeline: string;
  microsoft_program_understanding: string;
  created_at: string;
};

export async function listMicrodegreeSubmissions(limit = 200) {
  await ensureTable();
  const db = getDbPool();

  const [rows] = await db.query<MicrodegreeSubmissionRecord[]>(
    `
      SELECT *
      FROM microdegree_submissions
      ORDER BY created_at DESC
      LIMIT ?
    `,
    [limit],
  );

  return rows;
}
