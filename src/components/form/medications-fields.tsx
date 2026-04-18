"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function MedicationsFields() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const noneChecked = watch("medications.none") || false;

  const { fields, append, remove } = useFieldArray({
    name: "medications.medications",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Current Medications</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="meds-none"
            checked={noneChecked}
            onCheckedChange={(checked) => {
              setValue("medications.none", checked);
              if (checked) {
                setValue("medications.medications", []);
              }
            }}
            className="border-primary"
          />
          <label htmlFor="meds-none" className="text-sm font-medium cursor-pointer">None</label>
        </div>
      </div>

      {!noneChecked && (
        <>
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-bold"
              >
                ✕
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`medications.medications.${index}.medication`}>Medication</Label>
                  <Input id={`medications.medications.${index}.medication`} {...register(`medications.medications.${index}.medication`)} placeholder="Medication name" />
                </div>
                <div>
                  <Label htmlFor={`medications.medications.${index}.strength`}>Strength</Label>
                  <Input id={`medications.medications.${index}.strength`} {...register(`medications.medications.${index}.strength`)} placeholder="e.g., 10mg" />
                </div>
                <div>
                  <Label htmlFor={`medications.medications.${index}.frequency`}>How Often</Label>
                  <Input id={`medications.medications.${index}.frequency`} {...register(`medications.medications.${index}.frequency`)} placeholder="e.g., Twice daily" />
                </div>
                <div>
                  <Label htmlFor={`medications.medications.${index}.reason`}>Reason</Label>
                  <Input id={`medications.medications.${index}.reason`} {...register(`medications.medications.${index}.reason`)} placeholder="e.g., Blood pressure" />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ medication: '', strength: '', frequency: '', reason: '' })}
            className="w-full py-3 border-2 border-dashed border-primary/30 rounded-lg text-primary font-semibold hover:bg-primary/5 transition-colors"
          >
            + Add Medication
          </button>
        </>
      )}
    </div>
  );
}