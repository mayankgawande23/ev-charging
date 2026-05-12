import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import SectionCard from "../UI/SectionCard";
import AmenityBadge from "../Station/AmenityBadge";
import ReviewCard from "../Station/ReviewCard";

const chargerRows = [
  { name: "Charger #1", status: "Charging", progress: 100, eta: "45 min" },
  { name: "Charger #2", status: "Available", progress: 60, eta: "Free" },
  { name: "Charger #3", status: "Reserved", progress: 10, eta: "Reserved" },
  { name: "Charger #4", status: "Charging", progress: 100, eta: "20 min" },
];

export default function StationDetails() {
  const { id } = useParams();
  const station = useSelector((state) => state.stations.stations.find((item) => item.id === id));

  if (!station) {
    return <p className="text-lg">Station not found.</p>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="overflow-hidden rounded-[32px]">
          <img src={station.image} alt={station.name} className="h-full min-h-[320px] w-full object-cover" />
        </div>
        <SectionCard className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-brand-green">Station details</p>
            <h1 className="mt-2 font-display text-4xl font-bold">{station.name}</h1>
            <p className="mt-2 text-slate-500">{station.address}</p>
            <p className="mt-3 text-sm text-brand-orange">★★★★★ {station.rating} · {station.reviews} reviews</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm text-slate-500">Availability</p>
              <p className="mt-1 text-xl font-semibold">{station.availableChargers}/{station.totalChargers} chargers</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-1 text-xl font-semibold">₹{station.priceMin}-{station.priceMax}/kWh</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm text-slate-500">Open</p>
              <p className="mt-1 text-xl font-semibold">{station.open}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm text-slate-500">Charging Types</p>
              <p className="mt-1 text-xl font-semibold">{station.chargerTypes.join(", ")}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">Book Now</button>
            <button className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold dark:border-slate-700">Add to Favorites</button>
            <button className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold dark:border-slate-700">Get Directions</button>
          </div>
        </SectionCard>
      </section>

      <SectionCard>
        <h2 className="font-display text-2xl font-semibold">Available chargers</h2>
        <div className="mt-5 space-y-4">
          {chargerRows.map((charger) => (
            <div key={charger.name} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{charger.name}</p>
                  <p className="text-sm text-slate-500">{charger.status} · ETA: {charger.eta}</p>
                </div>
                <div className="w-full max-w-sm">
                  <LinearProgress variant="determinate" value={charger.progress} sx={{ borderRadius: 999 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-2xl font-semibold">Amenities</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {station.amenities.map((item) => (
            <AmenityBadge key={item} label={item} />
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-2xl font-semibold">Reviews</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ReviewCard name="John Doe" rating={5} message="Great service, clean bays, and very smooth charger handoff." />
          <ReviewCard name="Jane Smith" rating={4} message="Strong charging speed, but weekends can get crowded quickly." />
        </div>
      </SectionCard>
    </div>
  );
}
