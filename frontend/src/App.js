import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import Home from './Pages/Home'
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Purchases from "./Pages/Purchases";
import { CssBaseline } from "@mui/material";

// Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase project configuration object; found on firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAsP60E4L_v-KNsVosofJhXVhCzELPHNI4",
  authDomain: "roommates-chore-organizer.firebaseapp.com",
  projectId: "roommates-chore-organizer",
  storageBucket: "roommates-chore-organizer.appspot.com",
  messagingSenderId: "811791432329",
  appId: "1:811791432329:web:55ac975dc3a1a80f22e458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
          <Route path="/signup" exact element={user? <Navigate to="/purchases"/> : <SignUp/>}/>
          <Route path="/dashboard" exact element={user? <Dashboard /> : <Navigate to="/signin"/>} />
          <Route path="/purchases" exact element= {user? <Purchases /> : <Navigate to="/signup"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;