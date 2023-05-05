import ReactDOM from "react-dom/client";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,

} from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'react-cookies'
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import Admin from './admin.js';
import Login from './login.js';
import Register from './register.js';
import Profile from './profile.js';
import Userlist from './userlist.js';
import Courselist from './courselist.js';
import CourseDetail from './coursedetail.js';
import Search from './search.js';
import ForgetPassword from './forgetPassword.js';

/* Create a global function PopUpbox using the 'window' object */
window.PopUpbox = async function(title, text, icon, confirmButtonText) {  
  /* Use SweetAlert2 to display a pop-up box with the given title, text, icon, and confirm button text */
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
    confirmButtonText: confirmButtonText,
  });
  return result;
};

function App() {
  return ( 
    /* Use BrowserRouter to define the routes for the app */
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<RenderLogin />} />
        <Route path="/register" element={<RenderRegister />}/>
        <Route path="/profile" element={<RenderProfile />}/>
        <Route path="/admin" element={<RenderAdmin/>}/>
        <Route path="/userlist" element={<RenderUserlist/>}/>
        <Route path="/courselist" element={<RenderCourselist/>}/>
        <Route path="/coursedetail/*" element={<RenderCourseDetail />} />
        <Route path="/search" element={<RenderSearch/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

/* Define functional components for each route, which will render the corresponding page */
const RenderForestPassword = ()=>{
  return(
    <div>
      < ForgetPassword/>
    </div>
  )
}

const RenderLogin = () =>{
  return(
    <div>
      < Login/>
    </div>
  )
}

const RenderRegister =() =>{
  return (
    <div>
      <Register />
    </div>
  );
}

const RenderProfile = () =>{
  return(
    <div>
      <Profile/>
    </div>
  )
}

const RenderAdmin =() =>{
  return (
    <div>
      <Admin />
    </div>
  );
}


const RenderUserlist =() =>{
  return(
    <div>
      <Userlist/>
    </div>
  )
}

const RenderCourselist = () =>{
  return(
    <div>
      <Courselist/>
    </div>
  )
}


const RenderCourseDetail =() =>{
  return(
    <div>
      <CourseDetail/>
    </div>
  )
}


const RenderSearch =() =>{
  return(
    <div>
      <Search/>
    </div>
  )
}

/* Use ReactDOM to render the root element of the app */
const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
