import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-emerald-500">404</h1>
      <h2 className="mb-4 text-3xl font-bold">Page Not Found</h2>
      <p className="mb-6 text-muted-foreground">Could not find the requested resource.</p>
      <Link href="/">
        <Button className="bg-emerald-500 hover:bg-emerald-600">Return Home</Button>
      </Link>
    </div>
  )
}
