import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import BookingForm from "./BookingForm";

export default function BookingModal({ open, onClose, station }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{station ? `Reserve at ${station.name}` : "Reserve your charging slot"}</DialogTitle>
      <DialogContent>
        <div className="py-4">{station && <BookingForm station={station} onSuccess={() => onClose()} />}</div>
      </DialogContent>
    </Dialog>
  );
}
