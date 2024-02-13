import React, { useEffect } from 'react'
import { Box, Stack, Typography, Button, TextField, InputAdornment,
    Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip} from '@mui/material'
import { Add, Cancel, Check } from '@mui/icons-material';
import NavHeader from '../../components/NavHeader'
import { Search } from '@mui/icons-material'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { url } from '../../utils/tools'

function UserPage() {
  const navigate = useNavigate();

  const classResponsibleId = useParams();

  const [isLoading, setIsLoading] = React.useState(true);

  const [classResponsibleData, setClassResponsibleData] = React.useState([])
  const [workersData, setWorkersData] = React.useState([])

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const classResponsibleData = await axios.get(`${url}/classResponsible/${classResponsibleId.id}`, { withCredentials: true })
      const workersData = await axios.get(`${url}/workerRoute/getWorkersByClass/${classResponsibleData.data.class._id}`, { withCredentials: true });
      console.log(workersData.data)

      setWorkersData(workersData.data);
      setClassResponsibleData(classResponsibleData.data)
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error?.response?.status === 401) { navigate('/admin-login') }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = React.useState('');

  return (
    <Box dir='rtl'>
        <NavHeader title={`שלום ${classResponsibleData?.firstName} ${classResponsibleData?.lastName} !`} isLoggedIn={true}/>
        {isLoading ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}> <CircularProgress color="success" size={80} /> </div> : 
        <Box marginRight={1} marginLeft={1}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '26px', textAlign: 'center', marginTop: 1 }}>מחלקת ה{classResponsibleData.class ? classResponsibleData.class.name : "מחלקה"}</Typography><br/>
        <TextField
          fullWidth
          variant='outlined'
          id="input-with-icon-textfield"
          placeholder='חיפוש'
          label="חיפוש"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
        /> <br/>
        <Typography marginRight={2} fontWeight='bold'>עובדים</Typography>
        <Table>
          <TableHead sx={{ backgroundColor: '#D0D0D0' }}>
            <TableRow>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>שם עובד</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>מספר עובד</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>ת.ז</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>מחלקה</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>תפקיד</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>עריכת 3 חודשים</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>עריכת 6 חודשים</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>עריכת שנה</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>עריכת כל 6 חודשים</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>הוספת עריכה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workersData.filter((worker) => {
              return worker.firstName.toString().toLowerCase().includes(search.toLowerCase()) ||
                worker.lastName.toString().toLowerCase().includes(search.toLowerCase()) ||
                worker.number.toString().toLowerCase().includes(search.toLowerCase()) ||
                worker.personalId.toString().toLowerCase().includes(search.toLowerCase());
            })
            .map((worker, rowIndex) => (
              <>
                <TableRow key={rowIndex}>
                <TableCell align='right'>{worker.firstName} {worker.lastName}</TableCell>
                    <TableCell align='right'>{worker.number}</TableCell>
                    <TableCell align='right'>{worker.personalId}</TableCell>
                    <TableCell align='right'>{worker.class.name}</TableCell>
                    <TableCell align='right'>{worker.role}</TableCell>
                    
                    <TableCell align='right'>
                      {worker?.threeMonthFile?.ifCompleted ? (
                        <IconButton size='medium'>
                          <Check fontSize="inherit" sx={{ color: 'green' }} />
                        </IconButton>
                      ) : (
                        <IconButton size='medium'>
                          <Cancel fontSize="inherit" sx={{ color: 'red' }} />
                        </IconButton>
                      )}
                    </TableCell>
                      
                    <TableCell align='right'>
                      {worker?.sixMonthfFile?.ifCompleted ? (
                        <IconButton size='medium'>
                          <Check fontSize="inherit" sx={{ color: 'green' }} />
                        </IconButton>
                      ) : (
                        <IconButton size='medium'>
                          <Cancel fontSize="inherit" sx={{ color: 'red' }} />
                        </IconButton>
                      )}
                    </TableCell>
                      
                    <TableCell align='right'>
                      {worker?.yearfile?.ifCompleted ? (
                        <IconButton size='medium'>
                          <Check fontSize="inherit" sx={{ color: 'green' }} />
                        </IconButton>
                      ) : (
                        <IconButton size='medium'>
                          <Cancel fontSize="inherit" sx={{ color: 'red' }} />
                        </IconButton>
                      )}
                    </TableCell>

                    <TableCell align='right'>
                      {worker?.files?.length > 0  && ((new Date() - 
                      new Date(worker?.files[worker?.files?.length-1]?.date?.year, worker?.files[worker?.files?.length-1]?.date?.month, worker?.files[worker?.files?.length-1]?.date?.day)) / (1000 * 3600 * 24) / 30.436875) <= 6? (
                        <IconButton size='medium'>
                          <Check fontSize="inherit" sx={{ color: 'green' }} />
                        </IconButton>
                      ) : (
                        <IconButton size='medium'>
                          <Cancel fontSize="inherit" sx={{ color: 'red' }} />
                        </IconButton>
                      )}
                    </TableCell>

                    <TableCell align='right'>
                      <IconButton size='medium' onClick={() => navigate(`/user/${classResponsibleId.id}/addSurvey/${worker._id}`)}>
                        <Tooltip title='הוספת עריכה'>
                          <Add fontSize="inherit" sx={{ color: 'green' }}/>
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        </Box>
        }
    </Box>
  )
}

export default UserPage
