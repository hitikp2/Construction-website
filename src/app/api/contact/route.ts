import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please provide a valid email address.'),
  phone: z.string().min(1, 'Phone number is required.'),
  serviceType: z.string().min(1, 'Please select a service type.'),
  address: z.string().min(1, 'Address is required.'),
  budget: z.string().min(1, 'Please select a budget range.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ errors }, { status: 400 });
    }

    // In production, this would integrate with an email service (SendGrid,
    // Resend, etc.) or a CRM (HubSpot, Salesforce, etc.) to forward the
    // lead. For now we simply acknowledge receipt.

    console.log('New contact form submission:', result.data);

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
