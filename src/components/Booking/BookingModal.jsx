import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import BookingForm from "./BookingForm";

export default function BookingModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Reserve your charging slot</DialogTitle>
      <DialogContent>
        <div className="py-4">
          <BookingForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
