import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import SelectCourse from './selectedcourses'
import TimeTable from './timetable';
import cookie from 'react-cookies'
import { useNavigate } from "react-router-dom";


const Profile = () =>{
    const [username, setUsername] = useState(''); 
    const [page, setPage] = useState(''); // page indicate which part of profile you would like to show
    const navigate = useNavigate();

    const logout = ()=>{
      window.PopUpbox('Logout successfully','Please click OK to continue','success','OK')
      .then((result) => {
        cookie.remove('username')
        cookie.remove('logged')
        navigate("/")
        })
      
    }
    const ToSearch = ()=>{
      navigate("/search")      
    }

    const reload = ()=>{
      window.location.reload()      
    }  
    useEffect(() => {
      // This function will execute automatically when your access this page 
      setUsername(cookie.load('username'))
      setPage("home")
    }, []);
  
    const sethome = () =>{
      setPage("home") // show home 
    }
  
    const setTimetable = () =>{
      setPage("Timetable") // show timetable 
    }
  
    const setSelected = () =>{ // show selected courese 
      setPage("Selected")
    }
    
    if(cookie.load('logged') == "true"){
      return(
          <div >
            <h4>{username}</h4>
            <div className="icon-container"> {/* show the button on top right corner*/}
              <button onClick={logout}> 
                <Exit className="icon"/>
              </button>
              <button onClick={ToSearch}>
                <SearchIcon className="icon"/>
              </button>
              <button onClick={reload}>
                <Person className="icon"/>
              </button>
            </div>
            <hr className="line"/>
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">  {/* nav bar for chosing what you would like to see in profile page */}
              <div class="collapse navbar-collapse container d-flex justify-content-center align-items-center" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <button style={{margin:'10px'}} type="button" class="btn btn-primary" onClick={sethome}>Home </button>
                  <button style={{margin:'10px'}} type="button" class="btn btn-success" onClick={setSelected}>Selected Course </button>
                  <button style={{margin:'10px'}} type="button" class="btn btn-warning" onClick={setTimetable}>Timetable </button>
                </div>
              </div>
            </nav>
      
            {page === "home" && /* show the home  */
              <p class="collapse navbar-collapse container d-flex justify-content-center align-items-center"> welcome back</p>
            }
            {/* show the selected course */}
            {page === "Selected" && <SelectCourse/>}
            {page === "Timetable" && <TimeTable />}
          </div>
      )
    }else{
      return(
        <p>Please login</p>
      )
    }
  }


export default Profile;
