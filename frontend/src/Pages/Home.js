import { Container, Typography, Box, Fab, Paper } from '@mui/material'
import ButtonAppBar from '../components/ButtonAppBar'

const features = [ {name: 'Track your spending' , description: 'Keep track of who spent how much money on what, so that everyone spends their fair share' },
                   {name: 'Chore Scheduling' , description: 'Get rid of your physical chore chart for a more flexible and convenient digital version' },
                   {name: 'Chore Assignment' , description: 'Create a plan to split up the work and keep track of progress to keep your place clean and tidy' }]

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
        <Typography variant='h4'> {feature.name} </Typography> 
        <Typography variant='h5' sx={{ mt: 3 }}> {feature.description} </Typography> 
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