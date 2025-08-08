import React, { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { getAvailability, properties, createBooking } from "@/mocks/api";
import BookingDatePicker from "@/components/BookingDatePicker";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

function useQuery() { return new URLSearchParams(useLocation().search); }

const Booking: React.FC = () => {
  const q = useQuery();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [propertyId, setPropertyId] = useState(q.get("propertyId") || properties[0].id);
  const property = useMemo(() => properties.find((p) => p.id === propertyId)!, [propertyId]);

  const [range, setRange] = useState<DateRange | undefined>();
  const [disabled, setDisabled] = useState<Date[]>([]);
  const [guestName, setGuestName] = useState("");
  const [promo, setPromo] = useState("");
  const [special, setSpecial] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    getAvailability(propertyId).then((res) => setDisabled(res.bookedDates));
  }, [propertyId]);

  const nights = range?.from && range.to ? Math.ceil((+range.to - +range.from) / (1000*60*60*24)) : 0;
  const subtotal = nights * property.nightlyRate;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

  async function onPay() {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // optimistic UI simulation
      const res = await createBooking();
      if (res.ok) {
        toast({ title: "Booking confirmed", description: `${guestName}, your stay is booked!` });
        navigate("/confirmation", { replace: false });
      } else {
        throw new Error("Payment failed");
      }
    } catch (e:any) {
      toast({ title: "Payment error", description: e.message, variant: "destructive" as any });
    } finally { setLoading(false); }
  }

  return (
    <Layout title="Book Your Stay" description="Select room, dates, and complete your booking.">
      <section className="container mx-auto py-10 max-w-4xl">
        <h1 className="font-display text-3xl mb-6">Book your stay</h1>

        <div className="grid gap-6">
          {step === 1 && (
            <div className="animate-enter">
              <label className="block text-sm mb-2">Choose room</label>
              <select className="w-full border rounded-md p-2 bg-background" value={propertyId} onChange={(e)=>setPropertyId(e.target.value)} aria-label="Choose room">
                {properties.map(p => <option key={p.id} value={p.id}>{p.name} — Ksh {p.nightlyRate.toLocaleString()}/night</option>)}
              </select>
              <div className="mt-4 flex justify-end"><Button onClick={()=>setStep(2)}>Next</Button></div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-enter">
              <label className="block text-sm mb-2">Select dates</label>
              <BookingDatePicker selected={range} onSelect={setRange} disabledDates={disabled} />
              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <span>Nights: {nights}</span>
                <Button variant="secondary" onClick={()=>setStep(1)}>Back</Button>
                <Button onClick={()=>setStep(3)} disabled={!nights}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-enter grid gap-4">
              <div>
                <label className="block text-sm mb-1">Guest name</label>
                <Input value={guestName} onChange={(e)=>setGuestName(e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm mb-1">Promo code</label>
                <Input value={promo} onChange={(e)=>setPromo(e.target.value)} placeholder="Optional" />
              </div>
              <div>
                <label className="block text-sm mb-1">Special requests</label>
                <Textarea value={special} onChange={(e)=>setSpecial(e.target.value)} placeholder="Any special requests?" />
              </div>
              <div className="flex justify-between">
                <Button variant="secondary" onClick={()=>setStep(2)}>Back</Button>
                <Button onClick={()=>setStep(4)} disabled={!guestName}>Next</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-enter">
              <h2 className="font-display text-2xl mb-3">Review & Pay</h2>
              <ul className="text-sm text-muted-foreground mb-4">
                <li>Room: {property.name}</li>
                <li>Nights: {nights}</li>
                <li>Subtotal: Ksh {subtotal.toLocaleString()}</li>
                <li>Taxes & fees: Ksh {taxes.toLocaleString()}</li>
                <li className="text-foreground font-medium">Total: Ksh {total.toLocaleString()}</li>
              </ul>
              <div className="flex justify-between">
                <Button variant="secondary" onClick={()=>setStep(3)}>Back</Button>
                <Button onClick={onPay} disabled={loading || !nights || !guestName}>{loading ? "Processing…" : "Pay & Confirm"}</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
