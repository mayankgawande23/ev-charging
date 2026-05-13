import { Link } from "react-router-dom";
import StatusBadge from "../UI/StatusBadge";
import { formatDistance } from "../../utils/formatters";

export default function StationCard({ station, onBookNow, onOpenDirections, onSelect }) {
  return (
    <article
      className="group rounded-[26px] border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"
      onMouseEnter={() => onSelect?.(station)}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold">{station.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{station.address}</p>
        </div>
        <StatusBadge tone="blue">{formatDistance(station.distance)}</StatusBadge>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <StatusBadge>{station.availableChargers}/{station.totalChargers} available</StatusBadge>
        <StatusBadge tone="orange">Rs {station.priceMin}-{station.priceMax}/kWh</StatusBadge>
      </div>
      <p className="text-sm text-slate-500">{station.chargerTypes.join(" • ")}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={`/stations/${station.id}`}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition hover:border-brand-green hover:text-brand-green dark:border-slate-700"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={() => onBookNow?.(station)}
          className="rounded-full bg-brand-green px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]"
        >
          Book Now
        </button>
        <button
          type="button"
          onClick={() => onOpenDirections?.(station)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium dark:border-slate-700"
        >
          Directions
        </button>
      </div>
    </article>
  );
}
