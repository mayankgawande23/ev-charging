import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileTabBar from "./MobileTabBar";
import NotificationCenter from "./NotificationCenter";

export default function MainLayout() {
  const location = useLocation();
  const authPage = ["/login", "/register", "/forgot-password"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <Header />
      <NotificationCenter />
      <main className="mx-auto min-h-[calc(100vh-160px)] max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      {!authPage && <Footer />}
      {!authPage && <MobileTabBar />}
    </div>
  );
}
