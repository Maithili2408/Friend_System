import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import { useState, React } from "react";
// import { MyContext } from "./Context";


import { Home } from './Pages/Home/Home';
import { Signup } from './Pages/Signup/Signup';
import { Login } from './Pages/Login/Login';
import { Sidenav } from './Layouts/Sidenav';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Profile } from './Pages/Profile/Profile';
import { Editpage } from './Pages/Editpage/Editpage';
import { Account } from './Pages/Accounts/Account';
import { Notification } from './Pages/Notification/Notification';
import { Friends } from './Pages/Friend/Friends';
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import DataProvider from './Context';
function App() {
  // const [account,setAccount]=useState({});
  return (
    <DataProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/about' element={<Sidenav/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/edit-profile' element={<Editpage/>}></Route>
      <Route path='/user-account' element={<Account/>}></Route>
      <Route path='/notifications' element={<Notification/>}></Route>
      <Route path='/friends' element={<Friends/>}></Route>


    </Routes>
    
   
    
  </BrowserRouter>
  </DataProvider>
  );
}

export default App;
library.add(fab, fas, far)
// import { Link } from "react-router-dom";
