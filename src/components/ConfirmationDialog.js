import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
          <WarningIcon style={{ marginRight: '8px', color: '#f57c00' }} />
          Confirm Delete
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          Are you sure you want to delete this task? This action cannot be undone. Please confirm your choice.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
