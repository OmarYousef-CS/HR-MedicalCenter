import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialog({ title, dialogState, yesFunction, itemId }) {
  return (
    <Dialog
        open={dialogState}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        dir='rtl'
      >
        <DialogTitle>{ title }</DialogTitle>
        <DialogActions>
          <Button onClick={() => dialogState(false)}
            sx={{ borderRadius: 30, bgcolor: 'red', color: 'white', fontSize: '16px', fontWeight: 'bold', margin: 1 }} >לא</Button>
          <Button
          sx={{ borderRadius: 30, bgcolor: 'green', color: 'white', fontSize: '16px', fontWeight: 'bold', margin: 1}} 
          onClick={() => {
            dialogState(false)
            yesFunction(itemId);
          }}>כן</Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteDialog