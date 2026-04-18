"use client";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ConsentStep() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();

  const consents = [
    { id: "consent.treatmentConsent", text: "I consent to treatment by the physicians and staff of Advanced Allergy & Asthma Associates." },
    { id: "consent.insuranceAuthorization", text: "I authorize the release of medical information to my insurance company for the purpose of processing claims." },
    { id: "consent.delinquentAccounts", text: "I understand that I am responsible for all charges not covered by my insurance and agree to pay any delinquent balances." },
    { id: "consent.medicalRecords", text: "I authorize Advanced Allergy & Asthma Associates to release medical records as required by law or as I direct." },
    { id: "consent.communicationAuthorization", text: "I authorize Advanced Allergy & Asthma Associates to communicate with me via phone, email, or text for appointments and test results." },
    { id: "consent.officePolicies", text: "I have read and agree to the office policies of Advanced Allergy & Asthma Associates." },
  ];

  const hipaaChecked = watch("consent.hipaaAcknowledgment");

  return (
    <div className="space-y-6">
      {/* HIPAA Notice */}
      <div className="bg-gray-50 border rounded-lg p-4 max-h-64 overflow-y-auto">
        <h3 className="font-bold text-gray-900 mb-2 text-sm">NOTICE OF PRIVACY PRACTICES</h3>
        <p className="text-xs text-gray-600 mb-2">Advanced Allergy & Asthma Associates — Effective May 1, 2013</p>
        <div className="text-xs text-gray-600 space-y-2">
          <p>We are required by applicable federal law to maintain the privacy of your protected health information (PHI). This Notice of Privacy Practices describes how we may use and disclose your PHI to carry out treatment, payment or health care operations and for other purposes permitted or required by law.</p>
          <p><strong>Uses and Disclosures:</strong> We may use and disclose your PHI for treatment, payment, health care operations, as required by law, for public health purposes, for health oversight, in legal proceedings, for law enforcement, and for other purposes as described in our full notice.</p>
          <p><strong>Your Rights:</strong> You have the right to inspect and copy your PHI, request restrictions, request confidential communications, request amendments, receive an accounting of disclosures, and obtain a paper copy of this notice.</p>
          <p><strong>Marketing:</strong> We will not use your PHI for marketing without your written consent. We will not sell your PHI without your written authorization.</p>
          <p><strong>Appointment Reminders:</strong> We may use your PHI to provide you with appointment reminders.</p>
          <p>If you are concerned that we have violated your privacy rights, you may file a complaint with the Secretary of Health and Human Services or with us. We will not retaliate against you for filing a complaint.</p>
          <p className="font-semibold">Contact: Advanced Allergy & Asthma Associates, 5320 N. Tarrant Pkwy, Ste 220, Fort Worth, TX 76244 | Tel: (817) 428-7000 | Fax: (817) 428-7006</p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 border-2 border-primary rounded-lg bg-primary/5">
        <Checkbox
          id="hipaa-ack"
          checked={hipaaChecked || false}
          onCheckedChange={(checked) => setValue("consent.hipaaAcknowledgment", checked as boolean)}
          className="mt-1 border-primary"
        />
        <label htmlFor="hipaa-ack" className="text-sm font-medium">
          I acknowledge that Advanced Allergy & Asthma Associates has provided me a copy of their Notice of Privacy Practices, effective May 1, 2013. I have had the chance to review this Notice.
        </label>
      </div>
      {(errors.consent as any)?.hipaaAcknowledgment && (
        <p className="text-red-500 text-sm">You must acknowledge the Notice of Privacy Practices.</p>
      )}

      {/* Consent checkboxes */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Patient Consent</h3>
        {consents.map((consent) => (
          <div key={consent.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
            <Checkbox
              id={consent.id}
              className="mt-1 border-primary"
            />
            <label htmlFor={consent.id} className="text-sm cursor-pointer">{consent.text}</label>
          </div>
        ))}
      </div>

      {/* Signature */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Signature</h3>
        <p className="text-sm text-gray-body mb-4">
          By typing your full legal name below, you confirm that all information provided is accurate and you agree to the consents above.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="consent.signatureName">Signature (Type Full Legal Name) *</Label>
            <Input id="consent.signatureName" {...register("consent.signatureName")} placeholder="Full Legal Name" className="text-lg font-serif" />
            {(errors.consent as any)?.signatureName && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <Label htmlFor="consent.signatureDate">Date *</Label>
            <Input id="consent.signatureDate" type="date" {...register("consent.signatureDate")} defaultValue={new Date().toISOString().split('T')[0]} />
            {(errors.consent as any)?.signatureDate && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <Label htmlFor="consent.printName">Print Name *</Label>
            <Input id="consent.printName" {...register("consent.printName")} placeholder="Printed Name" />
            {(errors.consent as any)?.printName && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <Label htmlFor="consent.relationship">Relationship to Patient (if not patient)</Label>
            <Input id="consent.relationship" {...register("consent.relationship")} placeholder="e.g., Parent, Guardian" />
          </div>
        </div>
      </div>
    </div>
  );
}