import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { chargerTypes } from "../../utils/constants";
import { bookingSchema } from "../../utils/validators";

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      chargerType: "",
      paymentMethod: "Visa •••• 4242",
      duration: 1,
    },
  });

  const onSubmit = (values) => {
    console.log("Booking values", values);
  };

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        error={!!errors.date}
        helperText={errors.date?.message}
        {...register("date")}
      />
      <TextField
        label="Time"
        type="time"
        InputLabelProps={{ shrink: true }}
        error={!!errors.time}
        helperText={errors.time?.message}
        {...register("time")}
      />
      <TextField
        select
        label="Charger Type"
        error={!!errors.chargerType}
        helperText={errors.chargerType?.message}
        {...register("chargerType")}
      >
        {chargerTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Duration (hours)"
        type="number"
        error={!!errors.duration}
        helperText={errors.duration?.message}
        {...register("duration")}
      />
      <TextField
        className="md:col-span-2"
        label="Payment Method"
        error={!!errors.paymentMethod}
        helperText={errors.paymentMethod?.message}
        {...register("paymentMethod")}
      />
      <button className="md:col-span-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">
        Confirm Booking
      </button>
    </form>
  );
}
