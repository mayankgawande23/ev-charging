export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>EVCharge helps drivers find cleaner, faster charging across the city.</p>
        <div className="flex gap-4">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
