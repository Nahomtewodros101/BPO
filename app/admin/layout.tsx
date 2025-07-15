"use client"

import type React from "react"
import Link from "next/link"
import { Home, Briefcase, Users, MessageSquare, Newspaper, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { redirect } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Loading admin panel...</p>
      </div>
    )
  }

  if (!user || user.role !== "ADMIN") {
    redirect("/login") // Redirect non-admins
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-400">Admin Panel</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/jobs" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors">
                <Briefcase className="mr-3 h-5 w-5" />
                Job Openings
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Users className="mr-3 h-5 w-5" />
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/messages"
                className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Contact Messages
              </Link>
            </li>
            <li>
              <Link href="/admin/news" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors">
                <Newspaper className="mr-3 h-5 w-5" />
                News & Announcements
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <Button onClick={logout} className="w-full bg-red-600 hover:bg-red-700 text-white">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
          <Link href="/" className="mt-4 flex items-center justify-center text-sm text-gray-400 hover:text-emerald-400">
            <Home className="mr-2 h-4 w-4" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">
              Welcome, {user?.firstName} {user?.lastName}
            </span>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}
