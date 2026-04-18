"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function InsuranceFields() {
  const { register, watch, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 text-primary">Primary Insurance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="insurance.primary.insurer">Insurance Company *</Label>
            <Input id="insurance.primary.insurer" {...register("insurance.primary.insurer")} placeholder="Insurance Company Name" />
          </div>
          <div>
            <Label htmlFor="insurance.primary.idNumber">ID Number *</Label>
            <Input id="insurance.primary.idNumber" {...register("insurance.primary.idNumber")} placeholder="ID Number" />
          </div>
          <div>
            <Label htmlFor="insurance.primary.groupNumber">Group Number</Label>
            <Input id="insurance.primary.groupNumber" {...register("insurance.primary.groupNumber")} placeholder="Group Number" />
          </div>
          <div>
            <Label htmlFor="insurance.primary.phone">Insurance Phone</Label>
            <Input id="insurance.primary.phone" type="tel" {...register("insurance.primary.phone")} placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="insurance.primary.address">Insurance Address</Label>
          <Input id="insurance.primary.address" {...register("insurance.primary.address")} placeholder="Insurance Company Address" />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-2 text-primary">Policy Holder Information</h3>
        <p className="text-sm text-gray-body mb-4">Complete if different from the patient</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="insurance.primary.holder.name">Policy Holder Name</Label>
            <Input id="insurance.primary.holder.name" {...register("insurance.primary.holder.name")} placeholder="Full Name" />
          </div>
          <div>
            <Label htmlFor="insurance.primary.holder.dob">Policy Holder Date of Birth</Label>
            <Input id="insurance.primary.holder.dob" type="date" {...register("insurance.primary.holder.dob")} />
          </div>
          <div>
            <Label htmlFor="insurance.primary.holder.relationship">Relationship to Patient</Label>
            <Input id="insurance.primary.holder.relationship" {...register("insurance.primary.holder.relationship")} placeholder="e.g., Spouse, Parent, Self" />
          </div>
          <div>
            <Label htmlFor="insurance.primary.holder.phone">Policy Holder Phone</Label>
            <Input id="insurance.primary.holder.phone" type="tel" {...register("insurance.primary.holder.phone")} placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-2 text-primary">Secondary Insurance</h3>
        <p className="text-sm text-gray-body mb-4">Optional — complete if you have a second insurance plan</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="insurance.secondary.insurer">Insurance Company</Label>
            <Input id="insurance.secondary.insurer" {...register("insurance.secondary.insurer")} placeholder="Insurance Company Name" />
          </div>
          <div>
            <Label htmlFor="insurance.secondary.idNumber">ID Number</Label>
            <Input id="insurance.secondary.idNumber" {...register("insurance.secondary.idNumber")} placeholder="ID Number" />
          </div>
          <div>
            <Label htmlFor="insurance.secondary.groupNumber">Group Number</Label>
            <Input id="insurance.secondary.groupNumber" {...register("insurance.secondary.groupNumber")} placeholder="Group Number" />
          </div>
          <div>
            <Label htmlFor="insurance.secondary.phone">Insurance Phone</Label>
            <Input id="insurance.secondary.phone" type="tel" {...register("insurance.secondary.phone")} placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
      </div>
    </div>
  );
}