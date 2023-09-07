import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Groups3SharpIcon from '@mui/icons-material/Groups3Sharp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, ListItemButton, ListItemIcon, ListItemText, TextField, Select, MenuItem } from '@mui/material';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import TaskTable from '../components/TaskTable';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const defaultTheme = createTheme();

export default function Dashboard() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [tasks, setTasks] = useState([])

const handleSubmit = (event) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget);
  console.log(data.get('Task'), data.get('Description'), data.get('Frequency'))
  console.log(JSON.parse(user).roomcode)

  axios.post('http://localhost:3001/api/tasks', {name: data.get('Task'), description: data.get('Description'), frequency: data.get('Frequency'),
                                                  roomcode: JSON.parse(user).roomcode})
  .then((response) => {
    console.log(response.data)
    setTasks(tasks.concat(response.data))
  })
  .catch((e) => {
    console.log(e)
  })
}


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Groups3SharpIcon sx={{ mr: 2}}/>
            <Typography
              variant="h5" 
              component="a"
              color="inherit"
              noWrap
              href='/home'
              sx={{
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Chorify
            </Typography>
            {!user && <Button color="inherit" href='/signin'>Sign In</Button>}
            <Button color="inherit" href="/home">Home</Button>
            {/* <Button color="inherit">FAQs</Button> */}
            {user && <Button color="inherit" href='/dashboard'> Dashboard </Button>}
            <Button color="inherit" onClick={() => logout()}> Log out </Button>
            {user &&
            <Button color="inherit"> {JSON.parse(user).username} </Button>
          }       
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* <ListItemButton href='/addTasks'>
              <ListItemIcon>
                <TaskAltIcon/>
              </ListItemIcon>
              <ListItemText>
                Add tasks
              </ListItemText>
            </ListItemButton> */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {user &&
                    <TaskTable tasks={tasks} setTasks={setTasks} roomcode={JSON.parse(user).roomcode}/>
                   }                         
                </Paper>
              </Grid>
              <Grid item xs={12}>
              {user &&
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography> Add a task</Typography>
                  <Box component="form" onSubmit={handleSubmit} required  sx={{ mt: 1 }}>
                <TextField
                  variant='standard'
                  margin="normal"
                  required={true}
                  fullWidth
                  id="Task"
                  label="Task"
                  name="Task"
                  autoComplete="Task"
                  autoFocus
                  />
                <TextField
                  variant='standard'
                  margin="normal"
                  required={true}
                  fullWidth
                  id="Description"
                  label="Description of the task"
                  name="Description"
                  autoComplete="Description"
                />
                <TextField
                  id="frequency"
                  select
                  label="Frequency"
                  required={true}
                  name='Frequency'
                  defaultValue= {7}
                  helperText="Please select the frequency of the task"
                  variant="standard"
                  fullWidth>
            <MenuItem value={7}>
              weekly
            </MenuItem>
            <MenuItem value={14}>
              bi-weekly
            </MenuItem>
            <MenuItem value={30}>
              monthly
            </MenuItem>
        </TextField>
        <Button variant='outlined' type='submit' sx={{mt: 2}}> Add task</Button>
            </Box>
                </Paper>}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}