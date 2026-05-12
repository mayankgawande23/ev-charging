import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import stationReducer from "./stationSlice";
import bookingReducer from "./bookingSlice";
import notificationReducer from "./notificationSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stations: stationReducer,
    bookings: bookingReducer,
    notifications: notificationReducer,
    ui: uiReducer,
  },
});
