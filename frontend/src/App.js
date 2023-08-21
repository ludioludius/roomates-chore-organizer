import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import SignIn from "./Pages/SignIn";
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
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;