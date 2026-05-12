import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: true,
    notificationOpen: false,
    mobileMenuOpen: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNotificationOpen: (state) => {
      state.notificationOpen = !state.notificationOpen;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const { toggleDarkMode, toggleNotificationOpen, toggleMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
