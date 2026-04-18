"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const FOOD_ALLERGENS = ['Milk', 'Eggs', 'Peanut', 'Tree Nuts', 'Fish', 'Shellfish', 'Wheat', 'Soy'] as const;
const INSECT_STINGS = ['Fire Ant', 'Honey Bee', 'Wasp', 'Yellow Jacket', 'Hornet'] as const;

export default function AllergiesFields() {
  const { register, watch, setValue } = useFormContext();

  const foodAllergens = (watch("allergies.foodAllergens") || []) as string[];
  const insectStings = (watch("allergies.insectStings") || []) as string[];

  const toggleFoodAllergen = (allergen: string, checked: boolean) => {
    if (checked) {
      setValue("allergies.foodAllergens", [...foodAllergens, allergen]);
    } else {
      setValue("allergies.foodAllergens", foodAllergens.filter((a:string) => a !== allergen));
    }
  };

  const toggleInsectSting = (insect: string, checked: boolean) => {
    if (checked) {
      setValue("allergies.insectStings", [...insectStings, insect]);
    } else {
      setValue("allergies.insectStings", insectStings.filter((i:string) => i !== insect));
    }
  };

  const latexValue = watch("allergies.latex");

  return (
    <div className="space-y-6">
      {/* Medication Allergies */}
      <div className="border-l-4 border-primary pl-4">
        <h3 className="font-semibold text-gray-900 mb-2">Medication Allergies</h3>
        <Input {...register("allergies.medications")} placeholder="List medication allergies (e.g., Penicillin, Sulfa)" />
        <div className="mt-2">
          <Label>Reaction</Label>
          <Input {...register("allergies.medicationReaction")} placeholder="Describe the reaction" />
        </div>
      </div>

      {/* Food Allergies */}
      <div className="border-l-4 border-primary pl-4">
        <h3 className="font-semibold text-gray-900 mb-2">Food Allergies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FOOD_ALLERGENS.map((allergen) => (
            <div key={allergen} className="flex items-center gap-2">
              <Checkbox
                id={`food-${allergen.replace(/\s+/g, '-')}`}
                checked={foodAllergens.includes(allergen)}
                onCheckedChange={(checked) => toggleFoodAllergen(allergen, !!checked)}
                className="border-primary"
              />
              <label htmlFor={`food-${allergen.replace(/\s+/g, '-')}`} className="text-sm cursor-pointer">{allergen}</label>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Label>Other Food Allergies</Label>
          <Input {...register("allergies.foodOther")} placeholder="List any other food allergies" />
        </div>
        <div className="mt-2">
          <Label>Reaction</Label>
          <Input {...register("allergies.foodReaction")} placeholder="Describe the reaction" />
        </div>
      </div>

      {/* Insect Sting Allergies */}
      <div className="border-l-4 border-primary pl-4">
        <h3 className="font-semibold text-gray-900 mb-2">Insect Sting Allergies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {INSECT_STINGS.map((insect) => (
            <div key={insect} className="flex items-center gap-2">
              <Checkbox
                id={`insect-${insect.replace(/\s+/g, '-')}`}
                checked={insectStings.includes(insect)}
                onCheckedChange={(checked) => toggleInsectSting(insect, !!checked)}
                className="border-primary"
              />
              <label htmlFor={`insect-${insect.replace(/\s+/g, '-')}`} className="text-sm cursor-pointer">{insect}</label>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Label>Other Insect Sting Allergies</Label>
          <Input {...register("allergies.insectOther")} placeholder="List any other insect sting allergies" />
        </div>
        <div className="mt-2">
          <Label>Reaction</Label>
          <Input {...register("allergies.insectReaction")} placeholder="Describe the reaction" />
        </div>
      </div>

      {/* Latex Allergy */}
      <div className="border-l-4 border-primary pl-4">
        <h3 className="font-semibold text-gray-900 mb-2">Latex Allergy</h3>
        <div className="flex gap-4">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="allergies.latex"
                value={opt}
                checked={latexValue === opt}
                onChange={() => setValue("allergies.latex", opt)}
                className="accent-[#159948]"
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
        {latexValue === 'Yes' && (
          <div className="mt-2">
            <Label>Reaction</Label>
            <Input {...register("allergies.latexReaction")} placeholder="Describe the reaction" />
          </div>
        )}
      </div>
    </div>
  );
}