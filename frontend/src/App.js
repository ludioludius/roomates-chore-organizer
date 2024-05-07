import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import Home from './Pages/Home'
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Purchases from "./Pages/Purchases";
import {CssBaseline} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import PeopleIcon from '@mui/icons-material/People';
import * as React from "react";
import axios from "axios";


function App() {
  const { user } = useAuthContext()

  if (user) {
    return <UserLoggedIn />
  } else {
    return <NoUserLoggedIn />
  }
}

function NoUserLoggedIn() {

  return (
      <>
        <CssBaseline/>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/home" exact element={<Home/>}/>
                <Route path="/signin" exact element={<SignIn/>}/>
                <Route path="/signup" exact element={<SignUp/>}/>
                <Route path="/dashboard" exact element={<SignIn/>} />
                <Route path="/purchases" exact element= {<SignIn/>}/>
                <Route path="/createRoom" exact element= {<SignIn/>}/>
                <Route path="/joinRoom" exact element= {<SignIn/>}/>
            </Routes>
        </BrowserRouter>
      </>
  )
}

function UserLoggedIn() {
  const { user } = useAuthContext()

    let userState = JSON.parse(localStorage.getItem('user'));
    console.log(typeof userState.hasRoom);
    console.log(userState.hasRoom);

  return (
      <>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/signin" exact element={userState.hasRoom? <Navigate to="/dashboard"/> : <JoinRoom/>}/>
          <Route path="/signup" exact element={userState.hasRoom? <Navigate to="/dashboard"/> : <JoinRoom/>}/>
          <Route path="/dashboard" exact element={userState.hasRoom? <Dashboard /> : <Navigate to="/signin"/>} />
          <Route path="/purchases" exact element= {userState.hasRoom? <Purchases /> : <Navigate to="/signin"/>}/>
            <Route path="/createRoom" exact element= {userState.hasRoom? <Dashboard /> : <CreateRoom/>}/>
            <Route path="/joinRoom" exact element= {userState.hasRoom? <Dashboard /> : <JoinRoom/>}/>
        </Routes>
      </BrowserRouter>
      </>
  )
}

function JoinRoom() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
                    <Avatar sx={{ mb: 5, bgcolor: 'secondary.main' }}>
                        <PeopleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter Room Name to Join a Room
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mb: 1 }}
                        >
                            Join Room
                        </Button>
                        <Grid container>
                            <Grid item sx={{ mt: 1 }}>
                                <Link href="/createRoom" variant="body2">
                                    {"Click here to create a room instead"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
  )
}


function CreateRoom() {
    const { user } = useAuthContext()
    const {dispatch} = useAuthContext()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            roomName: data.get('room'),
        });
        const roomName = String(data.get('room'));
        let userState = JSON.parse(localStorage.getItem('user'));
        console.log(typeof userState.uid);
        axios.post(`http://localhost:3001/api/rooms/createRoom/${userState.uid}/${roomName}`, {})
            .then((response) => {
                //change user context
                //store response data in the browser (includes token)
                let newUserState = JSON.parse(localStorage.getItem('user'));
                newUserState.hasRoom = true;
                newUserState.roomName = String(data.get('room'));
                localStorage.setItem('user', JSON.stringify(newUserState));

                //update AuthContext
                dispatch({type: 'LOGIN', payload: JSON.stringify(newUserState)})
            })
            .catch(error => {
                console.log(error);
            })


    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ mb: 5, bgcolor: 'secondary.main' }}>
                <PeopleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Enter Room Name to Create a Room
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="room"
                    label="Room Name"
                    name="room"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mb: 1 }}
                >
                    Create Room
                </Button>
                <Grid container>
                    <Grid item sx={{ mt: 1 }}>
                        <Link href="/joinRoom" variant="body2">
                            {"Click here to join a room instead"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}



export default App;