import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useSignup } from '../hooks/useSignUp';
import ButtonAppBar from '../components/ButtonAppBar';

// API address hardcoded temporarily


export default function SignUp() {


  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('Name'),
      username: data.get('User Name'),      
      password: data.get('password'),
    });

    await signup(data.get('Name'), 
                 data.get('User Name'),
                 data.get('password'))

    // axios.post('http://localhost:3001/api/signup', {
    //   name: data.get('Name'),
    //   username: data.get('User Name'),      
    //   password: data.get('password'),
    // })
    // .then((response) => {
    //   console.log(response)
    //   // redirect to different page?
    //   window.location.replace(
    //     "http://localhost:3000/createjoinroom",
    //   );
    // })
    // .catch((error) => {
    //   console.log(error.response.data.error)
    //   //TODO include ui to alert user

    // })
    
  };

  return (
    <>
      <ButtonAppBar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Name"
              name="Name"
              autoComplete="Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="User Name"
              label="User Name"
              name="User Name"
              autoComplete="User Name"
              autoFocus
            />            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography>{error}</Typography>
      </Container>
      </>
  );
}