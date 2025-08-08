import React from "react";
import Layout from "@/components/layout/Layout";

const About: React.FC = () => (
  <Layout title="About & Sustainability" description="Our eco practices, serene environment, and travel tips for Eldoret.">
    <section className="container mx-auto py-10 max-w-3xl space-y-4">
      <h1 className="font-display text-3xl">About Mfalme Palace</h1>
      <p className="text-muted-foreground">We believe in thoughtful hospitality with a light footprint. Expect energy‑efficient lighting, water‑saving fixtures, recycling, and support for local artisans in our decor.</p>
      <p className="text-muted-foreground">We’re located ~20 minutes from Eldoret Airport. Ask about our airport transfer info and neighborhood tips.</p>
    </section>
  </Layout>
);

export default About;
