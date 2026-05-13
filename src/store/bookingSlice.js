import { createSlice } from "@reduxjs/toolkit";
import { bookings as defaultBookings } from "../services/mockData";

const BOOKING_STORAGE_KEY = "evcharge_booking_state";

function readStorage(fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(BOOKING_STORAGE_KEY);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(value));
}

const persistedState = readStorage({
  bookings: defaultBookings,
  vehiclesByUser: {
    "9876543210": [
      { id: "veh-1", name: "Tata Nexon EV", number: "DL01AB1234" },
      { id: "veh-2", name: "MG ZS EV", number: "HR26CD5678" },
    ],
  },
});

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: persistedState.bookings,
    vehiclesByUser: persistedState.vehiclesByUser,
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.unshift(action.payload);
      writeStorage({
        bookings: state.bookings,
        vehiclesByUser: state.vehiclesByUser,
      });
    },
    saveVehicleForUser: (state, action) => {
      const { userPhone, vehicle } = action.payload;
      const currentVehicles = state.vehiclesByUser[userPhone] || [];
      const alreadyExists = currentVehicles.some(
        (item) => item.number.toLowerCase() === vehicle.number.toLowerCase(),
      );

      if (!alreadyExists) {
        state.vehiclesByUser[userPhone] = [{ ...vehicle }, ...currentVehicles];
        writeStorage({
          bookings: state.bookings,
          vehiclesByUser: state.vehiclesByUser,
        });
      }
    },
  },
});

export const { addBooking, saveVehicleForUser } = bookingSlice.actions;
export default bookingSlice.reducer;
