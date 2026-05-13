import { Alert, Tab, Tabs, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import {
  clearAuthFeedback,
  completeUserLogin,
  loginAdmin,
  requestLoginOtp,
} from "../../store/authSlice";
import { adminLoginSchema, otpSchema, userLoginSchema } from "../../utils/validators";

function getDashboardPath(role, fallback) {
  if (fallback && fallback !== "/login" && fallback !== "/register") {
    return fallback;
  }

  return role === "admin" ? "/admin" : "/home";
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, role, pendingOtp, error, statusMessage } = useSelector((state) => state.auth);
  const [tab, setTab] = useState("user");

  const userLoginForm = useForm({
    resolver: zodResolver(userLoginSchema),
    defaultValues: { phone: "" },
  });
  const userOtpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });
  const adminForm = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "admin@evcharge.com", password: "Admin@123" },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDashboardPath(role, location.state?.from), { replace: true });
    }
  }, [isAuthenticated, role, navigate, location.state]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthFeedback());
    };
  }, [dispatch]);

  const currentPhone = userLoginForm.watch("phone");
  const showUserOtpStep = pendingOtp?.mode === "login" && pendingOtp.phone === currentPhone;

  const handleUserOtpRequest = (values) => {
    dispatch(requestLoginOtp(values));
  };

  const handleUserLogin = (values) => {
    dispatch(completeUserLogin({ phone: currentPhone, otp: values.otp }));
  };

  const handleAdminLogin = (values) => {
    dispatch(loginAdmin(values));
  };

  return (
    <AuthShell title="Login" subtitle="Choose admin or user access and continue into the right dashboard.">
      <Tabs
        value={tab}
        onChange={(_, nextValue) => {
          dispatch(clearAuthFeedback());
          setTab(nextValue);
        }}
        sx={{ mb: 3 }}
      >
        <Tab value="user" label="User Login" />
        <Tab value="admin" label="Admin Login" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {statusMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {statusMessage}
        </Alert>
      )}

      {tab === "user" ? (
        <div className="space-y-5">
          <form className="space-y-4" onSubmit={userLoginForm.handleSubmit(handleUserOtpRequest)}>
            <TextField
              fullWidth
              label="Mobile Number"
              placeholder="9876543210"
              error={!!userLoginForm.formState.errors.phone}
              helperText={userLoginForm.formState.errors.phone?.message || "Enter your registered mobile number"}
              {...userLoginForm.register("phone")}
            />
            <button className="w-full rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">
              Send OTP
            </button>
          </form>

          {showUserOtpStep && (
            <form
              className="space-y-4 rounded-3xl border border-slate-200 p-4 dark:border-slate-700"
              onSubmit={userOtpForm.handleSubmit(handleUserLogin)}
            >
              <TextField
                fullWidth
                label="Enter OTP"
                placeholder="123456"
                error={!!userOtpForm.formState.errors.otp}
                helperText={userOtpForm.formState.errors.otp?.message || "Use the demo OTP shown above"}
                {...userOtpForm.register("otp")}
              />
              <button className="w-full rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white">
                Verify & Login
              </button>
            </form>
          )}

          <div className="flex justify-between text-sm text-slate-500">
            <Link to="/register">Create user account</Link>
            <span>Session stays active until logout.</span>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={adminForm.handleSubmit(handleAdminLogin)}>
          <TextField
            fullWidth
            label="Admin Email"
            error={!!adminForm.formState.errors.email}
            helperText={adminForm.formState.errors.email?.message}
            {...adminForm.register("email")}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            error={!!adminForm.formState.errors.password}
            helperText={adminForm.formState.errors.password?.message || "Demo credentials are prefilled for admin access"}
            {...adminForm.register("password")}
          />
          <button className="w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white">
            Login as Admin
          </button>
        </form>
      )}
    </AuthShell>
  );
}
