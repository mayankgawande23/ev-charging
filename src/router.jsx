import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/Common/MainLayout";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const Landing = lazy(() => import("./components/Pages/Landing"));
const Home = lazy(() => import("./components/Pages/Home"));
const AdminDashboard = lazy(() => import("./components/Pages/AdminDashboard"));
const StationDetails = lazy(() => import("./components/Pages/StationDetails"));
const Bookings = lazy(() => import("./components/Pages/Bookings"));
const Profile = lazy(() => import("./components/Pages/Profile"));
const NotFound = lazy(() => import("./components/Pages/NotFound"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const ForgotPassword = lazy(() => import("./components/Auth/ForgotPassword"));

function withSuspense(element) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <CircularProgress color="primary" />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<Landing />) },
      {
        path: "home",
        element: withSuspense(
          <ProtectedRoute allowedRoles={["user"]}>
            <Home />
          </ProtectedRoute>,
        ),
      },
      {
        path: "admin",
        element: withSuspense(
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>,
        ),
      },
      {
        path: "stations/:id",
        element: withSuspense(
          <ProtectedRoute allowedRoles={["user"]}>
            <StationDetails />
          </ProtectedRoute>,
        ),
      },
      {
        path: "bookings",
        element: withSuspense(
          <ProtectedRoute allowedRoles={["user"]}>
            <Bookings />
          </ProtectedRoute>,
        ),
      },
      {
        path: "profile",
        element: withSuspense(
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <Profile />
          </ProtectedRoute>,
        ),
      },
      { path: "login", element: withSuspense(<Login />) },
      { path: "register", element: withSuspense(<Register />) },
      { path: "forgot-password", element: withSuspense(<ForgotPassword />) },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
]);
