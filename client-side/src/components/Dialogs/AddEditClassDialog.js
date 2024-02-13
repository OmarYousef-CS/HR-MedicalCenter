import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { url } from '../../utils/tools'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddRoleDialog({ dialogState, changeDialogStatus, yesFunction, isEdit, classData, title }) {
    useEffect(() => {
      if(isEdit) {
        setClassName(classData.name)
      }
    }, []);  
  
    const [className, setClassName] = React.useState('');

    const handleSubmit = async () => {
      try {
        // Send a POST request to your server endpoint
        let response = null;
        if(isEdit) {
          response = await axios.put(`${url}/classRoute/${classData._id}`, { name: className }, { withCredentials: true });
        } else {
          response = await axios.post(`${url}/classRoute`, { name: className }, { withCredentials: true });
        }
        
  
        // Handle the response as needed (e.g., show a success message)
        console.log(response.data);
  
        toast.success('Worker added successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Close the dialog
        yesFunction()
        changeDialogStatus(false);
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error adding worker:', error);
        toast.error('Error adding worker. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

  return (
    <Dialog
      fullWidth
      open={dialogState}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      dir='rtl'
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>{title}</DialogTitle>
      <DialogContent>        
        <TextField id="standard-basic" placeholder="שם המחלקה" variant="outlined" 
            onChange={(e) => setClassName(e.target.value)} value={className}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'white', bgcolor: 'red', borderRadius: 30, margin: 1 }} onClick={() => changeDialogStatus(false)}>ביטול</Button>
        <Button sx={{ color: 'white', bgcolor: '#00FF40', borderRadius: 30, margin: 1 }} onClick={handleSubmit}>{isEdit ? "עריכה" : "הוספה"}</Button>
      </DialogActions>
    </Dialog>
  );
}