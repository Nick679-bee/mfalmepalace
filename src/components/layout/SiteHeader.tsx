import React from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/attractions", label: "Attractions" },
  { to: "/contact", label: "Contact" },
];

const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/images/logo-mfalme.png" alt="Mfalme Palace logo" className="h-9 w-9" loading="lazy"/>
          <span className="font-display text-xl">Mfalme Palace</span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end className={({isActive}) => isActive ? "text-primary" : "text-foreground/80 hover:text-foreground story-link"}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild>
            <NavLink to="/booking">Book Direct</NavLink>
          </Button>
          <Button asChild variant="outline">
            <NavLink to="/admin">Admin</NavLink>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
