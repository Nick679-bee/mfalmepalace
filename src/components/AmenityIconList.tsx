import React from "react";
import { Wifi, Monitor, Dog, Car } from "lucide-react";

const amenities = [
  { icon: Wifi, label: "Wi‑Fi" },
  { icon: Monitor, label: "Smart TV" },
  { icon: Dog, label: "Pet friendly" },
  { icon: Car, label: "Parking" },
];

const AmenityIconList: React.FC = () => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {amenities.map((a) => (
        <li key={a.label} className="flex items-center gap-2 p-3 rounded-md border bg-card hover-scale">
          <a.icon className="h-5 w-5 text-primary" aria-hidden />
          <span className="text-sm">{a.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default AmenityIconList;
