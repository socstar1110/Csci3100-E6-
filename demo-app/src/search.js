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

const Search =() =>{
    const [username, setUsername] = useState(''); 
    const [selectedValue, setSelectedValue] = useState(''); // this variable indicate which conditon would like to use to serach
    const [action, setAction] = useState(''); // this variable indicate which page we would like to display (course cart or search)
    useEffect(() => {
      // This function will execute automatically
      setUsername("testuser")
      setSelectedValue("other")
      setAction("Search")
    }, []);
  
    function handleSelectChange(event) {
      setSelectedValue(event.target.value); // update selectedValue with the new value
    }
  
    const toCart= () =>{ 
      setAction("Cart") //go to course cart page 
    }
  
    const toSearch= () =>{
      setAction("Search") //go to search cart page 
    }
  
    
  
    const data = [ //temp data for display 
      {name:"Software Engineering", id:"4912",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
      {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
    ];
    return(
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
  
  
        {/* a nav bar to chose which page the user would like to acces */}
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light" >
            <div class="collapse navbar-collapse container d-flex justify-content-center align-items-center" id="navbarNavAltMarkup " >
              <div class="navbar-nav">
                <button style={{margin:'10px'}} type="button" class="btn btn-primary" onClick={toCart}>Course Cart </button>
                <button style={{margin:'10px'}} type="button" class="btn btn-success" onClick={toSearch}>Search </button>
              </div>
            </div>
          </nav>
          
        </div>
  
        {/* show the course cart */}
        {action == "Cart" && 
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
                {data.map((course) => (
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
        }
  
        {/* serach by keyword */}
          {action == "Search" && selectedValue == "other"&&
          <div className = "container d-flex justify-content-center align-items-center" >
          <div className="search" style={{ display: 'block' }}> 
            <h6 style={{ display: 'block' }}>Select Search Condition</h6>
            {/* select the condition */}
            <select value={selectedValue} onChange={handleSelectChange}>
                  <option value="other"> other </option>
                  <option value="department"> department </option>
                  <option value="instructor"> instructor </option>
                  <option value="place"> place </option>
            </select>
            {/* let user input the keyword in here */}
            <h6 style={{ display: 'block' }}>Search by keywords...</h6>
            <label>
                <input className="search " type="type" placeholder="Search by the course's keywords..." required="required" style={{ width: '300px' }}></input>
            </label>
            <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
            {/* show the search result by a table  */}
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
                {data.map((course) => (
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
                      <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                        <AddIcon className="icon"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        }
  
        {action == "Search" && selectedValue == "department"&&
        <div className = "container d-flex justify-content-center align-items-center" >
          <div className="search" style={{ display: 'block' }}> 
            <h6 style={{ display: 'block' }}>Search by department...</h6>
            <h6 style={{ display: 'block' }}>Select Search Condition</h6>
            {/* select the condition */}
            <select value={selectedValue} onChange={handleSelectChange}>
                <option value="other"> other </option>
                <option value="department"> department </option>
                <option value="instructor"> instructor </option>
                <option value="place"> place </option>
            </select>
            {/* provide a option for user  */}
            <select>
            <option value="">-- Select an option --</option>
              <option value="csci"> Computer Science </option>
              <option value="stat"> Statistics </option>
            </select>
            <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
            <table>
              {/* show the search result by a table  */}
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
                {data.map((course) => (
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
                      <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                        <AddIcon className="icon"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        }
  
        {action == "Search" && selectedValue == "instructor" &&
        <div className = "container d-flex justify-content-center align-items-center" >
        <div className="search" style={{ display: 'block' }}> 
          <h6 style={{ display: 'block' }}>Search by instructor...</h6>
          <h6 style={{ display: 'block' }}>Select Search Condition</h6>
          {/* select the condition */}
          <select value={selectedValue} onChange={handleSelectChange}>
            <option value="other"> other </option>
            <option value="department"> department </option>
            <option value="instructor"> instructor </option>
            <option value="place"> place </option>
          </select>
          {/* provide a option for user  */}
          <select>
            <option value="">-- Select an option --</option>
            <option value="Micheal"> Micheal </option>
            <option value="Ben"> Ben </option>
          </select>
          <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
          {/* show the search result by a table  */}
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
              {data.map((course) => (
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
                    <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                      <AddIcon className="icon"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        }
  
        {action == "Search" && selectedValue == "place" &&
        <div className = "container d-flex justify-content-center align-items-center" >
          <div className="search" style={{ display: 'block' }}> 
            <h6 style={{ display: 'block' }}>Search by location...</h6>
            <h6 style={{ display: 'block' }}>Select Search Condition</h6>
            {/* select the condition */}
            <select value={selectedValue} onChange={handleSelectChange}>
                <option value="other"> other </option>
                <option value="department"> department </option>
                <option value="instructor"> instructor </option>
                <option value="place"> place </option>
            </select>
            {/* provide a option for user  */}
            <select>
              <option value="">-- Select an option --</option>
              <option value="Yia"> Yia </option>
              <option value="Lsk"> Lsk </option>
            </select>
            <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
            {/* show the search result by a table  */}
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
                {data.map((course) => (
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
                      <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                        <AddIcon className="icon"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        }
  
      </div>
      
      
    )
  
  }


export default Search;
