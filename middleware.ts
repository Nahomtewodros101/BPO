import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value

  // Allow access to public routes
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/api/auth") ||
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/services") ||
    request.nextUrl.pathname.startsWith("/careers") ||
    request.nextUrl.pathname.startsWith("/news") ||
    request.nextUrl.pathname.startsWith("/about") ||
    request.nextUrl.pathname.startsWith("/support") ||
    request.nextUrl.pathname.startsWith("/contact") ||
    request.nextUrl.pathname.startsWith("/privacy-policy") ||
    request.nextUrl.pathname.startsWith("/terms-of-service") ||
    request.nextUrl.pathname.startsWith("/apply") || // Allow public access to job application pages
    request.nextUrl.pathname.startsWith("/_next") || // Next.js internal routes
    request.nextUrl.pathname.startsWith("/favicon.ico") ||
    request.nextUrl.pathname.startsWith("/placeholder.svg")
  ) {
    return NextResponse.next()
  }

  if (!token) {
    // Redirect to login if no token and trying to access protected route
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const { userId, role } = await verifyToken(token)

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (role !== UserRole.ADMIN) {
        // Redirect to home or a 403 page if not an admin
        return NextResponse.redirect(new URL("/", request.url))
      }
    }

    // If token is valid and role is authorized, proceed
    return NextResponse.next()
  } catch (error) {
    console.error("Middleware token verification failed:", error)
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.set("auth_token", "", { maxAge: 0, path: "/" })
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (e.g. /images)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:png|jpg|jpeg|gif|webp|svg|mp3|glb|gltf)$).*)",
  ],
}
