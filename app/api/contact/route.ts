import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { sendEmail } from "@/lib/email"

// Handle contact form submission
export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const newContactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: `Thank you for your message to MJDAT Solutions - ${subject}`,
      html: `<h1>Dear ${name},</h1><p>Thank you for contacting MJDAT Solutions. We have received your message regarding "${subject}" and will get back to you within 24-48 hours.</p><p>Your message: <em>"${message}"</em></p><p>Best regards,<br/>The MJDAT Solutions Team</p>`,
    })

    // Send notification email to admin (or dedicated contact email)
    await sendEmail({
      to: process.env.EMAIL_FROM || "admin@example.com", // Replace with actual admin email
      subject: `New Contact Message: ${subject} from ${name}`,
      html: `<h1>New Contact Message Received!</h1><p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p><p>Please log in to the admin dashboard to manage contact messages.</p>`,
    })

    return NextResponse.json({ message: "Message sent successfully", data: newContactMessage }, { status: 201 })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
