"use client";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES: Record<string, string[]> = {
  "Cardiovascular": ['Chest pain/pressure', 'Radiation of pain', 'Profuse sweating', 'Palpitations/Irregular rhythm', 'Heart murmur'],
  "Respiratory": ['Cough', 'Sputum', 'Shortness of breath', 'Chest pain/tightness', 'Wheezing', 'Exercise intolerance'],
  "Gastrointestinal": ['Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Bloating', 'Abdominal pain', 'Reflux'],
  "Genitourinary": ['Urgency', 'Frequency', 'Painful urination', 'Blood in urine', 'Pregnant/Planning to be'],
  "Musculoskeletal": ['Joint pain', 'Muscle aches/pain', 'Weakness', 'Leg swelling', 'Leg cramps', 'Arthritis'],
  "Skin": ['Itching', 'Flushing', 'Rash', 'Hives', 'Swelling', 'Eczema'],
  "Neurological": ['Headache', 'Tingling', 'Numbness', 'Weakness', 'Imbalance', 'Seizures', 'Memory loss', 'Dementia'],
  "Psychiatric": ['Anxiety', 'Panic attacks', 'Depression', 'PTSD', 'ADD/ADHD', 'Substance dependence', 'Hallucinations'],
  "Endocrine": ['Cold/heat intolerance', 'Goiter', 'Increased thirst', 'Frequent urination', 'Diabetes', 'Thyroid disorder'],
  "Hematologic/Lymphatic": ['Anemia', 'Bleeding disorder', 'Easy bruisability', 'Swollen lymph nodes'],
  "Allergic/Immunologic": ['Frequent infections', 'Food reactions', 'Insect sting reactions', 'Drug reactions'],
};

const CATEGORY_KEYS: Record<string, string> = {
  "Cardiovascular": "cardiovascular",
  "Respiratory": "respiratory",
  "Gastrointestinal": "gastrointestinal",
  "Genitourinary": "genitourinary",
  "Musculoskeletal": "musculoskeletal",
  "Skin": "skin",
  "Neurological": "neurological",
  "Psychiatric": "psychiatric",
  "Endocrine": "endocrine",
  "Hematologic/Lymphatic": "hematologic",
  "Allergic/Immunologic": "allergicImmunologic",
};

export default function RosBodyFields() {
  const { watch, setValue } = useFormContext();
  const ros = watch("reviewOfSystems") || {};

  const handleNoneToggle = (rosKey: string, checked: boolean) => {
    setValue(`reviewOfSystems.${rosKey}.selected`, []);
    setValue(`reviewOfSystems.${rosKey}.none`, checked);
  };

  const handleSymptomToggle = (rosKey: string, symptom: string, checked: boolean) => {
    const categoryData = (ros[rosKey as keyof typeof ros] as any) || {};
    const current = (categoryData.selected || []) as string[];
    if (checked) {
      setValue(`reviewOfSystems.${rosKey}.selected`, [...current, symptom]);
      setValue(`reviewOfSystems.${rosKey}.none`, false);
    } else {
      setValue(`reviewOfSystems.${rosKey}.selected`, current.filter((s:string) => s !== symptom));
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(CATEGORIES).map(([category, symptoms]) => {
        const rosKey = CATEGORY_KEYS[category];
        const categoryData = (ros[rosKey as keyof typeof ros] as any) || {};
        const selected = (categoryData.selected || []) as string[];
        const isNone = categoryData.none || false;

        return (
          <div key={category} className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">{category}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Checkbox
                id={`ros-${rosKey}-none`}
                checked={isNone}
                onCheckedChange={(checked) => handleNoneToggle(rosKey, !!checked)}
                className="border-primary"
              />
              <label htmlFor={`ros-${rosKey}-none`} className="text-sm font-medium cursor-pointer">None</label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {symptoms.map((symptom) => (
                <div key={`${rosKey}-${symptom}`} className="flex items-center gap-2">
                  <Checkbox
                    id={`ros-${rosKey}-${symptom.replace(/\s+/g, '-').replace(/\//g, '-')}`}
                    checked={selected.includes(symptom)}
                    onCheckedChange={(checked) => handleSymptomToggle(rosKey, symptom, !!checked)}
                    disabled={isNone}
                    className="border-primary"
                  />
                  <label htmlFor={`ros-${rosKey}-${symptom.replace(/\s+/g, '-').replace(/\//g, '-')}`} className="text-sm cursor-pointer">{symptom}</label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}