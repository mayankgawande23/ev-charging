import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
});

export const bookingSchema = z.object({
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  chargerType: z.string().min(1, "Choose a charger type"),
  duration: z.coerce.number().min(1, "Minimum 1 hour").max(12, "Maximum 12 hours"),
  paymentMethod: z.string().min(1, "Select a payment method"),
});
