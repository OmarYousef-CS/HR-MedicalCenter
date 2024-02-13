import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavHeader from "../../components/NavHeader";
import Axios from 'axios';
import { url } from '../../utils/tools'
import { useNavigate } from "react-router-dom";

export default function ClassResponsibleLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await Axios.post(`${url}/auth/classResponse-login`, {
        username: data.get("Username"),
        password: data.get("password"),
      }, { withCredentials: true });

      console.log(response.data); // Handle the response as needed
      const getId = response.data.id;
      console.log(getId)
      if(response.status === 200) { navigate(`/user/${getId}`) }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (<>
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
          כניסה מנהל מחלקה
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: "center"  }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="שם משתמש"
            name="Username"
            autoComplete="email"
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
          >
            כניסה
          </Button>
          <Button onClick={() => navigate('/admin-login')} >
            כניסת משאבי אינוש
          </Button>
        </Box>
      </Box>
    </Container></>
  );
}