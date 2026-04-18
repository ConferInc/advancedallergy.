"use client";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PAST_MEDICAL_CONDITIONS } from "@/lib/form-schema";

export default function MedicalHistoryFields() {
  const { watch, setValue } = useFormContext();
  const pmh = watch("pastMedicalHistory") || {};
  const selectedConditions = (pmh.conditions || []) as string[];
  const isNone = pmh.none || false;

  const handleNoneToggle = (checked: boolean) => {
    if (checked) {
      setValue("pastMedicalHistory.conditions", []);
      setValue("pastMedicalHistory.none", true);
    } else {
      setValue("pastMedicalHistory.none", false);
    }
  };

  const handleConditionToggle = (condition: string, checked: boolean) => {
    if (checked) {
      setValue("pastMedicalHistory.conditions", [...selectedConditions, condition]);
      setValue("pastMedicalHistory.none", false);
    } else {
      setValue("pastMedicalHistory.conditions", selectedConditions.filter((c:string) => c !== condition));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Past Medical History</h3>
      <p className="text-sm text-gray-body">Check all conditions that apply to you</p>

      <div className="flex items-center gap-2 mb-3 p-3 bg-primary/5 rounded-lg">
        <Checkbox
          id="pmh-none"
          checked={isNone}
          onCheckedChange={handleNoneToggle}
          className="border-primary"
        />
        <label htmlFor="pmh-none" className="text-sm font-medium cursor-pointer">None</label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PAST_MEDICAL_CONDITIONS.filter(c => c !== 'Cancer').map((condition) => (
          <div key={condition} className="flex items-center gap-2">
            <Checkbox
              id={`pmh-${condition.replace(/\s+/g, '-').replace(/\//g, '-')}`}
              checked={selectedConditions.includes(condition)}
              onCheckedChange={(checked) => handleConditionToggle(condition, !!checked)}
              disabled={isNone}
              className="border-primary"
            />
            <label htmlFor={`pmh-${condition.replace(/\s+/g, '-').replace(/\//g, '-')}`} className="text-sm cursor-pointer">{condition}</label>
          </div>
        ))}
      </div>

      {/* Cancer field with detail */}
      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          id="pmh-cancer"
          checked={selectedConditions.includes('Cancer')}
          onCheckedChange={(checked) => handleConditionToggle('Cancer', !!checked)}
          disabled={isNone}
          className="border-primary"
        />
        <label htmlFor="pmh-cancer" className="text-sm cursor-pointer">Cancer:</label>
        <Input
          className="inline-flex max-w-xs"
          placeholder="Type and details"
          {...(selectedConditions.includes('Cancer') ? {} : { disabled: true })}
          {...((isNone) ? { disabled: true } : {})}
          onChange={(e) => { /* handled by register */ }}
        />
      </div>

      {/* Other fields */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Other:</label>
          <Input className="max-w-xs" placeholder="Other condition" {...(!isNone ? {} : { disabled: true })} />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Other:</label>
          <Input className="max-w-xs" placeholder="Other condition" {...(!isNone ? {} : { disabled: true })} />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Other:</label>
          <Input className="max-w-xs" placeholder="Other condition" {...(!isNone ? {} : { disabled: true })} />
        </div>
      </div>

      {/* Past Surgical History */}
      <div className="border-t pt-6 mt-6">
        <h3 className="font-semibold text-gray-900 mb-2">Past Surgical History</h3>
        <div className="flex items-center gap-2 mb-3">
          <Checkbox
            id="surgical-none"
            checked={(watch("pastSurgicalHistory") as any)?.none || false}
            onCheckedChange={(checked) => setValue("pastSurgicalHistory.none", checked)}
            className="border-primary"
          />
          <label htmlFor="surgical-none" className="text-sm font-medium cursor-pointer">None</label>
        </div>
        <textarea
          className="w-full border rounded-lg p-3 text-sm"
          rows={3}
          placeholder="List all surgeries you have had"
          {...(!((watch("pastSurgicalHistory") as any)?.none) ? {} : { disabled: true })}
          {...(isNone ? { disabled: true } : {})}
          onChange={(e) => setValue("pastSurgicalHistory.surgeries", e.target.value)}
        />
      </div>
    </div>
  );
}