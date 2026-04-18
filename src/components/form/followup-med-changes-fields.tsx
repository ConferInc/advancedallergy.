"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function FollowUpMedChangesFields() {
  const { register, watch, setValue } = useFormContext();
  const noChanges = watch("noHistoryChanges") || false;

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2 block font-semibold">Changes to medications?</Label>
        <Input {...register("medicationChanges")} placeholder="List any changes to your medications since your last visit" />
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Checkbox
            id="no-history-changes"
            checked={noChanges}
            onCheckedChange={(checked) => setValue("noHistoryChanges", checked)}
            className="border-primary"
          />
          <label htmlFor="no-history-changes" className="text-sm font-medium cursor-pointer">
            No Changes — My past medical, surgical, and family history has not changed
          </label>
        </div>
        {!noChanges && (
          <div>
            <Label>Describe any changes to your medical, surgical, or family history</Label>
            <textarea
              className="w-full border rounded-lg p-3 text-sm mt-1"
              rows={3}
              {...register("historyChanges")}
              placeholder="List any changes..."
            />
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Checkbox
            id="no-social-changes"
            checked={watch("noSocialChanges") || false}
            onCheckedChange={(checked) => setValue("noSocialChanges", checked)}
            className="border-primary"
          />
          <label htmlFor="no-social-changes" className="text-sm font-medium cursor-pointer">
            No Changes — My social and environmental history has not changed
          </label>
        </div>
        {!(watch("noSocialChanges") || false) && (
          <div>
            <Label>Describe any changes to your social/environmental history</Label>
            <textarea
              className="w-full border rounded-lg p-3 text-sm mt-1"
              rows={3}
              {...register("socialChanges")}
              placeholder="List any changes..."
            />
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <Label className="mb-2 block font-semibold">Medication Allergies</Label>
        <Input {...register("medicationAllergies")} placeholder="List any new medication allergies or update existing ones" />
      </div>
    </div>
  );
}