"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const YES_NO_OPTIONS = ['Yes', 'No'] as const;
const HOME_TYPES = ['House', 'Apartment', 'Condominium', 'Ranch', 'Mobile home', 'Other'] as const;
const FLOORING = ['Carpet', 'Hardwood', 'Tile', 'Vinyl', 'Other'] as const;
const AC_TYPES = ['Central', 'Window', 'Fans', 'None'] as const;
const HEATING_TYPES = ['Gas', 'Electric', 'Wood burning', 'Radiators', 'Space heaters', 'Other'] as const;
const MATTRESS_TYPES = ['Regular', 'Foam', 'Water', 'Air', 'Other'] as const;
const PILLOW_TYPES = ['Foam', 'Feather', 'Down', 'Kapok', 'Synthetic', 'Other'] as const;

export default function SocialHistoryFields() {
  const { register, watch, setValue } = useFormContext();
  const sh = watch("socialHistory") || {};
  const age = watch("demographics.age");

  // Show pediatric fields for patients under 18
  const showPediatric = age && parseInt(age) < 18;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Place of Birth</Label>
          <Input {...register("socialHistory.placeOfBirth")} placeholder="City, State/Country" />
        </div>
        <div>
          <Label>Where were you raised?</Label>
          <Input {...register("socialHistory.whereRaised")} placeholder="City, State/Country" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>When did you move to North Texas?</Label>
          <Input {...register("socialHistory.movedToNorthTexas")} placeholder="Year or timeframe" />
        </div>
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <YesNoField label="Do you have children?" field="socialHistory.hasChildren" watch={watch} setValue={setValue} />
          {(sh.hasChildren === 'Yes') && (
            <div>
              <Label>How many and their ages</Label>
              <Input {...register("socialHistory.childrenDetails")} placeholder="e.g., 2 children, ages 5 and 8" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <YesNoField label="Do you drink alcohol?" field="socialHistory.drinksAlcohol" watch={watch} setValue={setValue} />
          {(sh.drinksAlcohol === 'Yes') && (
            <div>
              <Label>How much and how often?</Label>
              <Input {...register("socialHistory.alcoholDetails")} placeholder="e.g., 1-2 drinks per week" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <YesNoField label="Do you presently smoke?" field="socialHistory.currentlySmokes" watch={watch} setValue={setValue} />
          {(sh.currentlySmokes === 'Yes') && (
            <div>
              <Label>Packs/day and how long?</Label>
              <Input {...register("socialHistory.currentSmokingDetails")} placeholder="e.g., 1 pack/day for 10 years" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <YesNoField label="Did you ever smoke?" field="socialHistory.everSmoked" watch={watch} setValue={setValue} />
          {(sh.everSmoked === 'Yes') && (
            <>
              <div>
                <Label>Packs/day and how long?</Label>
                <Input {...register("socialHistory.pastSmokingDetails")} placeholder="e.g., 1 pack/day for 5 years" />
              </div>
              <div>
                <Label>When did you quit?</Label>
                <Input {...register("socialHistory.quitDate")} placeholder="Year or date" />
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <YesNoField label="Do you or did you use illicit drugs?" field="socialHistory.illicitDrugUse" watch={watch} setValue={setValue} />
          {(sh.illicitDrugUse === 'Yes') && (
            <div>
              <Label>What and when?</Label>
              <Input {...register("socialHistory.illicitDrugDetails")} placeholder="Details" />
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-900 mb-4">Home Environment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RadioGroupField label="Type of home" field="socialHistory.homeType" options={HOME_TYPES} watch={watch} setValue={setValue} />
          <YesNoField label="Any water damage/leakage?" field="socialHistory.waterDamage" watch={watch} setValue={setValue} />
          <YesNoField label="Any visible mold?" field="socialHistory.visibleMold" watch={watch} setValue={setValue} />
          <RadioGroupField label="Type of flooring" field="socialHistory.flooringType" options={FLOORING} watch={watch} setValue={setValue} />
          <RadioGroupField label="Type of A/C" field="socialHistory.acType" options={AC_TYPES} watch={watch} setValue={setValue} />
          <RadioGroupField label="Type of heating" field="socialHistory.heatingType" options={HEATING_TYPES} watch={watch} setValue={setValue} />
          <YesNoField label="Plants indoors?" field="socialHistory.indoorPlants" watch={watch} setValue={setValue} />
          <RadioGroupField label="Type of mattress" field="socialHistory.mattressType" options={MATTRESS_TYPES} watch={watch} setValue={setValue} />
          <RadioGroupField label="Type of pillow" field="socialHistory.pillowType" options={PILLOW_TYPES} watch={watch} setValue={setValue} />
          <YesNoField label="Allergy covers for mattress/pillows?" field="socialHistory.allergyCovers" watch={watch} setValue={setValue} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <YesNoField label="Do you have pets?" field="socialHistory.hasPets" watch={watch} setValue={setValue} />
          {(sh.hasPets === 'Yes') && (
            <div>
              <Label>What kind and how many?</Label>
              <Input {...register("socialHistory.petDetails")} placeholder="e.g., 1 dog, 2 cats" />
            </div>
          )}
        </div>

        <div className="mt-4">
          <Label>Environmental issues at school/workplace</Label>
          <Input {...register("socialHistory.environmentalIssues")} placeholder="e.g., Dusty office, chemical exposure" />
        </div>
      </div>

      {/* Pediatric section */}
      {showPediatric && (
        <div className="border-t pt-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-4">For Pediatric Patients</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RadioGroupField label="Delivery" field="socialHistory.deliveryType" options={['Normal', 'C-section']} watch={watch} setValue={setValue} />
            <RadioGroupField label="Term" field="socialHistory.termType" options={['Normal term', 'Pre-term']} watch={watch} setValue={setValue} />
            <YesNoField label="Health issues right after birth?" field="socialHistory.birthHealthIssues" watch={watch} setValue={setValue} />
            {(sh.birthHealthIssues === 'Yes') && (
              <div>
                <Label>Details</Label>
                <Input {...register("socialHistory.birthHealthDetails")} placeholder="Please describe" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function YesNoField({ label, field, watch, setValue }: { label: string; field: string; watch: any; setValue: any }) {
  const value = watch(field);
  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <div className="flex gap-4">
        {YES_NO_OPTIONS.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={field}
              value={opt}
              checked={value === opt}
              onChange={() => setValue(field, opt)}
              className="accent-[#159948]"
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function RadioGroupField({ label, field, options, watch, setValue }: { label: string; field: string; options: readonly string[]; watch: any; setValue: any }) {
  const value = watch(field);
  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={field}
              value={opt}
              checked={value === opt}
              onChange={() => setValue(field, opt)}
              className="accent-[#159948]"
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}