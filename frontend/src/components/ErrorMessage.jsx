import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

export default function ErrorMessage({ message, severity }) {
  const [open, setOpen] = useState(true);
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        variant="warning"
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
