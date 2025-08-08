import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Confirmation: React.FC = () => (
  <Layout title="Booking Confirmed" description="Your booking is confirmed.">
    <section className="container mx-auto py-16 text-center max-w-xl">
      <h1 className="font-display text-4xl mb-3">Asante! Your booking is confirmed</h1>
      <p className="text-muted-foreground mb-6">We’ve sent a confirmation email with your details. See you soon in Eldoret.</p>
      <div className="flex justify-center gap-3">
        <Button asChild><a href="/">Back to Home</a></Button>
        <Button variant="secondary" asChild><a href="/contact">Need help?</a></Button>
      </div>
    </section>
  </Layout>
);

export default Confirmation;
