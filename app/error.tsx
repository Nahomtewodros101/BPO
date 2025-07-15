"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h2 className="mb-4 text-3xl font-bold text-destructive">
        Something went wrong!
      </h2>
      <p className="mb-6 text-muted-foreground">
        We apologize for the inconvenience. Please try again later.
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="bg-emerald-500 hover:bg-emerald-600"
      >
        Try again
      </Button>
    </div>
  );
}
