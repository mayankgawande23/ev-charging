import { createSlice } from "@reduxjs/toolkit";
import { bookings } from "../services/mockData";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings,
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.unshift(action.payload);
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
