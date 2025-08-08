import React from "react";
import { Wifi, Monitor, Dog, Car } from "lucide-react";

type AmenityItem = {
  icon?: React.ComponentType<any>;
  label: string;
};

const defaultAmenities: AmenityItem[] = [
  { icon: Wifi, label: "Wi‑Fi" },
  { icon: Monitor, label: "Smart TV" },
  { icon: Dog, label: "Pet friendly" },
  { icon: Car, label: "Parking" },
];

const AmenityIconList: React.FC<{ items?: AmenityItem[] }> = ({ items }) => {
  const list = items && items.length > 0 ? items : defaultAmenities;
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {list.map((a) => {
        const Icon = a.icon;
        return (
          <li key={a.label} className="flex items-center gap-2 p-3 rounded-md border bg-card hover-scale">
            {Icon ? <Icon className="h-5 w-5 text-primary" aria-hidden /> : null}
            <span className="text-sm">{a.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default AmenityIconList;
