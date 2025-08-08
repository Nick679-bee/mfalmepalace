import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { properties, getAvailability } from "@/mocks/api";
import BookingDatePicker from "@/components/BookingDatePicker";
import { Button } from "@/components/ui/button";

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const property = useMemo(() => properties.find((p) => p.id === id), [id]);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!id) return;
    getAvailability(id).then((res) => setDisabledDates(res.bookedDates));
  }, [id]);

  if (!property) return (
    <Layout title="Suite not found"><div className="container mx-auto py-10">Not found</div></Layout>
  );

  return (
    <Layout title={property.name} description={`Details, photos and availability for ${property.name}.`}>
      <section className="container mx-auto py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <img src={property.image} alt={`${property.name} photo`} className="rounded-lg w-full object-cover" />
          <p className="mt-3 text-muted-foreground">Ksh {property.nightlyRate.toLocaleString()} / night • Sleeps {property.occupancy}</p>
        </div>
        <div>
          <h1 className="font-display text-3xl mb-4">{property.name}</h1>
          <p className="text-sm text-muted-foreground mb-6">Flexible cancellation within 48 hours. Taxes included at checkout.</p>
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
