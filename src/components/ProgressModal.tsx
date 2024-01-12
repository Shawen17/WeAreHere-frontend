import { useState } from "react";
import { Button } from "./Styled";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProgressModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button type="submit" onClick={handleOpen}>
        Book Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="middle">
          <CircularProgress color="success" />
        </div>
      </Modal>
    </div>
  );
}
