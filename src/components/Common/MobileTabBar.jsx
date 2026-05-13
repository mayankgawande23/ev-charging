import { NavLink } from "react-router-dom";
import { FiCalendar, FiHome, FiMapPin, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function MobileTabBar() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const tabs = isAuthenticated
    ? role === "admin"
      ? [
          { to: "/admin", label: "Admin", icon: FiHome },
          { to: "/profile", label: "Profile", icon: FiUser },
        ]
      : [
          { to: "/", label: "Explore", icon: FiMapPin },
          { to: "/home", label: "Home", icon: FiHome },
          { to: "/bookings", label: "Bookings", icon: FiCalendar },
          { to: "/profile", label: "Profile", icon: FiUser },
        ]
    : [
        { to: "/", label: "Explore", icon: FiMapPin },
        { to: "/login", label: "Login", icon: FiHome },
        { to: "/register", label: "Sign Up", icon: FiUser },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/90 px-3 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
      <div
        className={`mx-auto grid max-w-md gap-2 ${
          tabs.length === 4 ? "grid-cols-4" : tabs.length === 3 ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex min-h-12 flex-col items-center justify-center rounded-2xl text-[11px] font-medium ${
                isActive ? "bg-emerald-500 text-white" : "text-slate-500"
              }`
            }
          >
            <Icon className="mb-1 text-base" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
