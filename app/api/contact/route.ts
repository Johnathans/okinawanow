import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'okinawarentals@gmail.com',
                pass: process.env.EMAIL_PASSWORD // Set this in your .env file
            }
        });

        // Email content
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: 'okinawarentals@gmail.com',
            subject: `Contact Form: ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `,
            html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ 
            message: 'Email sent successfully' 
        }, { status: 200 });

    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json({ 
            error: 'Failed to send email' 
        }, { status: 500 });
    }
}
