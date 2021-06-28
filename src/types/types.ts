/* -------------------------- Therapeutic Practices ------------------------- */
export const THERAPEUTIC_PRACTICES = [
    'Acceptance and Commitment Therapy',
    'Applied Behavior Analysis',
    'Assertive Community Treatment',
    'Behavioral Activation',
    'Cognitive Behavioral Therapy',
    'Dialectical Behavior Therapy',
    'Exposure Therapy',
    'Functional Family Therapy',
    'Interpersonal Therapy',
    'Motivational Interviewing',
    'Prolonged Exposure Therapy',
    'Compassion-Focused Therapy',
    'Other',
] as const;

export type TherapeuticPractice = typeof THERAPEUTIC_PRACTICES[number];

/* --------------------------- Years of Experience -------------------------- */
export const YEARS_OF_EXPERIENCE_OPTIONS = ['0 to 1', '1 to 4', '5 to 9', '10+'] as const;

export type YearsOfExperience = typeof YEARS_OF_EXPERIENCE_OPTIONS[number];

/* --------------------------- State and Residency -------------------------- */

export const STATES = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
] as const;

export type State = typeof STATES[number];

/* --------------------------- Race and Ethnicity --------------------------- */

export const RACE_OPTIONS = [
    'American Indian or Alaska Native',
    'Asian',
    'Black or African American',
    'Native Hawaiian or Other Pacific Islander',
    'White',
    'Hispanic, Latino, or of Spanish origin',
    'Other',
] as const;

export const RACE_PREFERENCE_OPTIONS = [
    'American Indian or Alaska Native',
    'Asian',
    'Black or African American',
    'Native Hawaiian or Other Pacific Islander',
    'White',
    'Hispanic, Latino, or of Spanish origin',
    'Other',
    "Don't Care",
] as const;

export type Race = typeof RACE_OPTIONS[number];
export type RacePreference = typeof RACE_PREFERENCE_OPTIONS[number];

/* -------------------------- Issues and Disorders -------------------------- */
export const ISSUE_OPTIONS = [
    'Addiction',
    'ADHD',
    'Anger',
    'Anxiety',
    'Bipolar Disorder',
    'Child or Adolescent Issues',
    'Depression',
    'Domestic Abuse',
    'Family Issues',
    'Gender or Sexual Identity',
    'LGBTQI Issues',
    'Life Transitions',
    "Men's Issues",
    'Pregnancy, Prenatal, or Postpartum Issues',
    'Racial Identity',
    'Racism or Microaggression',
    'Relationship or Marital Issues',
    'Self-Esteem',
    'Stress',
    'Suicidal Ideation',
    'Trauma or PTSD',
    "Women's Issues",
    'Other',
] as const;

export type Issue = typeof ISSUE_OPTIONS[number];
export type Specialty = Issue;

/* --------------- Insurance Providers and Accepted Insurances -------------- */

export const INSURANCE_OPTIONS = [
    "I don't have insurance",
    'Aetna',
    'Affinity Health Plan',
    'Alliance',
    'Amerigroup',
    'AmeriHealth',
    'Anthem',
    'Beacon',
    'Behavioral Health Systems',
    'Blue Care Network',
    'BlueCross Blue Shield',
    'CareFirst',
    'Ceridian',
    'Cigna',
    'Coventry',
    'EmblemHealth',
    'Fidelis',
    'Guardian',
    'Harvard Pilgrim',
    'HealthFirst',
    'Humana',
    'Kaiser',
    'Medicaid',
    'Medicare',
    'Meritian Health',
    'MetroPlus Health Plan',
    'Optum',
    'Oscar',
    'TRICARE',
    'UnitedHealthcare',
    'Other',
] as const;

export const ACCEPTED_INSURANCE_OPTIONS = [
    'Out of Network',
    'Aetna',
    'Affinity Health Plan',
    'Alliance',
    'Amerigroup',
    'AmeriHealth',
    'Anthem',
    'Beacon',
    'Behavioral Health Systems',
    'Blue Care Network',
    'BlueCross Blue Shield',
    'CareFirst',
    'Ceridian',
    'Cigna',
    'Coventry',
    'EmblemHealth',
    'Fidelis',
    'Guardian',
    'Harvard Pilgrim',
    'HealthFirst',
    'Humana',
    'Kaiser',
    'Medicaid',
    'Medicare',
    'Meritian Health',
    'MetroPlus Health Plan',
    'Optum',
    'Oscar',
    'TRICARE',
    'UnitedHealthcare',
    'Other',
] as const;

export type InsuranceProvider = typeof INSURANCE_OPTIONS[number];

export type AcceptedInsurance = typeof ACCEPTED_INSURANCE_OPTIONS[number];

/* --------------------------- Language Preference -------------------------- */

export const LANGUAGE_PREFERENCE_OPTIONS = ['English', 'French', 'Spanish', 'Other'] as const;

export type LanguagePreference = typeof LANGUAGE_PREFERENCE_OPTIONS[number];

/* --------------------------------- Gender --------------------------------- */
export const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary'] as const;

export type Gender = typeof GENDER_OPTIONS[number];

export const GENDER_PREFERENCE_OPTIONS = ['Male', 'Female', 'Non-Binary', "Don't Care"] as const;

export type GenderPreference = typeof GENDER_PREFERENCE_OPTIONS[number];

/* ------------------------------- Exclusions ------------------------------- */

/**
 * A provider may elect to be excluded from matching. The Exclusion Reason type defines
 * common reasons why a provider may choose to abstain from matching.
 */
export const EXCLUSION_REASON_OPTIONS = ['Unavailable', 'Over Capacity', 'Terminated', 'Other'];
export type ExclusionReason = typeof EXCLUSION_REASON_OPTIONS[number];
