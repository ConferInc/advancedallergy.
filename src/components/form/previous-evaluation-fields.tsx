"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PreviousEvaluationFields() {
  const { register, watch, setValue } = useFormContext();
  const hadEvaluation = watch("previousEvaluation.hadEvaluation");
  const hadTesting = watch("previousEvaluation.hadAllergyTesting");
  const hadShots = watch("previousEvaluation.hadAllergyShots");

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2 block font-semibold">Have you seen an allergist before?</Label>
        <div className="flex gap-4">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="previousEvaluation.hadEvaluation" value={opt}
                checked={hadEvaluation === opt}
                onChange={() => setValue("previousEvaluation.hadEvaluation", opt)}
                className="accent-[#159948]" />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {hadEvaluation === 'Yes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 border-l-4 border-primary">
          <div>
            <Label>Name of Allergist</Label>
            <Input {...register("previousEvaluation.allergistName")} placeholder="Allergist name" />
          </div>
          <div>
            <Label>Allergist Phone</Label>
            <Input {...register("previousEvaluation.allergistPhone")} type="tel" placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
      )}

      <div>
        <Label className="mb-2 block font-semibold">Have you had allergy testing done previously?</Label>
        <div className="flex gap-4">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="previousEvaluation.hadAllergyTesting" value={opt}
                checked={hadTesting === opt}
                onChange={() => setValue("previousEvaluation.hadAllergyTesting", opt)}
                className="accent-[#159948]" />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {hadTesting === 'Yes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 border-l-4 border-primary">
          <div>
            <Label>When?</Label>
            <Input {...register("previousEvaluation.testingDate")} placeholder="Approximate date" />
          </div>
          <div>
            <Label>Any positive tests?</Label>
            <Input {...register("previousEvaluation.positiveTests")} placeholder="Describe any positive results" />
          </div>
        </div>
      )}

      <div>
        <Label className="mb-2 block font-semibold">Have you received allergy shots?</Label>
        <div className="flex gap-4">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="previousEvaluation.hadAllergyShots" value={opt}
                checked={hadShots === opt}
                onChange={() => setValue("previousEvaluation.hadAllergyShots", opt)}
                className="accent-[#159948]" />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {hadShots === 'Yes' && (
        <div className="space-y-4 pl-4 border-l-4 border-primary">
          <div>
            <Label>When and how long?</Label>
            <Input {...register("previousEvaluation.shotsDetails")} placeholder="e.g., 2018-2020, 2 years" />
          </div>
          <div>
            <Label>Did you benefit from allergy shots?</Label>
            <Input {...register("previousEvaluation.benefitedFromShots")} placeholder="Yes/No and details" />
          </div>
          <div>
            <Label>Any allergic reactions to shots?</Label>
            <Input {...register("previousEvaluation.shotReactions")} placeholder="Describe any reactions" />
          </div>
        </div>
      )}
    </div>
  );
}