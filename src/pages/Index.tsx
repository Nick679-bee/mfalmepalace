import React from "react";
import Layout from "@/components/layout/Layout";
import { NavLink } from "react-router-dom";
import AmenityIconList from "@/components/AmenityIconList";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/mocks/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <Layout title="Eldoret Boutique Stay" description="Serene, eco‑friendly, pet‑friendly boutique BnB in Eldoret. 20 min to the airport.">
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'var(--gradient-hero)' }} aria-hidden />
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center py-12 md:py-20">
          <div className="space-y-6 animate-enter">
            <h1 className="font-display text-4xl md:text-5xl leading-tight">Mfalme Palace — Boutique BnB in Eldoret</h1>
            <p className="text-lg text-muted-foreground">Cozy 1‑ and 2‑bedroom stays near Koromosho Falls. Serene, eco‑friendly, and pet‑friendly. Only 20 minutes to Eldoret Airport.</p>
            <div className="flex gap-3">
              <Button size="lg" asChild className="transition-transform duration-200 hover:scale-105 hover:shadow-md">
                <NavLink to="/booking">Book Direct</NavLink>
              </Button>
              <Button size="lg" variant="secondary" asChild className="transition-transform duration-200 hover:scale-105 hover:shadow-md">
                <NavLink to="/properties">See Rooms</NavLink>
              </Button>
            </div>
            <div className="flex gap-2">
              <Badge>Eco‑friendly</Badge>
              <Badge variant="outline">Pet friendly</Badge>
              <Badge variant="secondary">Serene</Badge>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <img src="/images/hero-eldoret.jpg" alt="Mfalme Palace boutique interior in Eldoret" className="rounded-lg shadow-lg w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 md:py-16">
        <h2 className="font-display text-2xl mb-6">Amenities</h2>
        <AmenityIconList />
      </section>

      <section className="container mx-auto py-12 md:py-16">
        <h2 className="font-display text-2xl mb-6">Suites</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img src="/images/koromosho-falls.jpg" alt="Koromosho Falls near Eldoret" className="rounded-lg shadow-lg w-full object-cover" loading="lazy" />
          <div>
            <h3 className="font-display text-2xl mb-3">Koromosho Falls</h3>
            <p className="text-muted-foreground">A must‑see attraction during your stay. Ask us for tips and directions. Perfect for a serene afternoon walk.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
