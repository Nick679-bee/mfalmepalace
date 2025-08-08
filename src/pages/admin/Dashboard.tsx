import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { getBookings } from "@/mocks/api";

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(()=>{ getBookings().then(setBookings); },[]);

  return (
    <Layout title="Admin Dashboard" description="Overview of upcoming stays and payments.">
      <section className="container mx-auto py-10">
        <h1 className="font-display text-3xl mb-6">Dashboard</h1>
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
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.guestName}</td>
                  <td className="p-2">{b.propertyId}</td>
                  <td className="p-2">{b.checkIn}</td>
                  <td className="p-2">{b.checkOut}</td>
                  <td className="p-2 capitalize">{b.status}</td>
                  <td className="p-2 text-right">Ksh {b.total.toLocaleString()}</td>
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
