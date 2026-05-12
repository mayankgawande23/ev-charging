import { mapConfig } from "../../config/mapConfig";
import MapControls from "./MapControls";

export default function LeafletMap({ stations }) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 p-4 dark:border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.4),transparent_25%),linear-gradient(180deg,rgba(15,23,42,0.4),rgba(15,23,42,0.9))]" />
      <div className="relative min-h-[360px]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-white">Live station map</p>
            <p className="text-sm text-slate-300">
              Leaflet-ready canvas • center {mapConfig.defaultCenter.join(", ")} • zoom {mapConfig.defaultZoom}
            </p>
          </div>
          <MapControls />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stations.map((station) => (
            <div key={station.id} className="rounded-3xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur">
              <p className="font-semibold">{station.name}</p>
              <p className="mt-1 text-sm text-slate-200">{station.address}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-emerald-300">
                Marker • {station.availableChargers}/{station.totalChargers} free
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
