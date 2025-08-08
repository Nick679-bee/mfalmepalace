import React from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminLogin: React.FC = () => (
  <Layout title="Admin Login" description="Admin access for managing bookings and pricing.">
    <section className="container mx-auto py-10 max-w-sm">
      <h1 className="font-display text-3xl mb-4">Admin</h1>
      <div className="grid gap-3">
        <Input placeholder="Email" aria-label="Email" />
        <Input placeholder="Password" type="password" aria-label="Password" />
        <Button>Sign in</Button>
      </div>
    </section>
  </Layout>
);

export default AdminLogin;
