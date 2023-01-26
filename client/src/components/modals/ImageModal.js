import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';

export default function ImageModal({open, handleClose}) {
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ></Modal>
    )
}