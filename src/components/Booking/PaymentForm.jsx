import { TextField } from "@mui/material";

export default function PaymentForm() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TextField label="Cardholder name" fullWidth />
      <TextField label="Card number" fullWidth />
      <TextField label="Expiry" fullWidth />
      <TextField label="CVV" fullWidth />
    </div>
  );
}
