import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, MenuItem, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, saveVehicleForUser } from "../../store/bookingSlice";
import { chargerTypes } from "../../utils/constants";
import { buildVehicleLabel } from "../../utils/helpers";
import { bookingSchema } from "../../utils/validators";

function formatTimeRange(time, duration) {
  const [hourPart, minutePart] = time.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(hourPart, minutePart, 0, 0);
  const endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000);

  const formatter = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    startTime: formatter.format(startDate),
    endTime: formatter.format(endDate),
  };
}

function formatBookingDate(date) {
  const bookingDate = new Date(date);
  const today = new Date();

  if (bookingDate.toDateString() === today.toDateString()) {
    return "Today";
  }

  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  if (bookingDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(bookingDate);
}

export default function BookingForm({ station, onSuccess }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const savedVehicles = useSelector((state) => state.bookings.vehiclesByUser[user?.phone] || []);
  const [successMessage, setSuccessMessage] = useState("");

  const defaultVehicleId = savedVehicles[0]?.id ?? "__new__";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      chargerType: station?.chargerTypes?.[0] || "",
      paymentMethod: "Visa ending 4242",
      duration: 1,
      selectedVehicleId: defaultVehicleId,
      vehicleName: "",
      vehicleNumber: "",
    },
  });

  const selectedVehicleId = watch("selectedVehicleId");
  const isAddingNewVehicle = selectedVehicleId === "__new__";

  const vehicleOptions = useMemo(
    () => [...savedVehicles, { id: "__new__", name: "Add another vehicle", number: "" }],
    [savedVehicles],
  );

  const onSubmit = (values) => {
    const selectedVehicle = savedVehicles.find((vehicle) => vehicle.id === values.selectedVehicleId);
    const fallbackVehicle = savedVehicles[0];
    const normalizedVehicleNumber = isAddingNewVehicle
      ? values.vehicleNumber.replace(/\s+/g, "").toUpperCase()
      : (selectedVehicle || fallbackVehicle).number;
    const finalVehicle = isAddingNewVehicle
      ? {
          id: `vehicle-${Date.now()}`,
          name: values.vehicleName.trim(),
          number: normalizedVehicleNumber,
        }
      : selectedVehicle || fallbackVehicle;

    if (isAddingNewVehicle) {
      dispatch(
        saveVehicleForUser({
          userPhone: user.phone,
          vehicle: finalVehicle,
        }),
      );
    }

    const timeRange = formatTimeRange(values.time, values.duration);
    const bookingPayload = {
      id: `booking-${Date.now()}`,
      stationId: station.id,
      stationName: station.name,
      charger: `${values.chargerType} charger`,
      status: "Upcoming",
      progress: 0,
      startTime: timeRange.startTime,
      endTime: timeRange.endTime,
      price: Math.round(values.duration * ((station.priceMin + station.priceMax) / 2) * 10),
      date: formatBookingDate(values.date),
      vehicleName: finalVehicle.name,
      vehicleNumber: finalVehicle.number,
    };

    dispatch(addBooking(bookingPayload));
    setSuccessMessage(`Booking created for ${finalVehicle.name}. It is now saved for future suggestions.`);
    reset({
      date: "",
      time: "",
      chargerType: station?.chargerTypes?.[0] || "",
      duration: 1,
      paymentMethod: "Visa ending 4242",
      selectedVehicleId: finalVehicle.id,
      vehicleName: "",
      vehicleNumber: "",
    });

    if (onSuccess) {
      onSuccess(bookingPayload);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
        <p className="text-sm text-slate-500">Booking station</p>
        <p className="mt-1 font-display text-2xl font-semibold">{station.name}</p>
        <p className="text-sm text-slate-500">{station.address}</p>
      </div>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          select
          label="Saved Vehicle"
          error={!!errors.selectedVehicleId}
          helperText={errors.selectedVehicleId?.message || "Reuse a saved vehicle or add a new one"}
          {...register("selectedVehicleId")}
        >
          {vehicleOptions.map((vehicle) => (
            <MenuItem key={vehicle.id} value={vehicle.id}>
              {vehicle.id === "__new__" ? vehicle.name : buildVehicleLabel(vehicle)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Payment Method"
          error={!!errors.paymentMethod}
          helperText={errors.paymentMethod?.message}
          {...register("paymentMethod")}
        />

        {isAddingNewVehicle && (
          <>
            <TextField
              label="Vehicle Name"
              error={!!errors.vehicleName}
              helperText={errors.vehicleName?.message || "Example: Tata Nexon EV"}
              {...register("vehicleName")}
            />
            <TextField
              label="Vehicle Number"
              error={!!errors.vehicleNumber}
              helperText={errors.vehicleNumber?.message || "Example: DL01AB1234"}
              {...register("vehicleNumber")}
            />
          </>
        )}

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
          {chargerTypes
            .filter((type) => station.chargerTypes.includes(type))
            .map((type) => (
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
        <button className="md:col-span-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
