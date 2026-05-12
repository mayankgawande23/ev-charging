import { useSelector } from "react-redux";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FiMapPin } from "react-icons/fi";
import { useStations } from "../../hooks/useStations";
import { useGeolocation } from "../../hooks/useGeolocation";
import FilterPanel from "../Map/FilterPanel";
import LeafletMap from "../Map/LeafletMap";
import StationList from "../Station/StationList";
import SectionCard from "../UI/SectionCard";
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
  const { stations } = useStations();
  const { error } = useGeolocation();

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[32px] bg-slate-900 px-6 py-8 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">Dashboard</p>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold">Welcome back, {user.name.split(" ")[0]}.</h1>
            <p className="mt-2 text-slate-300">Last charged 2 days ago. Nearby fast chargers are trending quieter right now.</p>
          </div>
          {error && <p className="max-w-md rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200">{error}</p>}
        </div>
      </section>

      <div className={styles.dashboardGrid}>
        <div className="space-y-6">
          <SectionCard>
            <div className="mb-4 flex items-center gap-2">
              <FiMapPin className="text-brand-green" />
              <h2 className="font-display text-2xl font-semibold">Find nearby charging stations</h2>
            </div>
            <FilterPanel />
          </SectionCard>
          <LeafletMap stations={stations} />
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
              <p className="mt-1 text-sm text-slate-500">Sorted by the filters you select above.</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
              {stations.length} live
            </span>
          </div>
          <div className="mt-5 max-h-[820px] overflow-y-auto pr-1">
            <StationList stations={stations} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
