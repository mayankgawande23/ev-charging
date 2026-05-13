import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function getDashboardPath(role) {
  return role === "admin" ? "/admin" : "/home";
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return children;
}
