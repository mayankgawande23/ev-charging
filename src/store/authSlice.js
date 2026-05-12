import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 98765 43210",
    location: "Delhi, India",
    memberSince: "January 2023",
  },
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
