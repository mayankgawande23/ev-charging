import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiNavigation } from "react-icons/fi";
import styles from "./Landing.module.css";
import SectionCard from "../UI/SectionCard";

const features = [
  "Real-time availability",
  "Route planning",
  "Booking system",
  "Trusted user reviews",
];

export default function Landing() {
  return (
    <div className="space-y-8">
      <section
        className={`${styles.heroShell} overflow-hidden rounded-[36px] border border-slate-200 bg-hero-grid bg-slate-900 px-6 py-12 text-white shadow-soft sm:px-10 lg:px-14`}
      >
        <div className={styles.heroGlow} />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="animate-fade-up space-y-6">
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-300">
              EV Charging Locator
            </span>
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
                Find nearby charging stations in seconds.
              </h1>
              <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
                Discover live charger availability, compare prices, and book the fastest route-friendly station for your next session.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/home"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Start Charging <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/bookings"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View All Stations
              </Link>
            </div>
          </div>
          <div className="animate-fade-up rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="rounded-[24px] bg-white p-4 text-slate-900 shadow-soft">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                <FiMapPin /> Search by location or address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Connaught Place, New Delhi"
                  aria-label="Search stations"
                />
                <button className="rounded-full bg-slate-100 p-3" aria-label="Use current location">
                  <FiNavigation />
                </button>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-emerald-50 p-3">
                  <p className="font-display text-xl font-semibold text-emerald-600">4.8/5</p>
                  <p className="text-xs text-slate-500">Driver rating</p>
                </div>
                <div className="rounded-2xl bg-sky-50 p-3">
                  <p className="font-display text-xl font-semibold text-sky-600">2.5K+</p>
                  <p className="text-xs text-slate-500">Stations</p>
                </div>
                <div className="rounded-2xl bg-orange-50 p-3">
                  <p className="font-display text-xl font-semibold text-orange-600">50K+</p>
                  <p className="text-xs text-slate-500">Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {features.map((feature) => (
          <SectionCard key={feature} className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">Feature</p>
            <h3 className="mt-3 font-display text-xl font-semibold">{feature}</h3>
            <p className="mt-2 text-sm text-slate-500">
              Built for quick decision-making, smooth booking, and lower range anxiety.
            </p>
          </SectionCard>
        ))}
      </section>
    </div>
  );
}
