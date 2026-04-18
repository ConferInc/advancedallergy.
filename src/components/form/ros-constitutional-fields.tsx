"use client";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

const CONSTITUTIONAL_SYMPTOMS = ['Fatigue', 'Fever', 'Chills', 'Weight Gain', 'Weight Loss', 'Loss of Appetite'] as const;

export default function RosConstitutionalFields() {
  const { watch, setValue } = useFormContext();
  const ros = watch("reviewOfSystems") || {};
  const constitution = ros.constitutional || {};
  
  const handleNoneToggle = (checked: boolean) => {
    if (checked) {
      setValue("reviewOfSystems.constitutional.selected", []);
      setValue("reviewOfSystems.constitutional.none", true);
    } else {
      setValue("reviewOfSystems.constitutional.none", false);
    }
  };

  const handleSymptomToggle = (symptom: string, checked: boolean) => {
    const current = (constitution.selected || []) as string[];
    if (checked) {
      setValue("reviewOfSystems.constitutional.selected", [...current, symptom]);
      setValue("reviewOfSystems.constitutional.none", false);
    } else {
      setValue("reviewOfSystems.constitutional.selected", current.filter((s:string) => s !== symptom));
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-1">Constitutional</h3>
      <p className="text-sm text-gray-body mb-4">Check any symptoms you are experiencing</p>
      <div className="flex items-center gap-2 mb-3 p-3 bg-primary/5 rounded-lg">
        <Checkbox
          id="ros-const-none"
          checked={constitution.none || false}
          onCheckedChange={handleNoneToggle}
          className="border-primary"
        />
        <label htmlFor="ros-const-none" className="text-sm font-medium cursor-pointer">None of the above</label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CONSTITUTIONAL_SYMPTOMS.map((symptom) => (
          <div key={symptom} className="flex items-center gap-2">
            <Checkbox
              id={`ros-const-${symptom}`}
              checked={((constitution.selected as string[]) || []).includes(symptom)}
              onCheckedChange={(checked) => handleSymptomToggle(symptom, !!checked)}
              disabled={constitution.none}
              className="border-primary"
            />
            <label htmlFor={`ros-const-${symptom}`} className="text-sm cursor-pointer">{symptom}</label>
          </div>
        ))}
      </div>
    </div>
  );
}