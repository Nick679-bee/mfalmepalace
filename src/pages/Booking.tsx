import React from "react";
import Layout from "@/components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import BookingDatePicker from "@/components/BookingDatePicker";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiCreateBooking, apiGetProperty, apiListProperties, type PropertySummary } from "@/lib/api";

function useQuery() { return new URLSearchParams(useLocation().search); }

const Booking: React.FC = () => {
  const q = useQuery();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = React.useState(1);
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [propertyId, setPropertyId] = React.useState<string>(q.get("propertyId") || "");
  const current = React.useMemo(() => properties.find((p) => String(p.id) === String(propertyId)), [properties, propertyId]);

  const [range, setRange] = React.useState<DateRange | undefined>();
  const [disabled, setDisabled] = React.useState<Date[]>([]);
  const [guestName, setGuestName] = React.useState("");
  const [promo, setPromo] = React.useState("");
  const [special, setSpecial] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await apiListProperties();
      if (!mounted) return;
      setProperties(data || []);
      if (!propertyId && data && data.length) setPropertyId(String(data[0].id));
    })();
    return () => { mounted = false; };
  }, []);

  React.useEffect(() => {
    if (!propertyId) return;
    let mounted = true;
    (async () => {
      const { data } = await apiGetProperty(propertyId);
      if (!mounted || !data) return;
      const blackout = data.availability?.blackout_dates || [];
      setDisabled(blackout.map((d) => new Date(d)));
    })();
    return () => { mounted = false; };
  }, [propertyId]);

  const nights = range?.from && range.to ? Math.ceil((+range.to - +range.from) / (1000*60*60*24)) : 0;

  async function onPay() {
    if (!range?.from || !range?.to || !propertyId) return;
    setLoading(true);
    try {
      const { error } = await apiCreateBooking({
        property_id: propertyId,
        check_in: range.from.toISOString().slice(0,10),
        check_out: range.to.toISOString().slice(0,10),
        guests_count: 1,
        special_requests: special,
      });
      if (error) throw new Error(error);
      toast({ title: "Booking created", description: `${guestName}, your request was submitted.` });
      navigate("/confirmation", { replace: false });
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
                {properties.map(p => <option key={p.id} value={String(p.id)}>{p.name}</option>)}
              </select>
              <div className="mt-4 flex justify-end"><Button onClick={()=>setStep(2)} disabled={!propertyId}>Next</Button></div>
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
                <li>Room: {current?.name || propertyId}</li>
                <li>Nights: {nights}</li>
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
