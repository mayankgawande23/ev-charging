import { useSelector } from "react-redux";

export function useBooking() {
  return useSelector((state) => state.bookings);
}
