import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionCard from "../UI/SectionCard";

const stationLoadData = [
  { name: "Central", utilization: 78 },
  { name: "PowerHub", utilization: 61 },
  { name: "EcoVolt", utilization: 69 },
  { name: "Ring Road", utilization: 82 },
];

const adminMetrics = [
  { label: "Active stations", value: "2,531", tone: "text-emerald-500" },
  { label: "Live bookings", value: "418", tone: "text-sky-500" },
  { label: "Revenue today", value: "Rs 3.8L", tone: "text-orange-500" },
  { label: "Alerts open", value: "12", tone: "text-rose-500" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-slate-900 px-6 py-8 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.22em] text-sky-300">Admin dashboard</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Operational control center</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Monitor network health, charging demand, station utilization, and platform alerts from one place.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((item) => (
          <SectionCard key={item.label}>
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className={`mt-3 font-display text-4xl font-bold ${item.tone}`}>{item.value}</p>
          </SectionCard>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <SectionCard>
          <h2 className="font-display text-2xl font-semibold">Station utilization</h2>
          <p className="mt-1 text-sm text-slate-500">High-demand locations across the EVCharge network.</p>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stationLoadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Bar dataKey="utilization" radius={[10, 10, 0, 0]} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="space-y-4">
          <div>
            <h2 className="font-display text-2xl font-semibold">Priority alerts</h2>
            <p className="mt-1 text-sm text-slate-500">Fast actions the admin team should review today.</p>
          </div>
          <div className="space-y-3">
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
              <p className="font-semibold text-rose-600">Low availability in South Delhi</p>
              <p className="mt-1 text-sm text-slate-500">Only 2 fast chargers available across 6 stations.</p>
            </div>
            <div className="rounded-3xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
              <p className="font-semibold text-orange-600">Maintenance overdue</p>
              <p className="mt-1 text-sm text-slate-500">PowerHub Station charger #4 needs a service check.</p>
            </div>
            <div className="rounded-3xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
              <p className="font-semibold text-sky-600">Revenue spike detected</p>
              <p className="mt-1 text-sm text-slate-500">Airport corridor usage is up 24% versus yesterday.</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
