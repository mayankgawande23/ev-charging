export default function SectionCard({ children, className = "" }) {
  return (
    <section className={`rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      {children}
    </section>
  );
}
