// src/Login.js
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login() {
  const apiKey = process.env.REACT_APP_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth,setIsAuth] = useState(false);
  const [invalid,setInvalid] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const Login = async (email,password) => {
    axios.post(apiKey + "/login", {email,password }).then((response) => {
        console.log("my login data result is",response?.data?.user)
        if(response?.data?.user && response?.data?.jwt){
          localStorage.setItem('token',response?.data?.jwt)
          setIsAuth(true);
        }
        else{
          setInvalid(true);
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., validate credentials, make API request)
    console.log('Username:', username);
    console.log('Password:', password);
    Login(username,password);
  };

  if(isAuth){
    return(
      <Navigate to="/dashboard" />
    )
  }

  return (
    <Container component="main" maxWidth="xs" style={{height:'100vh',display:'flex',alignItems:'center'}}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockOutlinedIcon sx={{ fontSize: 'large' }} />
        <Typography component="h1" variant="h5" mt={2}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
        {
          invalid && 
          <div style={{color:'red'}}>Please Enter Valid Credential</div>
        }
      </Paper>
    </Container>
  );
}

export default Login;
