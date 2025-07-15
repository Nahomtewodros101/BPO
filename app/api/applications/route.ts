import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { uploadFileToBlob } from "@/lib/blob";
import { sendEmail } from "@/lib/email";

// Handle job application submission (User only)
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const jobId = formData.get("jobId") as string;
    const cvFile = formData.get("cv") as File;
    const coverLetterFile = formData.get("coverLetter") as File | null;

    if (!jobId || !cvFile) {
      return NextResponse.json(
        { message: "Job ID and CV are required" },
        { status: 400 }
      );
    }

    const job = await prisma.jobOpening.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json(
        { message: "Job opening not found" },
        { status: 404 }
      );
    }

    // Check if user has already applied for this job
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: user.id,
        jobId: jobId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this job." },
        { status: 409 }
      );
    }

    const cvUrl = await uploadFileToBlob(
      cvFile,
      `applications/${user.id}/${jobId}/cv-${cvFile.name}`
    );
    let coverLetterUrl: string | undefined;

    if (coverLetterFile) {
      coverLetterUrl = await uploadFileToBlob(
        coverLetterFile,
        `applications/${user.id}/${jobId}/coverletter-${coverLetterFile.name}`
      );
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId: user.id,
        cvUrl,
        coverLetterUrl,
        status: "Pending",
      },
    });

    // Send email to applicant
    await sendEmail({
      to: user.email,
      subject: `Application Received for ${job.title}`,
      html: `<h1>Dear ${user.firstName},</h1><p>Your application for the position of <strong>${job.title}</strong> has been successfully received.</p><p>We will review your application and get back to you soon.</p><p>Best regards,<br/>The MJDAT Solutions Team</p>`,
    });

    // Send email to admin (or relevant department)
    const adminUser = await prisma.user.findUnique({
      where: { id: job.adminId },
    });
    if (adminUser) {
      await sendEmail({
        to: adminUser.email,
        subject: `New Application for ${job.title}`,
        html: `<h1>New Job Application!</h1><p>A new application has been submitted for the position of <strong>${job.title}</strong> by ${user.firstName} ${user.lastName} (${user.email}).</p><p>Please log in to the admin dashboard to review the application.</p>`,
      });
    }

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
