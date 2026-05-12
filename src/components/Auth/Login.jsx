import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthShell from "./AuthShell";
import { loginSchema } from "../../utils/validators";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <AuthShell title="Sign in" subtitle="Continue to your charging dashboard and active bookings.">
      <form className="space-y-4" onSubmit={handleSubmit(console.log)}>
        <TextField fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} {...register("email")} />
        <TextField
          fullWidth
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <button className="w-full rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">Login</button>
      </form>
      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/register">Create account</Link>
      </div>
    </AuthShell>
  );
}
