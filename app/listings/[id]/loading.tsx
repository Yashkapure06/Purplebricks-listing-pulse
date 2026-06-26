import { AppHeader } from "@/components/app-header";

/** Route-level loading skeleton */
export default function Loading() {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="h-4 w-24 animate-pulse rounded-md bg-black/8" />
        <div className="mt-4 space-y-2">
          <div className="h-7 w-72 animate-pulse rounded-md bg-black/8" />
          <div className="h-4 w-48 animate-pulse rounded-md bg-black/8" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-card-2" />
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-xl bg-card-2" />
          <div className="h-80 animate-pulse rounded-xl bg-card-2" />
        </div>
      </main>
    </div>
  );
}
