import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import BookingDatePicker from "@/components/BookingDatePicker";
import { Button } from "@/components/ui/button";
import { apiGetProperty, type PropertyDetail as ApiProperty } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import AmenityIconList from "@/components/AmenityIconList";
import { Leaf, Dog, Info } from "lucide-react";
import { formatKsh } from "@/lib/utils";

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const { data: property, isLoading: loading, error } = useQuery({
    queryKey: ["property", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await apiGetProperty(id as string);
      if (error) throw new Error(error);
      return data;
    },
  });
  const disabledDates = React.useMemo(() => {
    const blackout = property?.availability?.blackout_dates || [];
    return blackout.map((d) => new Date(d));
  }, [property]);

  if (loading) return (<Layout title="Loading"><div className="container mx-auto py-10">Loading…</div></Layout>);
  if (error) return (<Layout title="Error"><div className="container mx-auto py-10 text-destructive">{String((error as any)?.message || error)}</div></Layout>);
  if (!property) return (
    <Layout title="Suite not found"><div className="container mx-auto py-10">Not found</div></Layout>
  );

  return (
    <Layout title={property.name} description={`Details, photos and availability for ${property.name}.`}>
      <section className="container mx-auto py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <img src={property.photos?.[0] || "/images/interior.jpg"} alt={`${property.name} photo`} className="rounded-lg w-full object-cover" />
          <p className="mt-3 text-muted-foreground">Sleeps {property.max_guests}</p>
        </div>
        <div>
          <h1 className="font-display text-3xl mb-2">{property.name}</h1>
          {(() => {
            const nightly = typeof property.nightly_rate === 'number'
              ? property.nightly_rate
              : (typeof property.nightly_rate_cents === 'number' ? property.nightly_rate_cents / 100 : undefined);
            return nightly ? (
              <div className="mb-2 text-foreground font-medium">{formatKsh(nightly)} / night</div>
            ) : null;
          })()}
          <p className="text-sm text-muted-foreground mb-6">Flexible cancellation within 48 hours. Taxes included at checkout.</p>
          <div className="mb-6">
            <h2 className="font-display text-xl mb-3">Amenities</h2>
            <AmenityIconList
              items={[
                ...((property.amenities || []).map((label) => ({ label })) as any),
                ...(property.pet_friendly ? [{ icon: Dog, label: "Pet friendly" }] : []),
                ...(property.eco_friendly ? [{ icon: Leaf, label: "Eco‑friendly" }] : []),
              ]}
            />
          </div>
          <BookingDatePicker selected={undefined as any} onSelect={() => {}} disabledDates={disabledDates} />
          <div className="mt-4 flex gap-3">
            <Button asChild><Link to={`/booking?propertyId=${property.id}`}>Book Direct</Link></Button>
            <Button variant="secondary" asChild><Link to="/properties">Back to all</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PropertyDetail;
