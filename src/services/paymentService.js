import { api } from "./api";

export const paymentService = {
  process: (payload) => api.post("/payments/process", payload),
  history: () => api.get("/payments/history"),
};
