"use client";
import { useFormContext } from "react-hook-form";

export default function ReviewStep() {
  const { watch } = useFormContext();
  const data = watch();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-primary mb-2">{title}</h3>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );

  const Field = ({ label, value }: { label: string; value: unknown }) => {
    if (!value || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <div className="flex justify-between py-1 border-b border-gray-100">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-right">{typeof value === 'boolean' ? (value ? '✓' : '') : String(value)}</span>
      </div>
    );
  };

  const demographics = data.demographics || {};

  return (
    <div>
      <p className="text-gray-body mb-6">Please review all information below before submitting. Click &quot;Back&quot; to make changes.</p>

      <Section title="Patient Information">
        <Field label="Name" value={demographics.lastName && demographics.firstName ? `${demographics.lastName}, ${demographics.firstName} ${demographics.middleInitial || ''}` : ''} />
        <Field label="Date of Birth" value={demographics.dob} />
        <Field label="Age" value={demographics.age} />
        <Field label="Sex" value={demographics.sex} />
        <Field label="Phone" value={demographics.phone} />
        <Field label="Email" value={demographics.email} />
        {demographics.address && <Field label="Address" value={`${demographics.address.street || ''}, ${demographics.address.city || ''}, ${demographics.address.state || ''} ${demographics.address.zip || ''}`} />}
      </Section>

      <Section title="Chief Complaint">
        <Field label="Reason for Visit" value={data.chiefComplaint?.reasonForVisit} />
        <Field label="Pharmacy" value={data.chiefComplaint?.pharmacy} />
      </Section>

      <Section title="Insurance">
        <Field label="Primary Insurer" value={data.insurance?.primary?.insurer} />
        <Field label="ID Number" value={data.insurance?.primary?.idNumber} />
        <Field label="Secondary Insurer" value={data.insurance?.secondary?.insurer} />
      </Section>

      <Section title="Current Medications">
        {data.medications?.none ? (
          <p className="text-gray-500 italic">None</p>
        ) : (
          data.medications?.medications?.map((med: any, i: number) => (
            <div key={i} className="flex gap-2">
              <span>{med.medication}</span>
              {med.strength && <span>({med.strength})</span>}
              {med.frequency && <span>- {med.frequency}</span>}
              {med.reason && <span>- {med.reason}</span>}
            </div>
          ))
        )}
      </Section>

      <Section title="Allergies">
        <Field label="Medication Allergies" value={data.allergies?.medications} />
        <Field label="Food Allergies" value={data.allergies?.foodAllergens?.join(', ')} />
        <Field label="Insect Sting Allergies" value={data.allergies?.insectStings?.join(', ')} />
        <Field label="Latex Allergy" value={data.allergies?.latex} />
      </Section>
    </div>
  );
}