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


/* use window. to create a global function */
window.PopUpbox = async function(title, text, icon, confirmButtonText) {  /* a box will show up when the function is called */
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
  return ( /* BrowserRouter asign each functional component as a link, each component will render a page */
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

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);