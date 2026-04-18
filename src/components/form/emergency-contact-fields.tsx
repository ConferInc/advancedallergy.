"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmergencyContactFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 text-primary">Emergency Contact</h3>
        <p className="text-sm text-gray-body mb-4">Someone we can reach in case of an emergency</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergencyContact.name">Contact Name *</Label>
            <Input id="emergencyContact.name" {...register("emergencyContact.name")} placeholder="Full Name" />
          </div>
          <div>
            <Label htmlFor="emergencyContact.relationship">Relationship *</Label>
            <Input id="emergencyContact.relationship" {...register("emergencyContact.relationship")} placeholder="e.g., Spouse, Parent, Sibling" />
          </div>
          <div>
            <Label htmlFor="emergencyContact.phone">Phone Number *</Label>
            <Input id="emergencyContact.phone" type="tel" {...register("emergencyContact.phone")} placeholder="(XXX) XXX-XXXX" />
          </div>
          <div>
            <Label htmlFor="emergencyContact.altPhone">Alternate Phone</Label>
            <Input id="emergencyContact.altPhone" type="tel" {...register("emergencyContact.altPhone")} placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-2 text-primary">Responsible Party</h3>
        <p className="text-sm text-gray-body mb-4">Complete only if different from the patient (e.g., parent or guardian)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="responsibleParty.name">Name</Label>
            <Input id="responsibleParty.name" {...register("responsibleParty.name")} placeholder="Full Name" />
          </div>
          <div>
            <Label htmlFor="responsibleParty.dob">Date of Birth</Label>
            <Input id="responsibleParty.dob" type="date" {...register("responsibleParty.dob")} />
          </div>
          <div>
            <Label htmlFor="responsibleParty.relationship">Relationship to Patient</Label>
            <Input id="responsibleParty.relationship" {...register("responsibleParty.relationship")} placeholder="e.g., Parent, Guardian" />
          </div>
          <div>
            <Label htmlFor="responsibleParty.phone">Phone</Label>
            <Input id="responsibleParty.phone" type="tel" {...register("responsibleParty.phone")} placeholder="(XXX) XXX-XXXX" />
          </div>
          <div>
            <Label htmlFor="responsibleParty.employer">Employer</Label>
            <Input id="responsibleParty.employer" {...register("responsibleParty.employer")} placeholder="Employer Name" />
          </div>
          <div>
            <Label htmlFor="responsibleParty.employerPhone">Employer Phone</Label>
            <Input id="responsibleParty.employerPhone" type="tel" {...register("responsibleParty.employerPhone")} placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
      </div>
    </div>
  );
}