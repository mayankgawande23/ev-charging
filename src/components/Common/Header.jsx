import { Avatar, Badge, Drawer, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FiBell, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { toggleDarkMode, toggleMobileMenu, toggleNotificationOpen } from "../../store/uiSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { darkMode, mobileMenuOpen } = useSelector((state) => state.ui);
  const unreadCount = useSelector((state) => state.notifications.items.filter((item) => !item.read).length);
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);

  const navLinks = isAuthenticated
    ? role === "admin"
      ? [
          { to: "/admin", label: "Admin" },
          { to: "/profile", label: "Profile" },
        ]
      : [
          { to: "/", label: "Explore" },
          { to: "/home", label: "Home" },
          { to: "/bookings", label: "Bookings" },
          { to: "/profile", label: "Profile" },
        ]
    : [
        { to: "/", label: "Explore" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Sign Up" },
      ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <IconButton
              className="md:!hidden"
              aria-label="Open navigation"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              <FiMenu />
            </IconButton>
            <Link to="/" className="font-display text-2xl font-bold tracking-tight text-brand-green">
              EVCharge
            </Link>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-brand-green ${isActive ? "text-brand-green" : "text-slate-600 dark:text-slate-300"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <IconButton aria-label="Toggle theme" onClick={() => dispatch(toggleDarkMode())}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </IconButton>
            {isAuthenticated && (
              <IconButton aria-label="Open notifications" onClick={() => dispatch(toggleNotificationOpen())}>
                <Badge badgeContent={unreadCount} color="error">
                  <FiBell />
                </Badge>
              </IconButton>
            )}
            {user && (
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700 sm:flex">
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#10B981" }}>{user.name[0]}</Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      <Drawer anchor="left" open={mobileMenuOpen} onClose={() => dispatch(toggleMobileMenu())}>
        <div className="w-72 space-y-6 bg-white p-6 dark:bg-slate-900">
          <div>
            <p className="font-display text-xl font-semibold text-brand-green">EVCharge</p>
            <p className="mt-1 text-sm text-slate-500">Fast routing, smarter charging.</p>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => dispatch(toggleMobileMenu())}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
}
