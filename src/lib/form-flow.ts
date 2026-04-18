import { brand } from './brand';

export type VisitType = 'new' | 'followup';
export type FormStep = {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
};

const commonRosSteps: FormStep[] = [
  {
    id: 'ros-constitutional',
    title: 'Review of Systems — General',
    titleEs: 'Revisión de Sistemas — General',
    description: 'Check any symptoms you are experiencing',
    descriptionEs: 'Marque cualquier síntoma que esté experimentando',
  },
  {
    id: 'ros-head',
    title: 'Review of Systems — Eyes, Ears, Nose, Mouth & Throat',
    titleEs: 'Revisión de Sistemas — Ojos, Oídos, Nariz, Boca y Garganta',
    description: 'Check any symptoms related to your head and neck',
    descriptionEs: 'Marque cualquier síntoma relacionado con su cabeza y cuello',
  },
  {
    id: 'ros-body',
    title: 'Review of Systems — Body Systems',
    titleEs: 'Revisión de Sistemas — Sistemas del Cuerpo',
    description: 'Check any symptoms related to your body systems',
    descriptionEs: 'Marque cualquier síntoma relacionado con sus sistemas corporales',
  },
];

export const NEW_PATIENT_STEPS: FormStep[] = [
  {
    id: 'demographics',
    title: 'Patient Information',
    titleEs: 'Información del Paciente',
    description: 'Your basic contact information',
    descriptionEs: 'Su información básica de contacto',
  },
  {
    id: 'insurance',
    title: 'Insurance Information',
    titleEs: 'Información del Seguro',
    description: 'Primary and secondary insurance details',
    descriptionEs: 'Detalles del seguro primario y secundario',
  },
  {
    id: 'emergency-contact',
    title: 'Emergency Contact',
    titleEs: 'Contacto de Emergencia',
    description: 'Who we should contact in an emergency',
    descriptionEs: 'A quién debemos contactar en caso de emergencia',
  },
  {
    id: 'physician-info',
    title: 'Physician Information',
    titleEs: 'Información del Médico',
    description: 'Referring and primary care physician details',
    descriptionEs: 'Detalles del médico referente y de atención primaria',
  },
  {
    id: 'chief-complaint',
    title: 'Reason for Visit',
    titleEs: 'Motivo de la Consulta',
    description: 'What brings you in today?',
    descriptionEs: '¿Qué le trae hoy?',
  },
  ...commonRosSteps,
  {
    id: 'medical-history',
    title: 'Medical History',
    titleEs: 'Historial Médico',
    description: 'Past medical and surgical history',
    descriptionEs: 'Historial médico y quirúrgico anterior',
  },
  {
    id: 'family-history',
    title: 'Family History',
    titleEs: 'Historial Familiar',
    description: 'Conditions that run in your family',
    descriptionEs: 'Condiciones que existen en su familia',
  },
  {
    id: 'social-history',
    title: 'Social & Environmental History',
    titleEs: 'Historial Social y Ambiental',
    description: 'Your lifestyle and home environment',
    descriptionEs: 'Su estilo de vida y entorno hogareño',
  },
  {
    id: 'medications',
    title: 'Current Medications',
    titleEs: 'Medicamentos Actuales',
    description: 'List all medications you are currently taking',
    descriptionEs: 'Enumere todos los medicamentos que toma actualmente',
  },
  {
    id: 'allergies',
    title: 'Allergies',
    titleEs: 'Alergias',
    description: 'Medication, food, insect, and latex allergies',
    descriptionEs: 'Alergias a medicamentos, alimentos, insectos y látex',
  },
  {
    id: 'previous-evaluation',
    title: 'Previous Allergy Evaluation',
    titleEs: 'Evaluación de Alergia Anterior',
    description: 'Have you seen an allergist before?',
    descriptionEs: '¿Ha consultado a un alergólogo anteriormente?',
  },
  {
    id: 'review',
    title: 'Review Your Information',
    titleEs: 'Revise Su Información',
    description: 'Please review all information before submitting',
    descriptionEs: 'Por favor revise toda la información antes de enviar',
  },
  {
    id: 'consent',
    title: 'Consent & Signature',
    titleEs: 'Consentimiento y Firma',
    description: 'Read and agree to the required consents',
    descriptionEs: 'Lea y acepte los consentimientos requeridos',
  },
];

export const FOLLOW_UP_STEPS: FormStep[] = [
  {
    id: 'followup-info',
    title: 'Patient Information',
    titleEs: 'Información del Paciente',
    description: 'Your name, date of birth, and contact info',
    descriptionEs: 'Su nombre, fecha de nacimiento e información de contacto',
  },
  {
    id: 'chief-complaint',
    title: 'Reason for Visit',
    titleEs: 'Motivo de la Consulta',
    description: 'What brings you in today?',
    descriptionEs: '¿Qué le trae hoy?',
  },
  ...commonRosSteps,
  {
    id: 'followup-medication-changes',
    title: 'Medication Changes',
    titleEs: 'Cambios en Medicamentos',
    description: 'Any changes to your medications since last visit?',
    descriptionEs: '¿Algún cambio en sus medicamentos desde la última visita?',
  },
  {
    id: 'followup-history-changes',
    title: 'History Updates',
    titleEs: 'Actualizaciones del Historial',
    description: 'Any changes to your medical, surgical, family, or social history?',
    descriptionEs: '¿Algún cambio en su historial médico, quirúrgico, familiar o social?',
  },
  {
    id: 'followup-allergies',
    title: 'Medication Allergies',
    titleEs: 'Alergias a Medicamentos',
    description: 'Any new medication allergies?',
    descriptionEs: '¿Algún medicamento al que sea alérgico?',
  },
  {
    id: 'review',
    title: 'Review Your Information',
    titleEs: 'Revise Su Información',
    description: 'Please review all information before submitting',
    descriptionEs: 'Por favor revise toda la información antes de enviar',
  },
  {
    id: 'consent',
    title: 'Signature',
    titleEs: 'Firma',
    description: 'Sign to confirm your information is accurate',
    descriptionEs: 'Firme para confirmar que su información es correcta',
  },
];

export function getStepsForVisit(visitType: VisitType): FormStep[] {
  return visitType === 'new' ? NEW_PATIENT_STEPS : FOLLOW_UP_STEPS;
}