import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { apiListBookings, apiDeleteBooking, apiCreateBooking } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatKsh } from "@/lib/utils";

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [guestName, setGuestName] = useState("");
  const [propertyId, setPropertyId] = useState("p1");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState<number>(0);
  useEffect(()=>{ apiListBookings().then(({data})=>setBookings(data || [])); },[]);

  async function onDelete(id: string) {
    const { error } = await apiDeleteBooking(id);
    if (!error) {
      setBookings(b => b.filter(x => x.id !== id));
      toast({ title: "Booking removed" });
    }
  }

  async function onAdd() {
    if (!guestName || !propertyId || !checkIn || !checkOut || !total) {
      toast({ title: "Missing info", description: "Fill all fields to add a booking.", variant: "destructive" as any });
      return;
    }
    const { data, error } = await apiCreateBooking({
      property_id: propertyId,
      check_in: checkIn,
      check_out: checkOut,
      guests_count: 1,
      special_requests: `Admin created for ${guestName}`,
    });
    if (!error && data) {
      setBookings(b => [data, ...b]);
      setGuestName(""); setPropertyId("p1"); setCheckIn(""); setCheckOut(""); setTotal(0);
      toast({ title: "Booking added" });
    }
  }

  return (
    <Layout title="Admin Dashboard" description="Overview of upcoming stays and payments.">
      <section className="container mx-auto py-10">
        <h1 className="font-display text-3xl mb-6">Dashboard</h1>
        <div className="mb-4 flex justify-between items-end gap-4 flex-wrap">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 flex-1 min-w-[280px]">
            <Input placeholder="Guest name" value={guestName} onChange={(e)=>setGuestName(e.target.value)} />
            <Input placeholder="Property ID (e.g., p1)" value={propertyId} onChange={(e)=>setPropertyId(e.target.value)} />
            <Input type="date" placeholder="Check-in" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
            <Input type="date" placeholder="Check-out" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} />
            <Input type="number" placeholder="Total (Ksh)" value={total || ''} onChange={(e)=>setTotal(Number(e.target.value))} />
          </div>
          <div className="flex gap-2">
            <Button onClick={onAdd}>Add booking</Button>
            <Button variant="outline" onClick={() => { localStorage.removeItem("admin_token"); window.location.href = "/admin"; }}>Sign out</Button>
          </div>
        </div>
        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-2">Guest</th>
                <th className="text-left p-2">Property</th>
                <th className="text-left p-2">Check‑in</th>
                <th className="text-left p-2">Check‑out</th>
                <th className="text-left p-2">Status</th>
                <th className="text-right p-2">Total</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b:any) => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.user_id || guestName || "—"}</td>
                  <td className="p-2">{b.property_id}</td>
                  <td className="p-2">{b.check_in}</td>
                  <td className="p-2">{b.check_out}</td>
                  <td className="p-2 capitalize">{b.status}</td>
                  <td className="p-2 text-right">{formatKsh((b.price_cents || 0)/100)}</td>
                  <td className="p-2 text-right"><Button variant="outline" size="sm" onClick={()=>onDelete(b.id)}>Remove</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
