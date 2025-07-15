import type React from "react"
import { cn } from "@/lib/utils"

interface iPhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function iPhoneFrame({ children, className }: iPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto border-[10px] border-gray-800 dark:border-gray-200 bg-black rounded-[2.5rem] h-[600px] w-[300px] shadow-xl overflow-hidden",
        "before:content-[''] before:absolute before:w-[100px] before:h-[6px] before:bg-gray-800 dark:before:bg-gray-200 before:rounded-full before:top-4 before:left-1/2 before:-translate-x-1/2",
        "after:content-[''] after:absolute after:w-[30px] after:h-[30px] after:border-[6px] after:border-gray-800 dark:after:border-gray-200 after:rounded-full after:bottom-4 after:left-1/2 after:-translate-x-1/2",
        className,
      )}
    >
      <div className="absolute inset-[10px] rounded-[2rem] overflow-hidden bg-white dark:bg-gray-900 text-foreground">
        {children}
      </div>
    </div>
  )
}
