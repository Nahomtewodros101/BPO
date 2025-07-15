import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { sendEmail } from "@/lib/email";

// Get all announcements (Admin only)
export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user || user.role !== Role.admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ announcements }, { status: 200 });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new announcement (Admin only)
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user || user.role !== Role.admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, type, priority, published } = await request.json();

    if (!title || !content || !type || !priority) {
      return NextResponse.json(
        { message: "All required fields are missing" },
        { status: 400 }
      );
    }

    const newAnnouncement = await prisma.announcement.create({
      data: {
        title,
        content,
        type,
        priority,
        published,
        userId: user.id,
      },
    });

    if (published) {
      // Optionally send email to users about new announcement
      await sendEmail({
        to: user.email, // Placeholder, ideally to a mailing list
        subject: `New Announcement: ${newAnnouncement.title}`,
        html: `<h1>New Announcement from MJDAT Solutions!</h1><p>${newAnnouncement.content}</p>`,
      });
    }

    return NextResponse.json(
      {
        message: "Announcement created successfully",
        announcement: newAnnouncement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update an announcement (Admin only)
export async function PUT(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user || user.role !== Role.admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, title, content, type, priority, published } =
      await request.json();

    if (!id || !title || !content || !type || !priority) {
      return NextResponse.json(
        { message: "All required fields are missing" },
        { status: 400 }
      );
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: { id },
      data: { title, content, type, priority, published },
    });

    return NextResponse.json(
      {
        message: "Announcement updated successfully",
        announcement: updatedAnnouncement,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete an announcement (Admin only)
export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user || user.role !== Role.admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Announcement ID is required" },
        { status: 400 }
      );
    }

    await prisma.announcement.delete({ where: { id } });

    return NextResponse.json(
      { message: "Announcement deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
