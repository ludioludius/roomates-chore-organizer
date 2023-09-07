import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";


//pages
import Home from './Pages/Home'
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";


import { CssBaseline } from "@mui/material";


function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
    <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/signin" exact element={user? <Navigate to="/dashboard"/> : <SignIn/>}/> 
          <Route path="/signup" exact element={user? <Navigate to="/dashboard"/> : <SignUp/>}/>
          <Route path="/dashboard" exact element={user? <Dashboard /> : <Navigate to="/signin"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;