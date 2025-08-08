import React from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact: React.FC = () => (
  <Layout title="Contact & FAQ" description="Reach us by form, phone, or email. Map and quick answers.">
    <section className="container mx-auto py-10 max-w-3xl space-y-6">
      <h1 className="font-display text-3xl">Contact us</h1>
      <form className="grid gap-4">
        <Input placeholder="Your name" aria-label="Your name" />
        <Input placeholder="Email" aria-label="Your email" />
        <Textarea placeholder="How can we help?" aria-label="Message" />
        <Button type="button">Send</Button>
      </form>
      <div className="aspect-video w-full rounded-lg overflow-hidden border">
        <iframe title="Map" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Eldoret%2C+Kenya&output=embed"></iframe>
      </div>
    </section>
  </Layout>
);

export default Contact;
