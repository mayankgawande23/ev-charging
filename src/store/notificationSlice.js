import { createSlice } from "@reduxjs/toolkit";
import { notifications } from "../services/mockData";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: notifications,
  },
  reducers: {
    markAllRead: (state) => {
      state.items = state.items.map((item) => ({ ...item, read: true }));
    },
    dismissNotification: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { markAllRead, dismissNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
