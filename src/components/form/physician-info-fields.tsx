"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PhysicianInfoFields() {
  const { register } = useFormContext();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="physicianInfo.referringPhysician">Referring Physician</Label>
          <Input id="physicianInfo.referringPhysician" {...register("physicianInfo.referringPhysician")} placeholder="Referring Physician Name" />
        </div>
        <div>
          <Label htmlFor="physicianInfo.referringPhysicianPhone">Referring Physician Phone</Label>
          <Input id="physicianInfo.referringPhysicianPhone" type="tel" {...register("physicianInfo.referringPhysicianPhone")} placeholder="(XXX) XXX-XXXX" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="physicianInfo.primaryCarePhysician">Primary Care Physician</Label>
          <Input id="physicianInfo.primaryCarePhysician" {...register("physicianInfo.primaryCarePhysician")} placeholder="PCP Name" />
        </div>
        <div>
          <Label htmlFor="physicianInfo.primaryCarePhysicianPhone">PCP Phone</Label>
          <Input id="physicianInfo.primaryCarePhysicianPhone" type="tel" {...register("physicianInfo.primaryCarePhysicianPhone")} placeholder="(XXX) XXX-XXXX" />
        </div>
      </div>
      <div>
        <Label htmlFor="physicianInfo.howDidYouHearAboutUs">How did you hear about us?</Label>
        <Input id="physicianInfo.howDidYouHearAboutUs" {...register("physicianInfo.howDidYouHearAboutUs")} placeholder="e.g., Referral, Google, Insurance, Friend" />
      </div>
    </div>
  );
}