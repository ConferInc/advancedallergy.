"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ChiefComplaintFields() {
  const { register, formState: { errors } } = useFormContext();
  const prefix = "chiefComplaint.";

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={prefix + "reasonForVisit"}>Reason for Visit / Chief Complaint *</Label>
        <Textarea id={prefix + "reasonForVisit"} {...register("chiefComplaint.reasonForVisit")} placeholder="Please describe the main reason for your visit today..." rows={3} />
      </div>
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Pharmacy Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={prefix + "pharmacy"}>Pharmacy Name</Label>
            <Input id={prefix + "pharmacy"} {...register("chiefComplaint.pharmacy")} placeholder="Pharmacy Name" />
          </div>
          <div>
            <Label htmlFor={prefix + "pharmacyPhone"}>Pharmacy Phone</Label>
            <Input id={prefix + "pharmacyPhone"} type="tel" {...register("chiefComplaint.pharmacyPhone")} placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor={prefix + "pharmacyAddress"}>Pharmacy Address</Label>
          <Input id={prefix + "pharmacyAddress"} {...register("chiefComplaint.pharmacyAddress")} placeholder="Pharmacy Address" />
        </div>
      </div>
    </div>
  );
}