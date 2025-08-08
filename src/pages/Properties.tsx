import React from "react";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/PropertyCard";
import { apiListProperties, type PropertySummary } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const Properties: React.FC = () => {
  const { data: items = [], isLoading: loading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await apiListProperties();
      if (error) throw new Error(error);
      return data;
    },
  });

  return (
    <Layout title="Suites & Rates" description="Browse our 1‑ and 2‑bedroom suites with rates and amenities.">
      <section className="container mx-auto py-10">
        <h1 className="font-display text-3xl mb-6">Suites & Rates</h1>
        <p className="text-sm text-muted-foreground mb-4">Prices are shown in Ksh. Taxes included at checkout.</p>
        {loading && <div className="text-sm text-muted-foreground">Loading properties…</div>}
        {error && <div className="text-sm text-destructive">{String((error as any)?.message || error)}</div>}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((p) => (
              <PropertyCard key={p.id} property={{
                id: String(p.id),
                name: p.name,
                type: p.type === 'one_bed' ? '1-bedroom' : '2-bedroom',
                nightlyRate: typeof (p as any).nightly_rate === 'number'
                  ? (p as any).nightly_rate
                  : (typeof (p as any).nightly_rate_cents === 'number' ? (p as any).nightly_rate_cents / 100 : undefined),
                occupancy: p.max_guests,
                image: p.photos?.[0] || "/images/interior.jpg",
              }} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Properties;
