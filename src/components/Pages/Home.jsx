import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FiMapPin } from "react-icons/fi";
import { mapConfig } from "../../config/mapConfig";
import { useStations } from "../../hooks/useStations";
import { useGeolocation } from "../../hooks/useGeolocation";
import { getDirections } from "../../services/directionsService";
import { formatDistance } from "../../utils/formatters";
import BookingModal from "../Booking/BookingModal";
import FilterPanel from "../Map/FilterPanel";
import LeafletMap from "../Map/LeafletMap";
import SectionCard from "../UI/SectionCard";
import StationList from "../Station/StationList";
import styles from "./Home.module.css";

const chartData = [
  { day: "Mon", energy: 18 },
  { day: "Tue", energy: 24 },
  { day: "Wed", energy: 21 },
  { day: "Thu", energy: 28 },
  { day: "Fri", energy: 26 },
];

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const filterRef = useRef(null);
  const { location, error, requestLocation } = useGeolocation();
  const { stations } = useStations(location);
  const [selectedStation, setSelectedStation] = useState(null);
  const [bookingStation, setBookingStation] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    if (!stations.length) {
      setSelectedStation(null);
      return;
    }

    const stationStillVisible = selectedStation && stations.some((station) => station.id === selectedStation.id);
    if (!stationStillVisible) {
      setSelectedStation(stations[0]);
    }
  }, [selectedStation, stations]);

  const nearestStation = useMemo(() => stations[0] || null, [stations]);

  const handleBookNow = (station) => {
    setBookingStation(station);
    setSelectedStation(station);
  };

  const handleDirections = async (station) => {
    const origin = location || {
      latitude: mapConfig.defaultCenter[0],
      longitude: mapConfig.defaultCenter[1],
    };

    setSelectedStation(station);
    setRouteLoading(true);
    const nextRoute = await getDirections({
      from: origin,
      to: { latitude: station.lat, longitude: station.lng },
    });
    setRouteData(nextRoute);
    setRouteLoading(false);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[32px] bg-slate-900 px-6 py-8 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">Dashboard</p>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold">Welcome back, {user.name.split(" ")[0]}.</h1>
            <p className="mt-2 text-slate-300">
              Last charged 2 days ago. Nearby fast chargers are ranked using your current location whenever it is available.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            {nearestStation && (
              <p className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200">
                Nearest station now: {nearestStation.name} • {formatDistance(nearestStation.distance)}
              </p>
            )}
            <button
              type="button"
              onClick={requestLocation}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Refresh my location
            </button>
            {error && <p className="max-w-md text-sm text-slate-300">{error}</p>}
          </div>
        </div>
      </section>

      <div className={styles.dashboardGrid}>
        <div className="space-y-6">
          <SectionCard>
            <div className="mb-4 flex items-center gap-2">
              <FiMapPin className="text-brand-green" />
              <h2 className="font-display text-2xl font-semibold">Find nearby charging stations</h2>
            </div>
            <div ref={filterRef}>
              <FilterPanel />
            </div>
          </SectionCard>

          <LeafletMap
            stations={stations}
            userLocation={location}
            selectedStation={selectedStation}
            routeData={routeData}
            routeLoading={routeLoading}
            onStationSelect={setSelectedStation}
            onFocusFilters={() => filterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
          />

          {selectedStation && routeData && (
            <SectionCard>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold">Directions to {selectedStation.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Distance {routeData.distanceKm.toFixed(1)} km • ETA {routeData.durationMinutes} min •{" "}
                    {routeData.source === "live" ? "live route" : "smart fallback route"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleBookNow(selectedStation)}
                  className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white"
                >
                  Book this station
                </button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {routeData.steps.map((step, index) => (
                  <div
                    key={`${step.instruction}-${index}`}
                    className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Step {index + 1}</p>
                    <p className="mt-2">{step.instruction}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-blue">
                      {step.distanceKm.toFixed(1)} km
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          <SectionCard>
            <h3 className="font-display text-2xl font-semibold">Charging activity</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="energyFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="energy" stroke="#10B981" fill="url(#energyFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <SectionCard className="h-fit">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold">Nearby stations</h2>
              <p className="mt-1 text-sm text-slate-500">
                Sorted by the filters you select above and updated from your location.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
              {stations.length} live
            </span>
          </div>
          <div className="mt-5 max-h-[820px] overflow-y-auto pr-1">
            <StationList
              stations={stations}
              onBookNow={handleBookNow}
              onOpenDirections={handleDirections}
              onSelect={setSelectedStation}
            />
          </div>
        </SectionCard>
      </div>

      <BookingModal open={Boolean(bookingStation)} onClose={() => setBookingStation(null)} station={bookingStation} />
    </div>
  );
}
