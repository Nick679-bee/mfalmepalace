import React from "react";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/mocks/api";

const Properties: React.FC = () => {
  return (
    <Layout title="Suites & Rates" description="Browse our 1‑ and 2‑bedroom suites with rates and amenities.">
      <section className="container mx-auto py-10">
        <h1 className="font-display text-3xl mb-6">Suites & Rates</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p as any} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Properties;
