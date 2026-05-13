import { useSelector } from "react-redux";

export function useAuth() {
  return useSelector((state) => ({
    ...state.auth,
    isAdmin: state.auth.role === "admin",
    isUser: state.auth.role === "user",
  }));
}
