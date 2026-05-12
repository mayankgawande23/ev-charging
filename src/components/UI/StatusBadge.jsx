export default function StatusBadge({ children, tone = "green" }) {
  const tones = {
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    blue: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300",
    red: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
