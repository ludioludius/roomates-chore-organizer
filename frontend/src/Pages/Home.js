import { Container, Typography, Box, Fab, Paper } from '@mui/material'
import ButtonAppBar from '../components/ButtonAppBar'

const features = ["feature1", 'feature2', 'feature3']

const Home = () => {
    return (
        <>
        <ButtonAppBar/>
        <Marketing/>
        <FeatureDisplay/>
        <Footer/>
        </>
    )
}

const Marketing = () => {

return (
<Box sx={{
    backgroundColor: '#fff4db93',
    height: '100%',
    width: '100%',
      }}>
<Container maxWidth='md'>
    <Typography variant="h4" align='center' px={10} pt={10} pb={5}> Simplify living with roomates: Manage chores and finances effortlessly with chorify. </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" pb={5}>
            <Fab variant="extended" size="large" color="primary" href='/signin'> Get Started. It's Free </Fab>
        </Box>
</Container>            
</Box>
)
}

const FeatureDisplay = () => {

return (
    <Container maxWidth='md'>    
        <Box sx={{ display: "flex",
                justifyContent: "space-between",
                flexDirection: 'row',
                gap: 4,
                py: 15}}>
{features.map(feature => {

    return (
        <Paper  elevation={4}>
        <Box sx={{ m: 2 }}>
        <Typography variant='h4'> {feature} </Typography> 
        <Typography variant='h5' sx={{ mt: 3 }}> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</Typography> 
        </Box>
        </Paper>
        )
})}
</Box>
</Container>
)}


const Footer = () => {

    return (
        <Box sx={{ bgcolor: '#fff4db93', p: 3 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Built by Ayush Bharat
        </Typography>
      </Box>
    )
}


export default Home