import { Avatar, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SectionCard from "../UI/SectionCard";
import { toggleDarkMode } from "../../store/uiSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <SectionCard className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center gap-4">
          <Avatar sx={{ width: 96, height: 96, bgcolor: "#10B981", fontSize: 40 }}>{user.name[0]}</Avatar>
          <div>
            <h1 className="font-display text-4xl font-bold">{user.name}</h1>
            <p className="mt-2 text-slate-500">{user.email}</p>
            <p className="text-slate-500">{user.phone}</p>
            <p className="text-slate-500">{user.location}</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Total bookings</p>
            <p className="mt-2 text-2xl font-semibold">24</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Total charged</p>
            <p className="mt-2 text-2xl font-semibold">845 kWh</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Member since</p>
            <p className="mt-2 text-2xl font-semibold">{user.memberSince}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Rating</p>
            <p className="mt-2 text-2xl font-semibold">★★★★★</p>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard>
          <h2 className="font-display text-2xl font-semibold">Saved locations</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>Home: 123 Street, Delhi</p>
            <p>Office: 456 Avenue, Gurgaon</p>
            <p>ChargeFast Central Station</p>
          </div>
        </SectionCard>
        <SectionCard>
          <h2 className="font-display text-2xl font-semibold">Saved payment methods</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>Visa •••• 4242 (Default)</p>
            <p>PayPal - john.doe@email.com</p>
          </div>
        </SectionCard>
      </div>

      <SectionCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold">Preferences</h2>
            <p className="mt-2 text-sm text-slate-500">Email notifications, alerts, and visual mode preferences.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Dark mode</span>
            <Switch checked={darkMode} onChange={() => dispatch(toggleDarkMode())} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
