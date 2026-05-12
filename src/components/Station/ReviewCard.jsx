export default function ReviewCard({ name, rating, message }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
      <p className="font-semibold">{name}</p>
      <p className="mt-1 text-sm text-brand-orange">{"★".repeat(Math.round(rating))}</p>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
    </div>
  );
}
