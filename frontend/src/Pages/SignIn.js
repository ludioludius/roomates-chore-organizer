import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import ButtonAppBar from '../components/ButtonAppBar';
import { useSignin } from '../hooks/useSignIn';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();


export default function SignIn() {
    const {signin, error, isLoading} = useSignin()


    const handleSubmit = async (event) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      console.log({
        username: data.get('User Name'),
        password: data.get('password'),
      })

        createUserWithEmailAndPassword(auth, String(data.get('User Name')), String(data.get('password')))
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    // await signin(data.get('Name'), data.get('User Name'), data.get('password'))
  }

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
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      <Typography>{error}</Typography>
      </Container>
      </>
  )
}