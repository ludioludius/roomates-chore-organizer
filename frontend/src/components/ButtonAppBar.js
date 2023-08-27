import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Groups3SharpIcon from '@mui/icons-material/Groups3Sharp';
import { Container } from '@mui/material';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function ButtonAppBar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth='md'>
        <Toolbar>
          <Groups3SharpIcon sx={{ mr: 2}}/>
          <Typography variant="h5" component="a" href='/home' sx={{
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            Chorify
          </Typography>
          {!user && <Button color="inherit" href='/signin'>Sign In</Button>}
          <Button color="inherit">Home</Button>
          <Button color="inherit">FAQs</Button>
          {user && <Button color="inherit" href='/dashboard'> Dashboard </Button>}
          <Button color="inherit" onClick={() => logout()}> Log out </Button>
          {user &&
          <Button color="inherit"> {JSON.parse(user).username} </Button>
          }       
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}