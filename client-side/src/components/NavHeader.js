import React from 'react'
import logo from '../assets/logo.png'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { url } from '../utils/tools';

function NavHeader({ title, isLoggedIn }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post(`${url}/auth/logout`, {} ,{ withCredentials: true });
      // If the logout request is successful, you can redirect the user to another page or perform any other actions as needed
      console.log('Logout successful', response.data);
      // Redirect to the home page or login page
      const response2 = await axios.get(`${url}/auth/status`, { withCredentials: true });
      if (response2.status === 200) {
        // Assuming your server responds with JSON data like { isAuthenticated: true }
        console.log(' Out ')
        navigate('/admin-login')
        // Check if isAuthenticated is true in the response data
      } else {
        console.error('Error logging out:', response2.data);
      }
      
    } catch (error) {
      console.error('Error logging out:', error);
      if (error?.response?.status === 401) { navigate('/admin-login') }
    }
  };


  return (
    <AppBar position="static">
    <Stack 
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {title}
        </Typography>
      </Toolbar>
      <Toolbar><img src={logo} alt="Logo" style={{ height: '70px', width: '500px', margin: '7px' }} /></Toolbar>
      {isLoggedIn ? <Button sx={{ borderRadius: '20px', bgcolor: '#EF0B0B', color: '#FFFFFF' }} onClick={logout}>התנתהק</Button> : <div></div>}
    </Stack>
  </AppBar>
  )
}

export default NavHeader
