"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DemographicsFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="demographics.lastName">Last Name *</Label>
          <Input id="demographics.lastName" {...register("demographics.lastName")} placeholder="Last Name" />
          {(errors as any).demographics?.lastName && <p className="text-red-500 text-xs mt-1">{((errors as any).demographics as any)?.lastName.message as string}</p>}
        </div>
        <div>
          <Label htmlFor="demographics.firstName">First Name *</Label>
          <Input id="demographics.firstName" {...register("demographics.firstName")} placeholder="First Name" />
          {(errors as any).demographics?.firstName && <p className="text-red-500 text-xs mt-1">{((errors as any).demographics as any)?.firstName.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="demographics.middleInitial">MI</Label>
          <Input id="demographics.middleInitial" {...register("demographics.middleInitial")} placeholder="MI" maxLength={1} />
        </div>
        <div>
          <Label htmlFor="demographics.dob">Date of Birth *</Label>
          <Input id="demographics.dob" type="date" {...register("demographics.dob")} />
          {(errors as any).demographics?.dob && <p className="text-red-500 text-xs mt-1">{((errors as any).demographics as any)?.dob.message as string}</p>}
        </div>
        <div>
          <Label htmlFor="demographics.age">Age</Label>
          <Input id="demographics.age" {...register("demographics.age")} placeholder="Age" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label>Sex</Label>
          <Select {...register("demographics.sex")}>
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="demographics.race">Race/Ethnicity</Label>
          <Input id="demographics.race" {...register("demographics.race")} placeholder="Race/Ethnicity" />
        </div>
        <div>
          <Label htmlFor="demographics.occupation">Occupation</Label>
          <Input id="demographics.occupation" {...register("demographics.occupation")} placeholder="Occupation" />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="demographics.phone">Primary Phone *</Label>
            <Input id="demographics.phone" type="tel" {...register("demographics.phone")} placeholder="(XXX) XXX-XXXX" />
            {(errors as any).demographics?.phone && <p className="text-red-500 text-xs mt-1">{((errors as any).demographics as any)?.phone.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="demographics.altPhone">Alternate Phone</Label>
            <Input id="demographics.altPhone" type="tel" {...register("demographics.altPhone")} placeholder="(XXX) XXX-XXXX" />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="demographics.email">Email Address *</Label>
          <Input id="demographics.email" type="email" {...register("demographics.email")} placeholder="email@example.com" />
          {(errors as any).demographics?.email && <p className="text-red-500 text-xs mt-1">{((errors as any).demographics as any)?.email.message as string}</p>}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Address</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="demographics.address.street">Street Address *</Label>
            <Input id="demographics.address.street" {...register("demographics.address.street")} placeholder="Street Address" />
            {(errors as any).demographics?.address?.street && <p className="text-red-500 text-xs mt-1">{((errors as any).demographics as any)?.address?.street.message as string}</p>}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="demographics.address.city">City *</Label>
              <Input id="demographics.address.city" {...register("demographics.address.city")} placeholder="City" />
            </div>
            <div>
              <Label htmlFor="demographics.address.state">State *</Label>
              <Input id="demographics.address.state" {...register("demographics.address.state")} placeholder="TX" defaultValue="TX" />
            </div>
            <div>
              <Label htmlFor="demographics.address.zip">ZIP *</Label>
              <Input id="demographics.address.zip" {...register("demographics.address.zip")} placeholder="XXXXX" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}