import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

// Simple rate limiting (in production, use Redis or database)
const emailAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting: max 3 emails per hour per IP
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    const attempts = emailAttempts.get(clientIP);
    
    if (attempts) {
      // Clean old attempts
      if (attempts.lastAttempt < hourAgo) {
        emailAttempts.delete(clientIP);
      } else if (attempts.count >= 3) {
        return NextResponse.json(
          { error: 'Too many email attempts. Please try again later.' },
          { status: 429 }
        );
      }
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      return NextResponse.json(
        { error: 'One or more fields exceed maximum length' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Basic spam detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'investment opportunity'];
    const messageContent = `${name} ${email} ${message}`.toLowerCase();
    if (spamKeywords.some(keyword => messageContent.includes(keyword))) {
      return NextResponse.json(
        { error: 'Message contains prohibited content' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailSubject = `Portfolio Contact Form: Message from ${name}`;
    const emailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div style="margin: 20px 0;">
          <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
          <div style="padding: 15px; background-color: #f5f5f5; border-left: 4px solid #007acc; white-space: pre-wrap; font-family: Arial, sans-serif;">
${message}
          </div>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This message was sent from your portfolio contact form.
        </p>
      </div>
    `;

    // Send email
    await sendEmail({
      subject: emailSubject,
      message: emailMessage,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER || 'your-email@example.com',
      reply_to: email,
    });

    // Update rate limiting
    const currentAttempts = emailAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
    emailAttempts.set(clientIP, {
      count: currentAttempts.count + 1,
      lastAttempt: now,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
