import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { dismissNotification, markAllRead } from "../../store/notificationSlice";
import { toggleNotificationOpen } from "../../store/uiSlice";
import { notificationTabs } from "../../utils/constants";
import { useState } from "react";

export default function NotificationCenter() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.notificationOpen);
  const notifications = useSelector((state) => state.notifications.items);
  const [tab, setTab] = useState("All");

  if (!open) return null;

  const visible = tab === "All" ? notifications : notifications.filter((item) => item.category === tab);

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="ml-auto h-full w-full max-w-md overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold">Notifications</h2>
            <p className="text-sm text-slate-500">Real-time booking, system, and promo updates.</p>
          </div>
          <IconButton aria-label="Close notifications" onClick={() => dispatch(toggleNotificationOpen())}>
            <FiX />
          </IconButton>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {notificationTabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                tab === item
                  ? "bg-brand-green text-white"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <Button variant="text" onClick={() => dispatch(markAllRead())}>
          Mark All as Read
        </Button>
        <div className="mt-4 space-y-3">
          {visible.map((notification) => (
            <div key={notification.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{notification.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{notification.message}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-orange">
                    {notification.category} • {notification.time}
                  </p>
                </div>
                <button
                  className="rounded-full bg-slate-100 p-2 text-slate-500 dark:bg-slate-800"
                  aria-label="Dismiss notification"
                  onClick={() => dispatch(dismissNotification(notification.id))}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
