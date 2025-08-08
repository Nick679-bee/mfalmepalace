import React from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

export type BookingDatePickerProps = {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  disabledDates?: Date[];
  className?: string;
};

const BookingDatePicker: React.FC<BookingDatePickerProps> = ({ selected, onSelect, disabledDates = [], className }) => {
  return (
    <div className={cn("p-3 pointer-events-auto", className)}>
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        disabled={disabledDates}
        numberOfMonths={2}
        defaultMonth={new Date()}
        captionLayout="dropdown-buttons"
      />
      <p className="mt-2 text-xs text-muted-foreground">Select check‑in and check‑out dates. Booked dates are disabled.</p>
    </div>
  );
};

export default BookingDatePicker;
