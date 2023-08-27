import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import { CssBaseline } from "@mui/material";


function App() {
  return (
    <div className='App'>
    <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/signin" exact element={<SignIn/>}/> 
          <Route path="/signup" exact element={<SignUp/>}/>
          <Route path="/dashboard" exact element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;