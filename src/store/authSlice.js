import { createSlice } from "@reduxjs/toolkit";

const AUTH_SESSION_KEY = "evcharge_auth_session";
const AUTH_USERS_KEY = "evcharge_registered_users";
const DEMO_USER_OTP = "123456";

const adminAccount = {
  id: "admin-1",
  name: "Admin Control",
  email: "admin@evcharge.com",
  phone: "+91 99999 99999",
  location: "Operations Center",
  memberSince: "January 2023",
  role: "admin",
};

function readStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeStorage(key) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(key);
}

function normalizePhone(phone) {
  return phone.replace(/\D/g, "").slice(-10);
}

function formatMemberSince() {
  return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(new Date());
}

const persistedSession = readStorage(AUTH_SESSION_KEY, null);
const persistedUsers = readStorage(AUTH_USERS_KEY, []);

const initialState = {
  user: persistedSession?.user ?? null,
  role: persistedSession?.role ?? null,
  isAuthenticated: Boolean(persistedSession?.user),
  pendingOtp: null,
  registeredUsers: persistedUsers,
  statusMessage: "",
  error: "",
  demoOtp: DEMO_USER_OTP,
};

function persistUsers(users) {
  writeStorage(AUTH_USERS_KEY, users);
}

function persistSession(user, role) {
  writeStorage(AUTH_SESSION_KEY, { user, role });
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestSignupOtp: (state, action) => {
      const { name, phone } = action.payload;
      const normalizedPhone = normalizePhone(phone);
      const alreadyExists = state.registeredUsers.some((user) => user.phone === normalizedPhone);

      if (alreadyExists) {
        state.error = "An account with this mobile number already exists. Please log in instead.";
        state.statusMessage = "";
        state.pendingOtp = null;
        return;
      }

      state.pendingOtp = {
        mode: "signup",
        phone: normalizedPhone,
        name: name.trim(),
        otp: DEMO_USER_OTP,
      };
      state.error = "";
      state.statusMessage = `OTP sent to ${normalizedPhone}. Use ${DEMO_USER_OTP} for this demo flow.`;
    },
    completeSignup: (state, action) => {
      const { phone, otp } = action.payload;
      const normalizedPhone = normalizePhone(phone);

      if (!state.pendingOtp || state.pendingOtp.mode !== "signup" || state.pendingOtp.phone !== normalizedPhone) {
        state.error = "Please request a signup OTP first.";
        state.statusMessage = "";
        return;
      }

      if (state.pendingOtp.otp !== otp) {
        state.error = "Invalid OTP. Please try again.";
        state.statusMessage = "";
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: state.pendingOtp.name,
        email: "",
        phone: normalizedPhone,
        location: "Delhi, India",
        memberSince: formatMemberSince(),
        role: "user",
      };

      state.registeredUsers = [newUser, ...state.registeredUsers];
      state.user = newUser;
      state.role = "user";
      state.isAuthenticated = true;
      state.pendingOtp = null;
      state.error = "";
      state.statusMessage = "Signup complete. You are now logged in.";
      persistUsers(state.registeredUsers);
      persistSession(newUser, "user");
    },
    requestLoginOtp: (state, action) => {
      const normalizedPhone = normalizePhone(action.payload.phone);
      const existingUser = state.registeredUsers.find((user) => user.phone === normalizedPhone);

      if (!existingUser) {
        state.error = "No user found with this mobile number. Please sign up first.";
        state.statusMessage = "";
        state.pendingOtp = null;
        return;
      }

      state.pendingOtp = {
        mode: "login",
        phone: normalizedPhone,
        otp: DEMO_USER_OTP,
      };
      state.error = "";
      state.statusMessage = `OTP sent to ${normalizedPhone}. Use ${DEMO_USER_OTP} for this demo flow.`;
    },
    completeUserLogin: (state, action) => {
      const { phone, otp } = action.payload;
      const normalizedPhone = normalizePhone(phone);

      if (!state.pendingOtp || state.pendingOtp.mode !== "login" || state.pendingOtp.phone !== normalizedPhone) {
        state.error = "Please request a login OTP first.";
        state.statusMessage = "";
        return;
      }

      if (state.pendingOtp.otp !== otp) {
        state.error = "Invalid OTP. Please try again.";
        state.statusMessage = "";
        return;
      }

      const existingUser = state.registeredUsers.find((user) => user.phone === normalizedPhone);

      if (!existingUser) {
        state.error = "User account could not be found. Please sign up again.";
        state.statusMessage = "";
        return;
      }

      state.user = existingUser;
      state.role = "user";
      state.isAuthenticated = true;
      state.pendingOtp = null;
      state.error = "";
      state.statusMessage = "Login successful.";
      persistSession(existingUser, "user");
    },
    loginAdmin: (state, action) => {
      const { email, password } = action.payload;
      const normalizedEmail = email.trim().toLowerCase();

      if (normalizedEmail !== "admin@evcharge.com" || password !== "Admin@123") {
        state.error = "Invalid admin credentials.";
        state.statusMessage = "";
        return;
      }

      state.user = adminAccount;
      state.role = "admin";
      state.isAuthenticated = true;
      state.pendingOtp = null;
      state.error = "";
      state.statusMessage = "Admin login successful.";
      persistSession(adminAccount, "admin");
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.pendingOtp = null;
      state.error = "";
      state.statusMessage = "You have been logged out.";
      removeStorage(AUTH_SESSION_KEY);
    },
    clearAuthFeedback: (state) => {
      state.error = "";
      state.statusMessage = "";
    },
  },
});

export const {
  requestSignupOtp,
  completeSignup,
  requestLoginOtp,
  completeUserLogin,
  loginAdmin,
  logout,
  clearAuthFeedback,
} = authSlice.actions;

export default authSlice.reducer;
