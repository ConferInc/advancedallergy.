"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPatientFormSchema, followUpFormSchema } from "@/lib/form-schema";
import { getStepsForVisit } from "@/lib/form-flow";
import { brand } from "@/lib/brand";
import DemographicsFields from "@/components/form/demographics-fields";
import InsuranceFields from "@/components/form/insurance-fields";
import EmergencyContactFields from "@/components/form/emergency-contact-fields";
import PhysicianInfoFields from "@/components/form/physician-info-fields";
import ChiefComplaintFields from "@/components/form/chief-complaint-fields";
import RosConstitutionalFields from "@/components/form/ros-constitutional-fields";
import RosHeadFields from "@/components/form/ros-head-fields";
import RosBodyFields from "@/components/form/ros-body-fields";
import MedicalHistoryFields from "@/components/form/medical-history-fields";
import FamilyHistoryFields from "@/components/form/family-history-fields";
import SocialHistoryFields from "@/components/form/social-history-fields";
import MedicationsFields from "@/components/form/medications-fields";
import AllergiesFields from "@/components/form/allergies-fields";
import PreviousEvaluationFields from "@/components/form/previous-evaluation-fields";
import ReviewStep from "@/components/form/review-step";
import ConsentStep from "@/components/form/consent-step";
import FollowUpInfoFields from "@/components/form/followup-info-fields";
import FollowUpMedChangesFields from "@/components/form/followup-med-changes-fields";

type VisitType = "new" | "followup";

function FormWizard() {
  const searchParams = useSearchParams();
  const visitType = (searchParams.get("type") as VisitType) || "new";
  const steps = getStepsForVisit(visitType);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = visitType === "new" ? newPatientFormSchema : followUpFormSchema;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: visitType === "new" ? {
      visitType: "new" as const,
    } : {
      visitType: "followup" as const,
    },
    mode: "onChange",
  });

  // Save form state to sessionStorage
  const watchedValues = methods.watch();
  useEffect(() => {
    try {
      sessionStorage.setItem("intake-form", JSON.stringify(watchedValues));
    } catch {}
  }, [watchedValues]);

  // Restore form state from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("intake-form");
      if (saved) {
        methods.reset(JSON.parse(saved));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = steps[currentStep];

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [steps.length]);

  const onSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, visitType }),
      });
      if (!response.ok) throw new Error("Submission failed");
      const result = await response.json();
      sessionStorage.removeItem("intake-form");
      window.location.href = `/confirmation?id=${result.id}`;
    } catch {
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step.id) {
      case "demographics": return <DemographicsFields />;
      case "insurance": return <InsuranceFields />;
      case "emergency-contact": return <EmergencyContactFields />;
      case "physician-info": return <PhysicianInfoFields />;
      case "chief-complaint": return <ChiefComplaintFields />;
      case "ros-constitutional": return <RosConstitutionalFields />;
      case "ros-head": return <RosHeadFields />;
      case "ros-body": return <RosBodyFields />;
      case "medical-history": return <MedicalHistoryFields />;
      case "family-history": return <FamilyHistoryFields />;
      case "social-history": return <SocialHistoryFields />;
      case "medications": return <MedicationsFields />;
      case "allergies": return <AllergiesFields />;
      case "previous-evaluation": return <PreviousEvaluationFields />;
      case "review": return <ReviewStep />;
      case "consent": return <ConsentStep />;
      case "followup-info": return <FollowUpInfoFields />;
      case "followup-medication-changes": return <FollowUpMedChangesFields />;
      case "followup-history-changes": return <FollowUpMedChangesFields />;
      case "followup-allergies": return <AllergiesFields />;
      default: return <div>Step not found</div>;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-primary-deep text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold">{brand.practice.name}</h1>
              <p className="text-primary-accent text-xs">{brand.practice.specialty}</p>
            </div>
            <div className="text-right text-xs opacity-90">
              <p className="font-semibold">{visitType === "new" ? "New Patient" : "Follow-Up Visit"}</p>
              <p>Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>
          <div className="h-1 bg-primary-dark">
            <div
              className="h-full bg-primary-light transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-3xl mx-auto px-4 py-8">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h2>
              <p className="text-gray-body text-sm mb-6">{step.description}</p>
              <div className="space-y-6">
                {renderStep()}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <a
                  href="/"
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-body font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  ← Start Over
                </a>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-md"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </button>
              )}
            </div>
          </form>

          {/* Step dots */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToStep(i)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                  i === currentStep
                    ? "bg-primary text-white"
                    : i < currentStep
                    ? "bg-primary/20 text-primary-dark"
                    : "bg-gray-200 text-gray-body"
                }`}
                title={s.title}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-primary-deep text-white mt-8">
          <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs opacity-80">
            <p>© {new Date().getFullYear()} {brand.practice.name}. Your information is protected under HIPAA.</p>
          </div>
        </footer>
      </div>
    </FormProvider>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading form...</div>}>
      <FormWizard />
    </Suspense>
  );
}