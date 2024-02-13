import React, { useEffect } from 'react'
import { Box, Tabs, Tab, Stack, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, } from '@mui/material'
import { Add, Search  } from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip';
import { Delete, Visibility, Edit, Check, Cancel } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// components
import NavHeader from '../../components/NavHeader';
import DeleteDialog from '../../components/Dialogs/DeleteDialog'
import AddWorkerDialog from '../../components/Dialogs/AddWorkerDialog';
import AddEditClassDialog from '../../components/Dialogs/AddEditClassDialog';
import { url } from '../../utils/tools'
import AddClassResponsible from '../../components/Dialogs/AddClassResponsible';

function AdminPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);

  const [workersData, setWorkersData] = React.useState([])
  const [classesData, setClassesData] = React.useState([])
  const [classesResponsibles, setClassesResponsibles] = React.useState([])
  const [classFilter, setClassFilter] = React.useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const workersData = await axios.get(`${url}/workerRoute`, { withCredentials: true });
      const classesData = await axios.get(`${url}/classRoute`, { withCredentials: true });
      const classesResponsibles = await axios.get(`${url}/classResponsible`, { withCredentials: true })

      console.log(workersData.data)

      setWorkersData(workersData.data);
      setClassesData(classesData.data)
      setClassesResponsibles(classesResponsibles.data)
      
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

  // Delete functions 
  const handleDeleteWorkerButtonClick = async (itemId) => {
    try {
        const response = await axios.delete(`${url}/workerRoute/${itemId}`, { withCredentials: true });
        if (response.status === 200) {
          fetchData();
        }
    } catch (error) {
        console.error('Error creating car:', error);
    }
  }
  const handleDeleteClassResponsibleButtonClick = async (itemId) => {
    try {
        const response = await axios.delete(`${url}/classResponsible/${itemId}`, { withCredentials: true });
        if (response.status === 200) {
          fetchData();
        }
    } catch (error) {
        console.error('Error creating car:', error);
    }
  }
  const handleDeleteClassButtonClick = async (itemId) => {
    try {
        const response = await axios.delete(`${url}/classRoute/${itemId}`, { withCredentials: true });
        if (response.status === 200) {
          fetchData();
        }
    } catch (error) {
      console.error('Error creating car:', error);
    }
  }

  const [currentWorkerId, setCurrentWorkerId] = React.useState(false);
  const [currentClassId, setCurrentClassId] = React.useState(false);
  const [currentClassResponsibleId, setCurrentClassResponsibleId] = React.useState(false);

  const [editClass, setEditClass] = React.useState(false);
  
  const [addWorkerDialog, setAddWorkerDialog] = React.useState(false);
  const [addClassDialog, setAddClassDialog] = React.useState(false);
  const [addClassResponsibleDialog, setAddClassResponsibleDialog] = React.useState(false);

  const [classessSearch, setClassesSearch] = React.useState('');
  const [workersSearch, setWorkersSearch] = React.useState('');
  const [classResponseSearch, setClassResponseSearch] = React.useState('');

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFile = async (itemId) => {
    try {
      const response = await axios.get(`${url}/workerRoute/getSurvey/${itemId}`, { withCredentials: true, responseType: 'blob' });
      const url2 = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url2;
      link.setAttribute('download', 'pdf.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) { console.error('Error creating car:', error); }
  }

  return (
    <Box dir="rtl">
      <NavHeader title={'מנהל משאבי אנוש: אליאס סאדר'} isLoggedIn={true}/>

      {isLoading ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}> <CircularProgress color="success" size={80} /> </div> : 
      <>
      <Tabs variant="fullWidth" value={value} onChange={handleChange} centered>
        <Tab label="עובדים" />
        <Tab label="מנהלי מחלקות" />
        <Tab label="מחלקות" />
      </Tabs>

      <TabPanel value={value} index={1}>
        <Box padding={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start" 
          >
            <Typography fontSize='25px' fontWeight='bold'>מנהלי המחלקות</Typography>
            <Button dir='ltr' sx={{boxShadow: 3, borderRadius: 10}} variant="contained" startIcon={<Add/>}
              onClick={() => setAddClassResponsibleDialog(true) }>הוספת מנהל מחלקה</Button>
          </Stack>
          <br/>
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
              onChange={(e) => setClassResponseSearch(e.target.value)}
            />
           <br/><br/>
          
          <Table>
            <TableHead sx={{ backgroundColor: '#D0D0D0' }}>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>שם המנהל</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>מספר המנהל</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>ת.ז</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>מחלקה</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>אימייל</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classesResponsibles.filter((person) => {
                return person.firstName.toString().toLowerCase().includes(classResponseSearch.toLowerCase()) ||
                  person.lastName.toString().toLowerCase().includes(classResponseSearch.toLowerCase()) || 
                  person.number.toString().toLowerCase().includes(classResponseSearch.toLowerCase()) ||
                  person.personalId.toString().toLowerCase().includes(classResponseSearch.toLowerCase());
              }).map((classResponsible, rowIndex) => (
                  <>
                  <TableRow key={rowIndex}>
                    <TableCell align='right'>{classResponsible.firstName} {classResponsible.lastName}</TableCell>
                    <TableCell align='right'>{classResponsible.number}</TableCell>
                    <TableCell align='right'>{classResponsible.personalId}</TableCell>
                    <TableCell align='right'>{classResponsible.class.name}</TableCell>
                    <TableCell align='right'>{classResponsible.email}</TableCell>
                    <TableCell align='right'>
                      <IconButton size='medium' onClick={() => setCurrentClassResponsibleId(classResponsible._id)}>
                        <Delete fontSize="inherit" sx={{ color: 'red' }}/>
                      </IconButton>
                      <IconButton size='medium' onClick={() => navigate(`/classResponsible/${classResponsible._id}`)}>
                        <Edit fontSize="inherit" sx={{ color: 'green' }}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {currentClassResponsibleId === classResponsible._id && <DeleteDialog title={`האם אתה רוצה למחוק העובד ${classResponsible.firstName} ${classResponsible.lastName} שמספרו ${classResponsible.number}`} dialogState={setCurrentClassResponsibleId} yesFunction={handleDeleteClassResponsibleButtonClick} itemId={classResponsible._id}/>}
                </>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TabPanel>

      {/* class admins tab */}
      <TabPanel value={value} index={0}>
        <Box padding={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start" 
          >
            <Typography fontSize='25px' fontWeight='bold'>עובדים</Typography>
            <Button dir='ltr' sx={{boxShadow: 3, borderRadius: 10}} variant="contained" startIcon={<Add/>}
              onClick={() => setAddWorkerDialog(true)}>הוספת עובד</Button>
          </Stack>
          <br/>
          <Stack direction='row'>
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
            onChange={(e) => setWorkersSearch(e.target.value)}
          />
          <TextField
            fullWidth
            variant='outlined'
            id="input-with-icon-textfield"
            placeholder='מחלקות'
            label="מחלקות"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                      <Search />
                  </InputAdornment>
                ),
            }}
            onChange={(e) => setClassFilter(e.target.value)}
          />
          </Stack>
          <br/><br/>
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
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workersData.filter((worker) => {
                return worker.class.name.toLowerCase().includes(classFilter.toLowerCase());
              }).filter((worker) => {
                return worker.firstName.toString().toLowerCase().includes(workersSearch.toLowerCase()) ||
                  worker.lastName.toString().toLowerCase().includes(workersSearch.toLowerCase()) ||
                  worker.number.toString().toLowerCase().includes(workersSearch.toLowerCase()) ||
                  worker.personalId.toString().toLowerCase().includes(workersSearch.toLowerCase());
              }).map((worker, rowIndex) => (
                  <>
                  <TableRow key={rowIndex}>
                    <TableCell align='right'>{worker.firstName} {worker.lastName}</TableCell>
                    <TableCell align='right'>{worker.number}</TableCell>
                    <TableCell align='right'>{worker.personalId}</TableCell>
                    <TableCell align='right'>{worker.class.name}</TableCell>
                    <TableCell align='right'>{worker.role}</TableCell>
                    
                    <TableCell align='right'>
                      {worker?.threeMonthFile?.ifCompleted ? (
                        <IconButton size='medium' onClick={() => getFile(worker?.threeMonthFile.pdfDetail)}>
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
                        <IconButton size='medium' onClick={() => getFile(worker?.sixMonthfFile.pdfDetail)}>
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
                        <IconButton size='medium' onClick={() => getFile(worker?.yearfile.pdfDetail)}>
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
                        <IconButton size='medium'  onClick={() => getFile(worker?.files[worker?.files?.length-1]?._id)}>
                          <Check fontSize="inherit" sx={{ color: 'green' }} />
                        </IconButton>
                      ) : (
                        <IconButton size='medium'>
                          <Cancel fontSize="inherit" sx={{ color: 'red' }} />
                        </IconButton>
                      )}
                    </TableCell>

                    <TableCell align='right'>
                      <IconButton size='medium' onClick={() => setCurrentWorkerId(worker._id)}>
                        <Delete fontSize="inherit" sx={{ color: 'red' }}/>
                      </IconButton>

                    </TableCell>
                  </TableRow>
                  {currentWorkerId === worker._id && <DeleteDialog title={`האם אתה רוצה למחוק העובד ${worker.firstName} ${worker.lastName} שמספרו ${worker.number}`} dialogState={setCurrentWorkerId} yesFunction={handleDeleteWorkerButtonClick} itemId={worker._id}/>}
                </>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TabPanel>

      {/* classes tab */}
      <TabPanel value={value} index={2}>
        <Box padding={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start" 
          >
            <Typography fontSize='25px' fontWeight='bold'>מחלקות</Typography>
            <Button dir='ltr' sx={{boxShadow: 3, borderRadius: 10}} variant="contained" startIcon={<Add/>}
              onClick={() => setAddClassDialog(true)}>הוספת מחלקה</Button>
          </Stack>
          <br/>
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
            onChange={(e) => setClassesSearch(e.target.value)}
          /> <br/><br/>
          
          <Table>
            <TableHead sx={{ backgroundColor: '#D0D0D0' }}>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>מספר</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>מחלקה</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classesData.filter((classItem) => {
                return classItem.name.toLowerCase().includes(classessSearch.toLocaleLowerCase())
              }).map((medicClass, rowIndex) => (
                <>
                  <TableRow key={rowIndex}>
                  <TableCell align='right'>{rowIndex}</TableCell>
                    <TableCell align='right'>{medicClass.name}</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='לערוך'>
                        <IconButton size='medium' onClick={() => setEditClass(medicClass._id)}>
                          <Edit fontSize="inherit" sx={{ color: 'green' }}/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  {editClass === medicClass._id && <AddEditClassDialog dialogState={editClass} changeDialogStatus={setEditClass} yesFunction={fetchData} isEdit={true} classData={medicClass} title={"לערוך שם המחלקה"} />}
                  {currentClassId === medicClass._id && <DeleteDialog title={`האם אתה רוצה למחוק המחלקה ${medicClass.name}`} dialogState={setCurrentClassId} yesFunction={handleDeleteClassButtonClick} itemId={medicClass._id}/>}
                </>
              ))}
            </TableBody>
          </Table>
          
        </Box>
      </TabPanel>

      <AddWorkerDialog dialogState={addWorkerDialog} changeDialogStatus={setAddWorkerDialog} yesFunction={fetchData} />
      <AddEditClassDialog dialogState={addClassDialog} changeDialogStatus={setAddClassDialog} yesFunction={fetchData} title={"הוספת מחלקה"}/>
      <AddClassResponsible dialogState={addClassResponsibleDialog} changeDialogStatus={setAddClassResponsibleDialog} yesFunction={fetchData} isEdit={false} classData={null} />
      </>
      }
    </Box>
  )
}

export default AdminPage


function TabPanel(props) {
  const { children, value, index } = props;

  if (value === index) {
    // Display the content of this tab panel when it's active
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {children}
      </div>
    );
  } else {
    // Hide the content when it's not active
    return null;
  }
}