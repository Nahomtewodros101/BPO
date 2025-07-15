import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import prisma from "@/lib/db"
import { Role } from "@prisma/client" // Updated import

// Get all users (Admin only)
export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update user role (Admin only)
export async function PUT(request: Request) {
  try {
    const authUser = await getAuthenticatedUser(request)
    if (!authUser || authUser.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id, role } = await request.json()

    if (!id || !role || !["user", "admin"].includes(role)) {
      // Updated enum values
      return NextResponse.json({ message: "User ID and valid role are required" }, { status: 400 })
    }

    // Prevent admin from changing their own role or deleting themselves via this endpoint
    if (authUser.id === id && role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Cannot demote your own admin role" }, { status: 403 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, firstName: true, lastName: true, email: true, role: true },
    })

    return NextResponse.json({ message: "User role updated successfully", user: updatedUser }, { status: 200 })
  } catch (error) {
    console.error("Error updating user role:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete a user (Admin only)
export async function DELETE(request: Request) {
  try {
    const authUser = await getAuthenticatedUser(request)
    if (!authUser || authUser.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Prevent admin from deleting themselves
    if (authUser.id === id) {
      return NextResponse.json({ message: "Cannot delete your own account" }, { status: 403 })
    }

    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
