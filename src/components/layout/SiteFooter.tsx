import React from "react";

const SiteFooter: React.FC = () => {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg mb-2">Mfalme Palace BnB</h3>
          <p className="text-sm text-muted-foreground">Serene, eco-friendly boutique stays in Eldoret.</p>
          <p className="mt-3 text-sm">Booking support: <a href="tel:+254700000000" className="story-link">+254 700 000 000</a></p>
          <p className="text-sm">Email: <a href="mailto:hello@mfalmepalace.co.ke" className="story-link">hello@mfalmepalace.co.ke</a></p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/properties" className="hover:underline">Properties</a></li>
            <li><a href="/about" className="hover:underline">Sustainability</a></li>
            <li><a href="/attractions" className="hover:underline">Local attractions</a></li>
            <li><a href="/contact" className="hover:underline">Contact & FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><a className="hover:underline" href="#">Privacy</a></li>
            <li><a className="hover:underline" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mfalme Palace — Eldoret, Kenya
      </div>
    </footer>
  );
};

export default SiteFooter;
