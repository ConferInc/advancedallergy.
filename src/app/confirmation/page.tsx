"use client";

import { brand } from "@/lib/brand";

export default function ConfirmationPage() {
  // In production, we'd get submission details from the server
  // For now, render the confirmation UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="bg-primary-deep text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Submission Complete!</h1>
          <p className="text-primary-accent">Your intake form has been submitted successfully.</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl mt-0.5">✓</span>
              <span>Our staff will review your information before your appointment.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl mt-0.5">✓</span>
              <span>If we have any questions, we will contact you at the phone number or email you provided.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl mt-0.5">✓</span>
              <span>Please bring a <strong>photo ID</strong> and your <strong>insurance card</strong> to your appointment.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Download Your Form</h2>
          <p className="text-gray-600 mb-4">
            Download a copy of your completed intake form for your records.
          </p>
          <button
            onClick={() => {
              // PDF generation will be handled client-side in V2
              alert('PDF download will be available when you return for your appointment. Our staff will have your form on file.');
            }}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            📄 Download PDF (Coming Soon)
          </button>
        </div>

        <div className="bg-primary/5 rounded-xl p-6 text-center">
          <h3 className="font-bold text-gray-900 mb-2">Need to make changes?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Contact our office and we can update your information.
          </p>
          <div className="text-primary font-semibold">
            <p>{brand.practice.phone}</p>
            <p className="text-sm text-gray-500">{brand.practice.locations[0].address}</p>
            <p className="text-sm text-gray-500">{brand.practice.locations[0].city}</p>
          </div>
        </div>
      </main>

      <footer className="bg-primary-deep text-white mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} {brand.practice.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}