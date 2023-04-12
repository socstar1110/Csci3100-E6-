
import React from 'react';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import SelectCourse from './selectedcourses'
import TimeTable from './timetable';

const Profile = () =>{
    const [username, setUsername] = useState(''); 
    const [page, setPage] = useState(''); // page indicate which part of profile you would like to show
  
  
    useEffect(() => {
      // This function will execute automatically when your access this page 
      setUsername("testuser")
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
  
    const data = [ //temp data for display 
      {name:"Software Engineering", id:"4912",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
      {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
    ];
  
    return(
      <div >
        <h4>{username}</h4>
        <div className="icon-container"> {/* show the button on top right corner*/}
          <button > 
            <Exit className="icon"/>
          </button>
          <button >
            <SearchIcon className="icon"/>
          </button>
          <button >
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
        {page === "Selected" && <SelectCourse data={data}/>}\
        {page === "Timetable" && <TimeTable />}
      </div>
    )
  }


export default Profile;
