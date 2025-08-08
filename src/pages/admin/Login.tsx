import React from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("admin_email");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
    const token = localStorage.getItem("admin_token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Basic validation to trigger invalid-credentials toast
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const passwordOk = password.length >= 8;
    if (!emailOk || !passwordOk) {
      toast({ title: "Invalid credentials", description: "Please check your email or password.", variant: "destructive" as any });
      return;
    }
    setLoading(true);
    try {
      // Placeholder for real authentication request
      await new Promise((r) => setTimeout(r, 500));
      if (remember) localStorage.setItem("admin_email", email);
      else localStorage.removeItem("admin_email");
      // Simulate token issuance
      localStorage.setItem("admin_token", "mock-token");
      toast({
        title: "Welcome back",
        description: "You're now signed in as admin.",
        action: (
          <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>Open Dashboard</Button>
        ) as any,
      });
      navigate("/admin/dashboard");
    } catch (e: any) {
      toast({ title: "Login failed", description: e?.message || "Try again.", variant: "destructive" as any });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Admin Login" description="Admin access for managing bookings and pricing.">
      <section className="container mx-auto py-10 max-w-sm">
        <h1 className="font-display text-3xl mb-4">Admin</h1>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" type="password" aria-label="Password" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" checked={remember} onCheckedChange={(v:any)=>setRemember(!!v)} />
            <Label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</Label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
        </form>
      </section>
    </Layout>
  );
};

export default AdminLogin;
