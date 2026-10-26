import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, message, guestName } = await request.json();

    const data = await resend.emails.send({
      from: 'Goshen Camp <info@goshencamp.com>',
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #2C2A25; max-width: 600px; line-height: 1.6;">
          <p>Dear ${guestName},</p>
          
          <p>${message.replace(/\n/g, '<br/>')}</p>
          
          <br/>
          <p>Warm regards,<br/><strong>The Goshen Reservations Team</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="font-size: 13px; color: #6b7280; margin: 0; line-height: 1.8;">
            For further inquiries or immediate assistance, please feel free to reach out to us:<br/><br/>
            <strong>Email:</strong> <a href="mailto:info@goshencamp.com" style="color: #591C27; text-decoration: none;">info@goshencamp.com</a><br/>
            <strong>Call / WhatsApp:</strong> <a href="https://wa.me/254721753593" style="color: #591C27; text-decoration: none;">+254 721 753 593</a><br/>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}