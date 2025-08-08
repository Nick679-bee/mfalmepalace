import React from "react";
import Layout from "@/components/layout/Layout";
import falls from "@/assets/koromosho-falls.jpg";

const Attractions: React.FC = () => (
  <Layout title="Local Attractions" description="Koromosho Falls, nightlife, and driving tips in Eldoret.">
    <section className="container mx-auto py-10 max-w-4xl grid md:grid-cols-2 gap-8 items-start">
      <img src={falls} alt="Koromosho Falls near Eldoret" className="rounded-lg w-full object-cover" />
      <div>
        <h1 className="font-display text-3xl mb-3">Koromosho Falls</h1>
        <p className="text-muted-foreground">A short drive from town — bring comfortable shoes and a camera. Evenings in Eldoret offer relaxed cafes and vibrant clubs downtown.</p>
      </div>
    </section>
  </Layout>
);

export default Attractions;
