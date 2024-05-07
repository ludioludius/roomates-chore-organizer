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
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import { Button, ListItemButton, ListItemIcon, ListItemText, TextField, MenuItem} from '@mui/material';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import PurchaseTable from '../components/PurchaseTable'
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Purchases() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [purchases, setPurchases] = useState([])

  //TODO: remove number and just use indexing
  const months = ["January", "Febuary", "March", 
               "April", "May", "June",
                "July", "August", "September",
                "October", "November","December"]

  const years = [2023, 2024]

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    console.log(data.get('item'), data.get('description'), data.get('cost'),
    data.get('month'), data.get('year'))
    console.log(JSON.parse(user).roomName)

    const purchaseDate = new Date(data.get('year'), data.get('month'))
    console.log(purchaseDate)

    axios.post('http://localhost:3001/api/purchases', {item: data.get('item'), description: data.get('description'), cost: data.get('cost'),
                                                      buyer: JSON.parse(user).name , purchaseDate: new Date(data.get('year'), data.get('month')), roomName: JSON.parse(user).roomName})
    .then((response) => {
      console.log(response.data)
      setPurchases(purchases.concat(response.data))
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
            <Button color="inherit" href="home">Home</Button>
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
            <ListItemButton href='/dashboard'>
              <ListItemIcon>
                <TaskAltIcon/>
              </ListItemIcon>
              <ListItemText>
                Tasks
              </ListItemText>
            </ListItemButton>
            <ListItemButton href='/purchases'>
              <ListItemIcon>
                <AttachMoneySharpIcon/>
              </ListItemIcon>
              <ListItemText>
                Purchases
              </ListItemText>
            </ListItemButton>
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



          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {user &&
                    <PurchaseTable purchases={purchases} setPurchases={setPurchases} roomName={JSON.parse(user).roomName}/>
                   }                         
                </Paper>
              </Grid>
            <Grid item xs={12}>
              {user &&
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography> Record a purchase</Typography>
                  <Box component="form" onSubmit={handleSubmit} required  sx={{ mt: 1 }}>
                <TextField
                  variant='standard'
                  margin="normal"
                  required={true}
                  fullWidth
                  id="item"
                  label="Item purchased"
                  name="item"
                  autoComplete="item"
                  autoFocus
                  />
                <TextField
                  variant='standard'
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="Description"
                />
                <TextField
                  id="cost"
                  label="Cost"
                  required={true}
                  type="number"
                  name='cost'
                  variant="standard"
                  fullWidth>
                </TextField>
                <TextField
                  id="month"
                  select
                  label="Month purchased"
                  required={true}
                  name='month'
                  defaultValue= {9}
                  variant="standard"
                  fullWidth
                  sx={{my: 2}}
                  >
                {months.map((month, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {month}
                    </MenuItem>
                  )
                })}
                </TextField>
                <TextField
                  id="year"
                  select
                  label="Year purchased"
                  required={true}
                  name='year'
                  variant="standard"
                  defaultValue= {2023}
                  fullWidth
                  >
                {years.map((year, index) => {
                  return (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  )
                })}
                </TextField>
        <Button variant='outlined' type='submit' sx={{mt: 2}}> Record Purchase</Button>
            </Box>
                </Paper>}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}