import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { formatKsh } from "@/lib/utils";

type CardProperty = {
  id: string | number;
  name: string;
  type: string;
  occupancy: number;
  image: string;
  nightlyRate?: number;
};

const PropertyCard: React.FC<{ property: CardProperty }> = ({ property }) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl" style={{ boxShadow: "var(--shadow-elevate)" }}>
      <img src={property.image} alt={`${property.name} suite in Eldoret`} loading="lazy" className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="font-display text-xl">{property.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {property.type.toUpperCase()} • Sleeps {property.occupancy}
          {typeof property.nightlyRate === 'number' && (
            <div className="mt-1 text-foreground font-medium">{formatKsh(property.nightlyRate)} / night</div>
          )}
        </div>
        <Button asChild variant="secondary">
          <NavLink to={`/properties/${property.id}`}>View</NavLink>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
