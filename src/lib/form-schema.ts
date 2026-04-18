import { z } from 'zod/v4';

// ─── Demographics ───
export const demographicsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleInitial: z.string().max(1).optional(),
  dob: z.string().min(1, 'Date of birth is required'),
  age: z.string().optional(),
  sex: z.enum(['Male', 'Female', 'Other']).optional(),
  race: z.string().optional(),
  occupation: z.string().optional(),
  socialSecurityNumber: z.string().optional(),
  phone: z.string().min(1, 'Phone number is required'),
  altPhone: z.string().optional(),
  email: z.string().email('Valid email is required').or(z.string().min(1, 'Email is required')),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'ZIP code is required'),
  }),
});

// ─── Emergency Contact ───
export const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Emergency contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().min(1, 'Phone is required'),
  altPhone: z.string().optional(),
});

// ─── Responsible Party (if different) ───
export const responsiblePartySchema = z.object({
  name: z.string().optional(),
  dob: z.string().optional(),
  sex: z.enum(['Male', 'Female', 'Other']).optional(),
  ssn: z.string().optional(),
  relationship: z.string().optional(),
  phone: z.string().optional(),
  employer: z.string().optional(),
  employerPhone: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
  }).optional(),
});

// ─── Insurance ───
export const insuranceSchema = z.object({
  primary: z.object({
    insurer: z.string().min(1, 'Insurance company is required'),
    idNumber: z.string().min(1, 'ID number is required'),
    groupNumber: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    holder: z.object({
      name: z.string().optional(),
      dob: z.string().optional(),
      sex: z.enum(['Male', 'Female', 'Other']).optional(),
      ssn: z.string().optional(),
      relationship: z.string().optional(),
      phone: z.string().optional(),
      employer: z.string().optional(),
      employerPhone: z.string().optional(),
    }).optional(),
  }),
  secondary: z.object({
    insurer: z.string().optional(),
    idNumber: z.string().optional(),
    groupNumber: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    holder: z.object({
      name: z.string().optional(),
      dob: z.string().optional(),
      sex: z.enum(['Male', 'Female', 'Other']).optional(),
      ssn: z.string().optional(),
      relationship: z.string().optional(),
      phone: z.string().optional(),
      employer: z.string().optional(),
      employerPhone: z.string().optional(),
    }).optional(),
  }).optional(),
});

// ─── Physician Info ───
export const physicianInfoSchema = z.object({
  referringPhysician: z.string().optional(),
  referringPhysicianPhone: z.string().optional(),
  primaryCarePhysician: z.string().optional(),
  primaryCarePhysicianPhone: z.string().optional(),
  howDidYouHearAboutUs: z.string().optional(),
});

// ─── Chief Complaint ───
export const chiefComplaintSchema = z.object({
  reasonForVisit: z.string().min(1, 'Reason for visit is required'),
  pharmacy: z.string().optional(),
  pharmacyAddress: z.string().optional(),
  pharmacyPhone: z.string().optional(),
});

// ─── Review of Systems ───
const rosCategory = (symptoms: string[]) =>
  z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum(symptoms as [string, ...string[]])).optional(),
  });

export const rosSchema = z.object({
  constitutional: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Fatigue', 'Fever', 'Chills', 'Weight Gain', 'Weight Loss', 'Loss of Appetite',
    ])).optional(),
  }),
  eyes: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Itching', 'Redness', 'Tearing', 'Crusting of eyelids', 'Circles around eyes',
      'Light sensitivity', 'Pain', 'Decreased vision',
    ])).optional(),
  }),
  ears: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Itching', 'Popping', 'Congestion', 'Pain', 'Discharge', 'Wax', 'Cerumen',
      'Hearing loss', 'Ringing', 'Vertigo',
    ])).optional(),
  }),
  nose: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Itching', 'Sneezing', 'Runny nose', 'Congestion', 'Bleeding',
      'Sinus pain/pressure', 'Decreased sense of smell',
    ])).optional(),
  }),
  mouth: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Itching', 'Swelling of lips/tongue', 'Cold sores', 'Bad breath', 'Mouth breathing',
    ])).optional(),
  }),
  throat: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Itching', 'Post-nasal drip', 'Throat clearing', 'Sore/dry throat',
      'Throat swelling', 'Hoarseness', 'Difficulty swallowing',
    ])).optional(),
  }),
  cardiovascular: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Chest pain/pressure', 'Radiation of pain', 'Profuse sweating',
      'Palpitations/Irregular rhythm', 'Heart murmur',
    ])).optional(),
  }),
  respiratory: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Cough', 'Sputum', 'Shortness of breath', 'Chest pain/tightness',
      'Wheezing', 'Exercise intolerance',
    ])).optional(),
  }),
  gastrointestinal: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Bloating',
      'Abdominal pain', 'Reflux',
    ])).optional(),
  }),
  genitourinary: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Urgency', 'Frequency', 'Painful urination', 'Blood in urine',
      'Pregnant/Planning to be',
    ])).optional(),
  }),
  musculoskeletal: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Joint pain', 'Muscle aches/pain', 'Weakness', 'Leg swelling', 'Leg cramps', 'Arthritis',
    ])).optional(),
  }),
  skin: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Itching', 'Flushing', 'Rash', 'Hives', 'Swelling', 'Eczema',
    ])).optional(),
  }),
  neurological: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Headache', 'Tingling', 'Numbness', 'Weakness', 'Imbalance',
      'Seizures', 'Memory loss', 'Dementia',
    ])).optional(),
  }),
  psychiatric: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Anxiety', 'Panic attacks', 'Depression', 'PTSD', 'ADD/ADHD',
      'Substance dependence', 'Hallucinations',
    ])).optional(),
  }),
  endocrine: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Cold/heat intolerance', 'Goiter', 'Increased thirst',
      'Frequent urination', 'Diabetes', 'Thyroid disorder',
    ])).optional(),
  }),
  hematologic: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Anemia', 'Bleeding disorder', 'Easy bruisability', 'Swollen lymph nodes',
    ])).optional(),
  }),
  allergicImmunologic: z.object({
    none: z.boolean().optional(),
    selected: z.array(z.enum([
      'Frequent infections', 'Food reactions', 'Insect sting reactions', 'Drug reactions',
    ])).optional(),
  }),
});

// ─── Past Medical History ───
export const PAST_MEDICAL_CONDITIONS = [
  'ADD/ADHD', 'Anaphylaxis', 'Anemia', 'Angioedema/Swelling', 'Arthritis', 'Asthma',
  'Autism', 'Bipolar disorder', 'Cancer', 'Contact dermatitis', 'COPD', 'Cystic Fibrosis',
  'Depression', 'Diabetes', 'Eczema', 'GERD (Heartburn/Reflux)', 'Glaucoma', 'Hay fever',
  'Heart disease', 'Hepatitis', 'HIV/AIDS', 'Hives', 'Hypertension', 'Hypothyroidism',
  'Hyperthyroidism', 'Immunodeficiency', 'Kidney disease', 'Migraine', 'Nasal polyps',
  'Osteoporosis/Osteopenia', 'Pneumonia', 'Recurrent infections', 'Sinusitis', 'Stroke',
  'Substance abuse', 'Tuberculosis', 'High cholesterol',
] as const;

export const pastMedicalHistorySchema = z.object({
  none: z.boolean().optional(),
  conditions: z.array(z.enum(PAST_MEDICAL_CONDITIONS)).optional(),
  other1: z.string().optional(),
  other2: z.string().optional(),
  other3: z.string().optional(),
});

// ─── Past Surgical History ───
export const pastSurgicalHistorySchema = z.object({
  none: z.boolean().optional(),
  surgeries: z.string().optional(),
});

// ─── Family History ───
export const FAMILY_CONDITIONS = [
  'Hay fever', 'Asthma', 'Food allergies', 'Medication allergies', 'Angioedema/Swelling',
  'Eczema', 'Immunodeficiency', 'Sinus disease', 'Thyroid disease', 'COPD', 'Diabetes',
  'Heart disease', 'Stroke', 'Auto-immune disorder', 'Cancer', 'Hypertension',
  'Cystic fibrosis', 'Other',
] as const;

export const FAMILY_RELATIVES = ['Mom', 'Dad', 'Brother', 'Sister', 'Son', 'Daughter', 'Grandparent'] as const;

export const familyHistorySchema = z.object({
  none: z.boolean().optional(),
  conditions: z.array(
    z.object({
      condition: z.enum(FAMILY_CONDITIONS),
      relatives: z.array(z.enum(FAMILY_RELATIVES)).optional(),
    })
  ).optional(),
  otherDetail: z.string().optional(),
});

// ─── Social/Environmental History ───
export const socialHistorySchema = z.object({
  placeOfBirth: z.string().optional(),
  whereRaised: z.string().optional(),
  movedToNorthTexas: z.string().optional(),
  hasChildren: z.enum(['Yes', 'No']).optional(),
  childrenDetails: z.string().optional(),
  drinksAlcohol: z.enum(['Yes', 'No']).optional(),
  alcoholDetails: z.string().optional(),
  currentlySmokes: z.enum(['Yes', 'No']).optional(),
  currentSmokingDetails: z.string().optional(),
  everSmoked: z.enum(['Yes', 'No']).optional(),
  pastSmokingDetails: z.string().optional(),
  quitDate: z.string().optional(),
  illicitDrugUse: z.enum(['Yes', 'No']).optional(),
  illicitDrugDetails: z.string().optional(),
  homeType: z.enum(['House', 'Apartment', 'Condominium', 'Ranch', 'Mobile home', 'Other']).optional(),
  waterDamage: z.enum(['Yes', 'No']).optional(),
  visibleMold: z.enum(['Yes', 'No']).optional(),
  flooringType: z.enum(['Carpet', 'Hardwood', 'Tile', 'Vinyl', 'Other']).optional(),
  acType: z.enum(['Central', 'Window', 'Fans', 'None']).optional(),
  heatingType: z.enum(['Gas', 'Electric', 'Wood burning', 'Radiators', 'Space heaters', 'Other']).optional(),
  indoorPlants: z.enum(['Yes', 'No']).optional(),
  mattressType: z.enum(['Regular', 'Foam', 'Water', 'Air', 'Other']).optional(),
  pillowType: z.enum(['Foam', 'Feather', 'Down', 'Kapok', 'Synthetic', 'Other']).optional(),
  allergyCovers: z.enum(['Yes', 'No']).optional(),
  hasPets: z.enum(['Yes', 'No']).optional(),
  petDetails: z.string().optional(),
  environmentalIssues: z.string().optional(),
  // Pediatric
  deliveryType: z.enum(['Normal', 'C-section']).optional(),
  termType: z.enum(['Normal term', 'Pre-term']).optional(),
  birthHealthIssues: z.enum(['No', 'Yes']).optional(),
  birthHealthDetails: z.string().optional(),
});

// ─── Current Medications ───
export const medicationEntrySchema = z.object({
  medication: z.string(),
  strength: z.string().optional(),
  frequency: z.string().optional(),
  reason: z.string().optional(),
});

export const medicationsSchema = z.object({
  none: z.boolean().optional(),
  medications: z.array(medicationEntrySchema).optional(),
});

// ─── Allergies ───
export const allergiesSchema = z.object({
  medications: z.string().optional(),
  medicationReaction: z.string().optional(),
  foodAllergens: z.array(z.enum([
    'Milk', 'Eggs', 'Peanut', 'Tree Nuts', 'Fish', 'Shellfish', 'Wheat', 'Soy',
  ])).optional(),
  foodOther: z.string().optional(),
  foodReaction: z.string().optional(),
  insectStings: z.array(z.enum([
    'Fire Ant', 'Honey Bee', 'Wasp', 'Yellow Jacket', 'Hornet',
  ])).optional(),
  insectOther: z.string().optional(),
  insectReaction: z.string().optional(),
  latex: z.enum(['Yes', 'No']).optional(),
  latexReaction: z.string().optional(),
});

// ─── Previous Allergy Evaluation ───
export const previousEvaluationSchema = z.object({
  hadEvaluation: z.enum(['Yes', 'No']).optional(),
  allergistName: z.string().optional(),
  allergistPhone: z.string().optional(),
  hadAllergyTesting: z.enum(['Yes', 'No']).optional(),
  testingDate: z.string().optional(),
  positiveTests: z.string().optional(),
  hadAllergyShots: z.enum(['Yes', 'No']).optional(),
  shotsDetails: z.string().optional(),
  benefitedFromShots: z.string().optional(),
  shotReactions: z.string().optional(),
});

// ─── Consent ───
export const consentSchema = z.object({
  treatmentConsent: z.literal(true, { message: 'Required' }),
  insuranceAuthorization: z.literal(true, { message: 'Required' }),
  delinquentAccounts: z.literal(true, { message: 'Required' }),
  medicalRecords: z.literal(true, { message: 'Required' }),
  communicationAuthorization: z.literal(true, { message: 'Required' }),
  officePolicies: z.literal(true, { message: 'Required' }),
  hipaaAcknowledgment: z.literal(true, { message: 'Required' }),
  signatureName: z.string().min(1, 'Signature is required'),
  signatureDate: z.string().min(1, 'Date is required'),
  printName: z.string().min(1, 'Printed name is required'),
  relationship: z.string().optional(),
});

// ─── Full Form Schema ───
export const newPatientFormSchema = z.object({
  visitType: z.literal('new').default('new'),
  demographics: demographicsSchema,
  emergencyContact: emergencyContactSchema,
  responsibleParty: responsiblePartySchema.optional(),
  insurance: insuranceSchema,
  physicianInfo: physicianInfoSchema.optional(),
  chiefComplaint: chiefComplaintSchema,
  reviewOfSystems: rosSchema,
  pastMedicalHistory: pastMedicalHistorySchema,
  pastSurgicalHistory: pastSurgicalHistorySchema,
  familyHistory: familyHistorySchema,
  socialHistory: socialHistorySchema,
  medications: medicationsSchema,
  allergies: allergiesSchema,
  previousEvaluation: previousEvaluationSchema,
  consent: consentSchema,
});

export const followUpFormSchema = z.object({
  visitType: z.literal('followup').default('followup'),
  patientName: z.string().min(1, 'Patient name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  email: z.string().email().optional(),
  address: z.string().optional(),
  insuranceInfo: z.string().optional(),
  chiefComplaint: chiefComplaintSchema,
  reviewOfSystems: rosSchema,
  medicationChanges: z.string().optional(),
  noHistoryChanges: z.boolean().optional(),
  historyChanges: z.string().optional(),
  noSocialChanges: z.boolean().optional(),
  socialChanges: z.string().optional(),
  medicationAllergies: z.string().optional(),
});

export type NewPatientFormData = z.infer<typeof newPatientFormSchema>;
export type FollowUpFormData = z.infer<typeof followUpFormSchema>;
export type FormData = NewPatientFormData | FollowUpFormData;