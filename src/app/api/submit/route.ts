import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate a submission ID
    const id = `INT-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const visitType = body.visitType === 'new' ? 'New Patient' : 'Follow-Up Visit';
    const patientName = body.demographics
      ? `${body.demographics.lastName || ''}, ${body.demographics.firstName || ''}`
      : body.patientName || 'Unknown';
    const dob = body.demographics?.dob || body.dob || 'Not provided';

    // Send email notification to the practice
    try {
      await resend.emails.send({
        from: 'Advanced Allergy Intake <info@confersolutions.ai>',
        to: ['swapnilvaidya@hotmail.com'],
        subject: `New ${visitType} Intake: ${patientName} (DOB: ${dob})`,
        text: `
INTAKE FORM SUBMISSION
======================
ID: ${id}
Type: ${visitType}
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}

PATIENT INFORMATION
-------------------
Name: ${patientName}
DOB: ${dob}
Email: ${body.demographics?.email || body.email || 'Not provided'}
Phone: ${body.demographics?.phone || 'Not provided'}

A PDF will be generated from the form data and attached in a future update.
For now, the full submission data can be viewed in the patient portal.

Submission ID: ${id}
        `,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the submission if email fails
    }

    return NextResponse.json({
      success: true,
      id,
      message: 'Intake form submitted successfully',
      patientName,
      visitType,
    });
  } catch (error) {
    console.error('Intake form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}