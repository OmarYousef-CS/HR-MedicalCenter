import React, { useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormLabel, Stack, Input, FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { url } from '../../utils/tools'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddWorkerDialog({ dialogState, changeDialogStatus, yesFunction }) {
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

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [personalId, setPersonalId] = React.useState('');
  const [workerClass, setWorkerClass] = React.useState('');
  const [role, setRole] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [day, setDay] = React.useState((new Date()).getDate());
  const [month, setMonth] = React.useState((new Date()).getMonth() + 1);
  const [year, setYear] = React.useState((new Date()).getFullYear());

  const handleAddWorker = async () => {
    try {
      // Send a POST request to your server endpoint
      const response = await axios.post(`${url}/workerRoute`, {
        firstName,
        lastName,
        number,
        personalId,
        workerClass,
        role,
        email,
        startDate: {
          day,
          month,
          year,
        },
      }, { withCredentials: true });

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
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>הוספת עובד</DialogTitle>
      <DialogContent>
      {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}>
            <CircularProgress color="success" size={80} />
          </div>
        ) : (
        <Stack direction='column' spacing={4}>
        
            <TextField id="standard-basic" placeholder='שם פרטי' variant="standard" 
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField id="standard-basic" placeholder="שם משפחה" variant="standard" 
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField id="standard-basic" placeholder="מספר עובד" variant="standard" 
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
                value={workerClass}
                label="מחלקה"
                onChange={(e) => setWorkerClass(e.target.value)}
              >
                {classesData.map((classItem, index) => (
                  <MenuItem key={index} value={classItem}>{classItem.name}</MenuItem>
                ))}
              </Select>
            </Stack>

            <TextField id="standard-basic" placeholder="תפקיד" variant="standard" 
              onChange={(e) => setRole(e.target.value)}
            />

            <TextField id="standard-basic" placeholder="איימיל" variant="standard" 
              onChange={(e) => setEmail(e.target.value)}
            />


              <FormControl>
                <FormLabel fontSize={{base: 'medium', md: 'x-large', fontWeight: 'bold'}} fontWeight="bold">תאריך תחילת עבודה</FormLabel>
                <Stack spacing={4} direction={{ base: 'column-reverse', md: 'row'}} >
                  <Stack direction='row'>
                    <FormLabel fontSize={{base: 'medium', md: 'x-large'}} fontWeight="bold">שנה:</FormLabel>
                    <Input value={year} type='number' onChange={(e)=>setYear(e.target.value)}/>
                  </Stack>
                  <Stack direction='row'>
                    <FormLabel fontSize={{base: 'medium', md: 'x-large'}} fontWeight="bold">חודש:</FormLabel>
                    <Input value={month} type='number' onChange={(e)=>setMonth(e.target.value)}/>
                  </Stack>
                  <Stack direction='row'>
                    <FormLabel fontSize={{base: 'medium', md: 'x-large'}} fontWeight="bold">יום:</FormLabel>
                    <Input value={day} type='number' onChange={(e)=>setDay(e.target.value)}/>
                  </Stack>
                </Stack>
              </FormControl><br/>

        </Stack>)}
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'white', bgcolor: 'red', borderRadius: 30, margin: 1 }} onClick={() => changeDialogStatus(false)}>ביטול</Button>
        <Button sx={{ color: 'white', bgcolor: '#00FF40', borderRadius: 30, margin: 1 }} onClick={ async () => { 
          await handleAddWorker();
          yesFunction();
        }}>הוספה</Button>
      </DialogActions>
    </Dialog>
  );
}