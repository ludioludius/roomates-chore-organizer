import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import Home from './Pages/Home'
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Purchases from "./Pages/Purchases";
import { CssBaseline } from "@mui/material";
import Typography from "@mui/material/Typography";


function App() {
  const { user } = useAuthContext()

  if (user) {
    return <UserLoggedIn />
  } else {
    return <NoUserLoggedIn />
  }

  // return (
  //   <div className='App'>
  //   <CssBaseline/>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route index element={<Home/>}/>
  //         <Route path="/home" exact element={<Home/>}/>
  //         <Route path="/signin" exact element={user? <Navigate to="/dashboard"/> : <SignIn/>}/>
  //         <Route path="/signup" exact element={user? <Navigate to="/purchases"/> : <SignUp/>}/>
  //         <Route path="/dashboard" exact element={user? <Dashboard /> : <Navigate to="/signin"/>} />
  //         <Route path="/purchases" exact element= {user? <Purchases /> : <Navigate to="/signup"/>}/>
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // )
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
          </Routes>
        </BrowserRouter>
      </>
  )
}

function UserLoggedIn() {
  const { user } = useAuthContext()

  return (
      <>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/signin" exact element={user.hasRoom? <Navigate to="/dashboard"/> : <JoinRoom/>}/>
          <Route path="/signup" exact element={user.hasRoom? <Navigate to="/dashboard"/> : <JoinRoom/>}/>
          <Route path="/dashboard" exact element={user.hasRoom? <Dashboard /> : <Navigate to="/signin"/>} />
          <Route path="/purchases" exact element= {user.hasRoom? <Purchases /> : <Navigate to="/signin"/>}/>
        </Routes>
      </BrowserRouter>
      </>
  )
}

function JoinRoom() {
  return (
      <Typography variant= "h5">JOIN ROOM</Typography>
  )
}



export default App;