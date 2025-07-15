import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_FROM) {
    console.warn("Email sending is not configured. Skipping email.")
    console.log(`Simulating email to: ${to}, Subject: ${subject}`)
    return
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })
    console.log(`Email sent to ${to}`)
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error)
  }
}
