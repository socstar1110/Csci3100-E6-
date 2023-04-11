import ReactDOM from "react-dom/client";
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AddIcon } from './icon/plus.svg';

const Coursecart =() =>{
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    // This function will execute automatically
    setUsername("testuser")
  }, []);

  const temp = [ //temp data for display 
  {name:"Software Engineering", id:"4912",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
  {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
  ];
  
  return(
    <div>
      <div> {/* show the button on top right corner*/}
        <h4>{username}</h4>  
        <div className="icon-container">
          <button>
            <Exit className="icon"/>
          </button>
          <button>
            <SearchIcon className="icon"/>
          </button>
          <button >
            <Person className="icon"/>
          </button>
          </div> 
          <hr className="line"/>
      </div>
        {/* a nav bar to chose which page the user would like to acces */}
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
          <div class="collapse navbar-collapse container d-flex justify-content-center align-items-center" id="navbarNavAltMarkup " >
            <div class="navbar-nav">
              <button style={{margin:'10px'}} type="button" class="btn btn-primary">Course Cart </button>
              <button style={{margin:'10px'}} type="button" class="btn btn-success">Search </button>
            </div>
          </div>
        </nav>
      </div>




      <div>
        <h6 className = "container d-flex justify-content-center align-items-center">Your Course Cart</h6>
        <div className = "container d-flex justify-content-center align-items-center">
          <table>
          <thead>
            <tr>
              <th style={{padding: '20px'}}>CourseCode</th>
              <th style={{padding: '20px'}}>CourseName</th>
              <th style={{padding: '20px'}}>CourseID</th>
              <th style={{padding: '20px'}}>Venue</th>
              <th style={{padding: '20px'}}>Time</th>
              <th style={{padding: '20px'}}>Department</th>
              <th style={{padding: '20px'}}>Instructor</th>
              <th style={{padding: '20px'}}>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {temp.map((course) => (
              <tr>
                <td style={{padding: '20px'}}><Link to={'/'}>{course.code}</Link></td>
                <td style={{padding: '20px'}}>{course.name}</td>
                <td style={{padding: '20px'}}>{course.id}</td>
                <td style={{padding: '20px'}}>{course.venue}</td>
                <td style={{padding: '20px'}}>{course.time}</td>
                <td style={{padding: '20px'}}>{course.department}</td>
                <td style={{padding: '20px'}}>{course.instructor}</td>
                <td style={{padding: '20px'}}>{course.capacity}</td>
                <td style={{padding: '20px'}}>
                  <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }}>
                    <Drop className="icon"/>
                  </button>
                </td>
                <td style={{padding: '20px'}}>
                  <input type="checkbox"></input>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <div className = "container d-flex justify-content-center align-items-center">
          <button className = "btn btn-dark"> Select</button>
        </div>  
      </div>
    </div>
  )
}


export default Coursecart;
