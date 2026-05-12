export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="font-display text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
