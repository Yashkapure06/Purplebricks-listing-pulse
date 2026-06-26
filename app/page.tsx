import { AppHeader } from "@/components/app-header";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { PropertyCard } from "@/components/property-card";
import { listings } from "@/data/listings";

/** Portfolio overview - the seller's list of active listings. */
export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-5">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Your listings
          </h1>
          <p className="mt-1 text-sm text-muted">
            {listings.length} active properties · last updated today
          </p>
        </div>

        <PortfolioSummary listings={listings} />

        {listings.length === 0 ? (
          <div className="mt-8 rounded-xl border border-border bg-card-2 py-16 text-center">
            <p className="font-heading text-lg font-semibold">
              No active listings
            </p>
            <p className="mt-1 text-sm text-muted">
              When you list a property it will appear here.
            </p>
          </div>
        ) : (
          <section aria-label="Listings" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
