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
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddClassResponsible({ dialogState, changeDialogStatus, yesFunction }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [classesData, setClassesData] = React.useState([])
  
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const classesData = await axios.get(`${url}/classRoute`, { withCredentials: true });
        setClassesData(classesData.data)
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    
    const handleAddClassResponsible = async () => {
      try {
        // Send a POST request to your server endpoint
        const response = await axios.post(`${url}/classResponsible`, {
           username,
           password,
           firstName,
           lastName,
           number,
           personalId,
           classId: responsibleClass,
           email,
        }, { withCredentials: true });
  
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

    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [personalId, setPersonalId] = React.useState('');
    const [responsibleClass, setResponsibleClass] = React.useState('');
    const [email, setEmail] = React.useState('');

    const generateRandomPassword = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const passwordLength = 8;
      let password = '';
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
      }
      return password;
    };

    const handleGeneratePassword = () => {
      const newPassword = generateRandomPassword();
      setPassword(newPassword);
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
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>הוספת מחלקה</DialogTitle>
      <DialogContent>        
        {isLoading ? (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}> <CircularProgress color="success" size={80} /> </div>) : (
            <Stack direction='column' spacing={4}>

                <TextField id="standard-basic" placeholder='שם משטמש' variant="standard" 
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Stack direction='row' spacing={2} justifyContent='space-between'>
                  <TextField
                    sx={{ width: '65%' }}
                    id="standard-basic"
                    label="סיסמה"
                    variant="standard"
                    value={password}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Button variant="contained" color="primary" onClick={handleGeneratePassword}>
                    יצירת סיסמה
                  </Button>
                </Stack>
        
                <TextField id="standard-basic" placeholder='שם פרטי' variant="standard" 
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField id="standard-basic" placeholder="שם משפחה" variant="standard" 
                  onChange={(e) => setLastName(e.target.value)}
                />

                <TextField id="standard-basic" placeholder="מספר מנהל המחלקה" variant="standard" 
                  onChange={(e) => setNumber(e.target.value)}
                />

                <TextField id="standard-basic" placeholder="ת.ז" variant="standard" 
                  onChange={(e) => setPersonalId(e.target.value)}
                />

                <Stack>
                  <InputLabel id="demo-simple-select-label">מחלקה</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={responsibleClass}
                    label="מחלקה"
                    onChange={(e) => setResponsibleClass(e.target.value)}
                  >
                    {classesData.map((classItem, index) => (
                      <MenuItem key={index} value={classItem}>{classItem.name}</MenuItem>
                    ))}
                  </Select>
                </Stack>

                <TextField id="standard-basic" placeholder="איימיל" variant="standard" 
                  onChange={(e) => setEmail(e.target.value)}
                />

            </Stack>
        )}

      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'white', bgcolor: 'red', borderRadius: 30, margin: 1 }} onClick={() => changeDialogStatus(false)}>ביטול</Button>
        <Button sx={{ color: 'white', bgcolor: '#00FF40', borderRadius: 30, margin: 1 }} onClick={handleAddClassResponsible}>הוספה</Button>
      </DialogActions>
    </Dialog>
  );
}