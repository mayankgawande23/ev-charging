import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import BookingCard from "../Booking/BookingCard";
import SectionCard from "../UI/SectionCard";
import { bookingTabs } from "../../utils/constants";

export default function Bookings() {
  const bookings = useSelector((state) => state.bookings.bookings);
  const [tab, setTab] = useState("All");

  const filtered = useMemo(() => {
    if (tab === "All") return bookings;
    return bookings.filter((booking) => booking.status === tab);
  }, [bookings, tab]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Your bookings</h1>
          <p className="mt-2 text-slate-500">Track active sessions, upcoming reservations, and past charging history.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {bookingTabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                tab === item
                  ? "bg-brand-green text-white"
                  : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <SectionCard>
        <div className="space-y-4">
          {filtered.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
