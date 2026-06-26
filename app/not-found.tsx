import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";

/** Shown for unknown listing ids (via notFound()) and any unmatched route. */
export default function NotFound() {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto grid max-w-6xl place-items-center px-4 py-24 text-center sm:px-6">
        <p className="font-heading text-5xl font-semibold text-accent">404</p>
        <h1 className="mt-3 font-heading text-xl font-semibold">
          Listing not found
        </h1>
        <p className="mt-1 max-w-sm text-sm text-muted">
          We couldn&apos;t find that listing. It may have been removed or the link
          is incorrect.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Back to your listings</Link>
        </Button>
      </main>
    </div>
  );
}
