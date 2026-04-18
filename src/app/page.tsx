import Link from "next/link";
import { brand } from "@/lib/brand";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-primary-deep text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{brand.practice.name}</h1>
          <p className="text-primary-accent text-lg font-light">{brand.practice.specialty}</p>
          <div className="mt-3 text-sm opacity-90">
            <p>{brand.practice.locations[0].address}, {brand.practice.locations[0].city}</p>
            <p>Phone: {brand.practice.phone} | Fax: {brand.practice.fax}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Patient Intake Forms
          </h2>
          <p className="text-gray-body text-lg">
            Please select the type of visit to begin filling out your forms.
            Your information is secure and will only be shared with our practice.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* New Patient Card */}
          <Link
            href="/form?type=new"
            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary overflow-hidden"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Patient</h3>
              <p className="text-gray-body text-sm">
                Complete intake form for your first visit. This includes medical history,
                insurance information, and consent forms.
              </p>
              <div className="mt-4 text-primary font-semibold text-sm group-hover:underline">
                Start New Patient Form →
              </div>
            </div>
          </Link>

          {/* Follow-Up Card */}
          <Link
            href="/form?type=followup"
            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary overflow-hidden"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Follow-Up Visit</h3>
              <p className="text-gray-body text-sm">
                Shorter form for returning patients. Update your information and
                describe any changes since your last visit.
              </p>
              <div className="mt-4 text-primary font-semibold text-sm group-hover:underline">
                Start Follow-Up Form →
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-border p-6">
          <h3 className="font-bold text-gray-900 mb-3">Before Your Appointment</h3>
          <ul className="space-y-2 text-gray-body text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              Please arrive at least 15 minutes before your scheduled appointment
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              Bring your insurance card and a photo ID
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              If you need to cancel, please call at least 24 hours in advance
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              A $25 fee applies for missed appointments without 24-hour notice
            </li>
          </ul>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 text-center text-xs text-gray-body">
          <p>
            Your information is protected under HIPAA. We use encryption to secure your data
            both in transit and at rest. This form is for medical intake purposes only.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-deep text-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} {brand.practice.name}. All rights reserved.</p>
          <p className="mt-1">{brand.practice.locations[0].address}, {brand.practice.locations[0].city} | {brand.practice.phone}</p>
        </div>
      </footer>
    </div>
  );
}