import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userSignupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
});

export const userLoginSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
});

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit OTP"),
});

export const bookingSchema = z
  .object({
    date: z.string().min(1, "Select a date"),
    time: z.string().min(1, "Select a time"),
    chargerType: z.string().min(1, "Choose a charger type"),
    duration: z.coerce.number().min(1, "Minimum 1 hour").max(12, "Maximum 12 hours"),
    paymentMethod: z.string().min(1, "Select a payment method"),
    selectedVehicleId: z.string().min(1, "Choose a vehicle"),
    vehicleName: z.string().optional(),
    vehicleNumber: z.string().optional(),
  })
  .superRefine((values, context) => {
    if (values.selectedVehicleId === "__new__") {
      if (!values.vehicleName || values.vehicleName.trim().length < 2) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["vehicleName"],
          message: "Enter your vehicle name",
        });
      }

      if (!values.vehicleNumber || !/^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{4}$/i.test(values.vehicleNumber.replace(/\s+/g, ""))) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["vehicleNumber"],
          message: "Enter a valid vehicle number",
        });
      }
    }
  });
