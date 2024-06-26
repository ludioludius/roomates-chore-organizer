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

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();


export default function SignIn() {
    const {signin, error, isLoading} = useSignin()


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const Email = String(data.get("Email"));
        const Password = String(data.get("Password"));

        const auth = getAuth();
        signInWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
                // Signed in
                console.log("user signed in with firebase");
                const user = userCredential.user;
                return user.getIdToken(true);
            })
            .then((idToken) => {
                return signin(idToken, true, null);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                return signin(null, false, errorMessage);
            });

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
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
              autoFocus
            />            
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="Password"
              id="Password"
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