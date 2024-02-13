import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { url } from '../../../utils/tools'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack, Typography, } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';

function EditClassResponsible() {
    const classAdminId = useParams();
    const navigate = useNavigate();

    const [classAdmin, setClassAdmin] = React.useState()
    const [classesData, setClassesData] = React.useState([]);

    const fetchData = async () => {
      try {
          const classAdmin = await axios.get(`${url}/classResponsible/${classAdminId.id}`, { withCredentials: true });
          const classesResponse = await axios.get(`${url}/classRoute`, { withCredentials: true });
          console.log(classAdmin.data)
          setClassesData(classesResponse.data);
          setClassAdmin(classAdmin.data);
  
          setUsername(classAdmin.data.username);
          setFirstName(classAdmin.data.firstName);
          setLastName(classAdmin.data.lastName);
          setNumber(classAdmin.data.number);
          setPersonalId(classAdmin.data.personalId);
          setResponsibleClass(classAdmin.data.class);
          setEmail(classAdmin.data.email);
      } catch (error) {
          console.error('Error fetching data:', error);
          if (error?.response?.status === 401) { navigate('/admin-login') }
      }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const [isAddButtonLoading, setIsAddButtonLoading] = React.useState(false);


  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [personalId, setPersonalId] = React.useState('');
  const [responsibleClass, setResponsibleClass] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = async () => {
    try {
      setIsAddButtonLoading(true)
      const response = await axios.put(`${url}/classResponsible/${classAdmin._id}`, {
        username,
        firstName,
        lastName,
        number,
        personalId,
        classId: responsibleClass,
        email,
     }, { withCredentials: true });

     if(response.status === 200) { console.log(response) }
     setIsAddButtonLoading(false)
     navigate('/')
    } catch (error) {
      console.error('Error creating car:', error);
    }
  }



  return (
    <Box dir='rtl' margin={3}>
      <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>עריכת פרטי מנהל המחלקה: {firstName} {lastName}</Typography>
      <Box padding={2} marginTop={2}>        
            <Stack direction='column' spacing={4}>

                <Stack>
                  <InputLabel>שם משטמש</InputLabel>
                  <TextField id="standard-basic" placeholder='שם משטמש' variant='outlined' 
                    onChange={(e) => setUsername(e.target.value)} value={username}
                  />
                </Stack>

                <Stack>
                  <InputLabel>שם פרטי</InputLabel>
                  <TextField id="standard-basic" placeholder='שם פרטי' variant="outlined" 
                    onChange={(e) => setFirstName(e.target.value)} value={firstName}
                  />
                </Stack>

                <Stack>
                  <InputLabel>שם משפחה</InputLabel>
                  <TextField id="standard-basic" placeholder="שם משפחה" variant="outlined" 
                    onChange={(e) => setLastName(e.target.value)} value={lastName}
                  />
                </Stack>

                <Stack>
                  <InputLabel>מספר המנהל</InputLabel>
                  <TextField id="standard-basic" placeholder="מספר מנהל המחלקה" variant="outlined" 
                    onChange={(e) => setNumber(e.target.value)} value={number}
                  />
                </Stack>

                <Stack>
                  <InputLabel>ת.ז</InputLabel>
                  <TextField id="standard-basic" placeholder="ת.ז" variant="outlined" 
                    onChange={(e) => setPersonalId(e.target.value)} value={personalId}
                  />
                </Stack>

                <Stack>
                  <InputLabel id="demo-simple-select-label">מחלקה</InputLabel>
                  <Stack direction='row' justifyContent="space-evenly" spacing={3}>
                    <Typography>מחלקה נוכחית: {classAdmin?.class?.name}</Typography>
                    <Select
                      fullWidth
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
                </Stack>

                <Stack>
                  <InputLabel>כתובת אימייל</InputLabel>
                  <TextField id="standard-basic" placeholder="איימיל" variant="outlined" 
                    onChange={(e) => setEmail(e.target.value)} value={email}
                  />
                </Stack>
            </Stack><br/>
            {isAddButtonLoading ? ( <CircularProgress color="success" /> ) : (
            <Button type='submit' sx={{
                boxShadow: '10px',
                backgroundColor: '#4caf50',
                border: 'none',
                color: 'white',
                textAlign: 'center',
                fontSize: '16px',
                borderRadius: '20px',
                width: '100%',
              }} onClick={handleSubmit}>עריכה
            </Button>
        )}
      </Box>
    </Box>
  )
}

export default EditClassResponsible
