import { Container, Typography } from '@mui/material'
import ButtonAppBar from '../components/ButtonAppBar'



const Home = () => {
    return (
        <>
        <ButtonAppBar/>
        <Container maxWidth='md'>
        <Typography variant="h6"> This is the home page</Typography>

        </Container>
        </>

    )
}


export default Home