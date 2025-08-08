import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Styleguide: React.FC = () => (
  <Layout title="Component Catalogue" description="Preview of UI components and tokens.">
    <section className="container mx-auto py-10 space-y-6">
      <h1 className="font-display text-3xl">UI Catalogue</h1>
      <div className="flex gap-3 items-center">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <p className="text-muted-foreground">Tokens: primary, secondary, accent using Mustard, Burnt Orange, Coral.</p>
    </section>
  </Layout>
);

export default Styleguide;
