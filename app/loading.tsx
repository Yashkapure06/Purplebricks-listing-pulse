import { AppHeader } from "@/components/app-header";

/** skeleton  loading component*/
export default function Loading() {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-5 space-y-2">
          <div className="h-7 w-40 animate-pulse rounded-md bg-black/8" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-black/8" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-card-2" />
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl bg-card-2" />
          ))}
        </div>
      </main>
    </div>
  );
}
