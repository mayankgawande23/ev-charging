import { LinearProgress } from "@mui/material";
import StatusBadge from "../UI/StatusBadge";
import { formatCurrency } from "../../utils/formatters";

export default function BookingCard({ booking }) {
  const tone = booking.status === "Active" ? "green" : booking.status === "Upcoming" ? "blue" : "orange";

  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl font-semibold">{booking.stationName}</h3>
            <StatusBadge tone={tone}>{booking.status}</StatusBadge>
          </div>
          <p className="mt-2 text-sm text-slate-500">{booking.charger}</p>
          <p className="mt-1 text-sm text-slate-500">
            {booking.vehicleName} • {booking.vehicleNumber}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {booking.date} • {booking.startTime} - {booking.endTime}
          </p>
        </div>
        <p className="text-lg font-semibold">{formatCurrency(booking.price)}</p>
      </div>
      {booking.status === "Active" && (
        <div className="mt-4">
          <LinearProgress variant="determinate" value={booking.progress} sx={{ borderRadius: 999 }} />
          <p className="mt-2 text-sm text-slate-500">{booking.progress}% complete</p>
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="rounded-full bg-brand-green px-4 py-2 text-sm font-medium text-white">View Station</button>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium dark:border-slate-700">Modify</button>
        <button className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-500">Cancel</button>
      </div>
    </div>
  );
}
