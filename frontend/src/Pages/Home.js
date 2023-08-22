import { Container, Typography, Box, Fab } from '@mui/material'
import ButtonAppBar from '../components/ButtonAppBar'

const Home = () => {
    return (
        <>
        <ButtonAppBar/>
        <Box sx={{
        backgroundColor: '#fff4db93',
        height: '100%',
        width: '100%',
      }}>
            <Container maxWidth='md'>
                <Typography variant="h4" align='center' px={10} pt={10} pb={5}> Simplify living with roomates: Manage chores and finances effortlessly with chorify. </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" pb={5}>
                <Fab variant="extended" size="large" color="primary" href='/signin'>
                    Get Started. It's Free
                </Fab>
                </Box>
                
            </Container>            
        </Box>
        </>

    )
}


export default Home