"use client";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = {
  "Eyes": ['Itching', 'Redness', 'Tearing', 'Crusting of eyelids', 'Circles around eyes', 'Light sensitivity', 'Pain', 'Decreased vision'],
  "Ears": ['Itching', 'Popping', 'Congestion', 'Pain', 'Discharge', 'Wax', 'Cerumen', 'Hearing loss', 'Ringing', 'Vertigo'],
  "Nose": ['Itching', 'Sneezing', 'Runny nose', 'Congestion', 'Bleeding', 'Sinus pain/pressure', 'Decreased sense of smell'],
  "Mouth": ['Itching', 'Swelling of lips/tongue', 'Cold sores', 'Bad breath', 'Mouth breathing'],
  "Throat": ['Itching', 'Post-nasal drip', 'Throat clearing', 'Sore/dry throat', 'Throat swelling', 'Hoarseness', 'Difficulty swallowing'],
} as const;

export default function RosHeadFields() {
  const { watch, setValue } = useFormContext();
  const ros = watch("reviewOfSystems") || {};

  const handleNoneToggle = (category: string, checked: boolean) => {
    const key = category.toLowerCase() as string;
    setValue(`reviewOfSystems.${key}.selected`, []);
    setValue(`reviewOfSystems.${key}.none`, checked);
  };

  const handleSymptomToggle = (category: string, symptom: string, checked: boolean) => {
    const key = category.toLowerCase() as string;
    const current = ((ros[key as keyof typeof ros] as any)?.selected || []) as string[];
    if (checked) {
      setValue(`reviewOfSystems.${key}.selected`, [...current, symptom]);
      setValue(`reviewOfSystems.${key}.none`, false);
    } else {
      setValue(`reviewOfSystems.${key}.selected`, current.filter((s:string) => s !== symptom));
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(CATEGORIES).map(([category, symptoms]) => {
        const key = category.toLowerCase();
        const categoryData = (ros[key as keyof typeof ros] as any) || {};
        const selected = (categoryData.selected || []) as string[];
        const isNone = categoryData.none || false;

        const categoryKey = key === 'mouth' ? 'mouth' : key === 'throat' ? 'throat' : key === 'nose' ? 'nose' : key === 'eyes' ? 'eyes' : 'ears';

        return (
          <div key={category} className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">{category}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Checkbox
                id={`ros-${key}-none`}
                checked={isNone}
                onCheckedChange={(checked) => handleNoneToggle(categoryKey, !!checked)}
                className="border-primary"
              />
              <label htmlFor={`ros-${key}-none`} className="text-sm font-medium cursor-pointer">None</label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {symptoms.map((symptom) => (
                <div key={`${key}-${symptom}`} className="flex items-center gap-2">
                  <Checkbox
                    id={`ros-${key}-${symptom.replace(/\s+/g, '-')}`}
                    checked={selected.includes(symptom)}
                    onCheckedChange={(checked) => handleSymptomToggle(categoryKey, symptom, !!checked)}
                    disabled={isNone}
                    className="border-primary"
                  />
                  <label htmlFor={`ros-${key}-${symptom.replace(/\s+/g, '-')}`} className="text-sm cursor-pointer">{symptom}</label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}