import { TextField } from "@mui/material";
import AuthShell from "./AuthShell";

export default function ForgotPassword() {
  return (
    <AuthShell title="Reset password" subtitle="Enter your account email and we’ll send a recovery link.">
      <form className="space-y-4">
        <TextField fullWidth label="Email address" />
        <button className="w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white">Send reset link</button>
      </form>
    </AuthShell>
  );
}
