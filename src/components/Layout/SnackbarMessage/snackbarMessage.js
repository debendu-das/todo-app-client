import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SnackbarMessage = (props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <Alert onClose={props.handleClose} severity={`${props.severity}`}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarMessage
