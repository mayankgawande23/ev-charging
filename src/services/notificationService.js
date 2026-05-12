import { notifications } from "./mockData";

export const notificationService = {
  getNotifications: async () => Promise.resolve(notifications),
};
