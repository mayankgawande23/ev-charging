import { Alert, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import {
  clearAuthFeedback,
  completeSignup,
  requestSignupOtp,
} from "../../store/authSlice";
import { otpSchema, userSignupSchema } from "../../utils/validators";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, role, pendingOtp, error, statusMessage } = useSelector((state) => state.auth);

  const signupForm = useForm({
    resolver: zodResolver(userSignupSchema),
    defaultValues: { name: "", phone: "" },
  });
  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === "admin" ? "/admin" : "/home", { replace: true });
    }
  }, [isAuthenticated, navigate, role]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthFeedback());
    };
  }, [dispatch]);

  const currentPhone = signupForm.watch("phone");
  const showOtpStep = pendingOtp?.mode === "signup" && pendingOtp.phone === currentPhone;

  const handleSignupRequest = (values) => {
    dispatch(requestSignupOtp(values));
  };

  const handleSignupVerification = (values) => {
    dispatch(completeSignup({ phone: currentPhone, otp: values.otp }));
  };

  return (
    <AuthShell
      title="Create user account"
      subtitle="Sign up with your mobile number, verify OTP, and stay logged in until you logout."
    >
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

      <div className="space-y-5">
        <form className="space-y-4" onSubmit={signupForm.handleSubmit(handleSignupRequest)}>
          <TextField
            fullWidth
            label="Full Name"
            error={!!signupForm.formState.errors.name}
            helperText={signupForm.formState.errors.name?.message}
            {...signupForm.register("name")}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="9876543210"
            error={!!signupForm.formState.errors.phone}
            helperText={signupForm.formState.errors.phone?.message || "OTP will be sent to this number"}
            {...signupForm.register("phone")}
          />
          <button className="w-full rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">
            Send Signup OTP
          </button>
        </form>

        {showOtpStep && (
          <form
            className="space-y-4 rounded-3xl border border-slate-200 p-4 dark:border-slate-700"
            onSubmit={otpForm.handleSubmit(handleSignupVerification)}
          >
            <TextField
              fullWidth
              label="Enter OTP"
              placeholder="123456"
              error={!!otpForm.formState.errors.otp}
              helperText={otpForm.formState.errors.otp?.message || "Use the demo OTP shown above"}
              {...otpForm.register("otp")}
            />
            <button className="w-full rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white">
              Verify OTP & Create Account
            </button>
          </form>
        )}
      </div>

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>Already registered?</span>
        <Link to="/login">Login with mobile OTP</Link>
      </div>
    </AuthShell>
  );
}
