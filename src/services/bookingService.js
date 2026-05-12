import { bookings } from "./mockData";

export const bookingService = {
  getBookings: async () => Promise.resolve(bookings),
};
