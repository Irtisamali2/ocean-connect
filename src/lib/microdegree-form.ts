export const qualificationOptions = [
  'Matriculation',
  'Intermediate',
  'Bachelor',
  'Masters',
] as const;

export const studyWorkOptions = [
  'Studying',
  'Working',
  'Fresh / Looking for opportunities',
] as const;

export const englishLevelOptions = [
  'Basic',
  'Intermediate',
  'Advanced',
] as const;

export const computerSkillOptions = [
  'Yes - I know basic computer use',
  'No - But I want to learn',
] as const;

export const careerGoalOptions = [
  'Job in Pakistan',
  'Remote job',
  'Study abroad',
  'Skill building',
  'Career switch into IT',
] as const;

export const microdegreeCourseOptions = [
  'Cloud & Cybersecurity (PKR 149,000/-)',
  'Power Platform (PKR 119,600/-)',
  'AI Developer (PKR 139,000/-)',
  'Data Engineer (PKR 124,600/-)',
  'Data Analyst (PKR 124,600/-)',
] as const;

export const feeInstallmentOptions = [
  'One installment',
  'Two installments',
] as const;

export const startTimelineOptions = [
  'Immediate',
  'Within 30 days',
  '2-3 months',
  'After discussion',
] as const;

export const understandingOptions = [
  'Yes',
  'Basic awareness',
  'Need more guidance',
  "Don't understand yet",
] as const;

export type MicrodegreeSubmissionInput = {
  fullName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  city: string;
  dateOfBirth: string;
  currentQualification: (typeof qualificationOptions)[number];
  studyOrWorkStatus: (typeof studyWorkOptions)[number];
  englishLearningAbility: (typeof englishLevelOptions)[number];
  computerSkills: (typeof computerSkillOptions)[number];
  primaryCareerGoal: (typeof careerGoalOptions)[number];
  microdegreeCourse: (typeof microdegreeCourseOptions)[number];
  feeInstallment: (typeof feeInstallmentOptions)[number];
  startTimeline: (typeof startTimelineOptions)[number];
  microsoftProgramUnderstanding: (typeof understandingOptions)[number];
};
