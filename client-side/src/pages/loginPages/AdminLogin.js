import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Axios from 'axios';
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavHeader from '../../components/NavHeader.js';
import { url } from '../../utils/tools'
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await Axios.post(`${url}/auth/admin-login`, {
        username: data.get("Username"),
        password: data.get("password"),
      },{ withCredentials: true });

      console.log(response); // Handle the response as needed
      if(response.status === 200) {
        console.log("20000000000000")
        navigate('/')
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return ( <>
    <NavHeader isLoggedIn={false}/>
    <Container dir="rtl" component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          כניסה מנהל משאבי אינוש
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: "center"  }}>
          <TextField
            margin="Username"
            required
            fullWidth
            id="Username"
            label="שם משתמש"
            name="Username"
            autoComplete="Username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="שישמה"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
          >
            כניסה
          </Button>
          <Button onClick={() => navigate('/classResponsible-login')} variant="body2">
             כניסה מנהל מחלקה  
          </Button>
        </Box>
      </Box>
    </Container></>
  );
}