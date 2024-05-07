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
import { useSignup } from '../hooks/useSignUp';
import ButtonAppBar from '../components/ButtonAppBar';
// TODO: ADD form verificaiton for sign up inputs

// Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from "firebase/auth";

// Firebase project configuration object; found on firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAsP60E4L_v-KNsVosofJhXVhCzELPHNI4",
  authDomain: "roommates-chore-organizer.firebaseapp.com",
  projectId: "roommates-chore-organizer",
  storageBucket: "roommates-chore-organizer.appspot.com",
  messagingSenderId: "811791432329",
  appId: "1:811791432329:web:55ac975dc3a1a80f22e458"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function SignUp() {

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract data from form
    const data = new FormData(event.currentTarget);
    const Name = String(data.get("Name"));
    const Email = String(data.get("Email"));
    const Password = String(data.get("Password"));
    console.log("Creating User", { Name: Name, Email: Email });

    // Create a user with firebase
    const auth = getAuth();
    let user = null;
    await createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
            user = userCredential.user;
            return updateProfile(user, {displayName: `${Name}`})
        })
        .then(()=> {
            console.log("User created with firebase");
            return sendEmailVerification(auth.currentUser);
        })
        .then(() => {
            console.log("email verification sent");
            return auth.currentUser.getIdToken(true);
        })
        .then((idToken) => {
            return signup(idToken, true, null);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            return signup(null, false, errorMessage);
            // TODO: call sign in hook with error, modify UseSignUp appropriately
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
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
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
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
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
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