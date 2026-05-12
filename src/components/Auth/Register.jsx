import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AuthShell from "./AuthShell";
import { registerSchema } from "../../utils/validators";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  return (
    <AuthShell title="Create account" subtitle="Join EVCharge to save favorites, book faster, and track charging insights.">
      <form className="space-y-4" onSubmit={handleSubmit(console.log)}>
        <TextField fullWidth label="Full name" error={!!errors.name} helperText={errors.name?.message} {...register("name")} />
        <TextField fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} {...register("email")} />
        <TextField fullWidth label="Phone" error={!!errors.phone} helperText={errors.phone?.message} {...register("phone")} />
        <TextField
          fullWidth
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <button className="w-full rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">Register</button>
      </form>
    </AuthShell>
  );
}
