import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-[0.22em] text-brand-orange">404</p>
      <h1 className="mt-4 font-display text-5xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-500">The route you requested is not available right now. Let’s get you back to charging faster.</p>
      <Link to="/" className="mt-6 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">
        Back to landing page
      </Link>
    </div>
  );
}
