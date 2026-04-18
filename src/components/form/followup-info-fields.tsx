"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FollowUpInfoFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="patientName">Patient Name *</Label>
          <Input id="patientName" {...register("patientName")} placeholder="Full Name" />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input id="dob" type="date" {...register("dob")} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="Email Address" />
        </div>
        <div>
          <Label htmlFor="dateOfAppt">Date of Appointment</Label>
          <Input id="dateOfAppt" type="date" {...register("dateOfAppt")} />
        </div>
      </div>
      <div>
        <Label htmlFor="address">Patient Address</Label>
        <Input id="address" {...register("address")} placeholder="Street, City, State, ZIP" />
      </div>
      <div>
        <Label htmlFor="insuranceInfo">Insurance Information</Label>
        <Input id="insuranceInfo" {...register("insuranceInfo")} placeholder="Insurance Company and ID Number" />
      </div>
    </div>
  );
}