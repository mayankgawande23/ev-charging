export default function AmenityBadge({ label }) {
  return (
    <span className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
      {label}
    </span>
  );
}
