import Link from "next/link";

export function AppHeader({ userName = "Yash Kapure" }: { userName?: string }) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Purplebricks Listing Pulse home"
        >
          {/* use logo */}
          <img
            src="https://images.ctfassets.net/5s3t4edgcibj/3ejGNo4EfyMZIXNFQqUVkA/c687b4c04eff9fe3e2b55c3bbbb72a25/pb-logo-inline-2026.svg"
            alt="Purplebricks Listing Pulse logo"
            className="h-8 w-1/2"
          />
          <span className="font-heading text-lg font-semibold tracking-tight">
            Listing Pulse
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted sm:inline">
            {userName}
          </span>
          <span
            className="grid size-9 place-items-center rounded-full bg-accent/10 text-xs font-medium text-accent"
            aria-hidden="true"
          >
            {initials}
          </span>
        </div>
      </div>
    </header>
  );
}
