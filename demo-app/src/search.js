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
    const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return

    const [searchResult , setSearchResult ] = useState(); // final search result 
    

    const [serachByConditon, SetSerachByConditon] = useState({ 
      Conditon: '', 
      Value:'',
      });

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

    function handleSerachByConditonValueChange(event) {
      SetSerachByConditon(prevState => ({ ...prevState, Value: event.target.value }));
    }


    function SerachByConditon(event){
      SetSerachByConditon(prevState => ({ ...prevState, Conditon: selectedValue })); // save the conditon into serachByConditon
      
      event.preventDefault();
        fetch('http://localhost:80/searchbycondition',{ 
        method:'POST',
        model:'cors',
        headers:{
          'Content-Type':'application/json'
      },body: JSON.stringify((serachByConditon)) // send serachByConditon object to backend
      })
      .then(res => res.json())
      .then(data => {
        setSearchResult (data) // store data to output
        setLoading(false)
      })
    }

    //let data = JSON.parse(localStorage.getItem('MatchCourse')) // fetch back the data from local Storage

    const temp = [ //temp data for display 
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
        }

        {action == "Search" && (
          <div className = "container d-flex justify-content-center align-items-center" >
            <div className="search" style={{ display: 'block' }}> 
              <h6 style={{ display: 'block' }}>Search by instructor...</h6>
              <h6 style={{ display: 'block' }}>Select Search Condition</h6>
              
              <select value={selectedValue} onChange={handleSelectChange}>
                <option value="other"> other </option>
                <option value="department"> department </option>
                <option value="instructor"> instructor </option>
                <option value="place"> place </option>
              </select>
              <br></br>

              {selectedValue == "other" &&
                <div>
                 <h6 style={{ display: 'block' }}>Search by keywords...</h6>
                 <label>
                     <input className="search " type="type" placeholder="Search by the course's keywords..." required="required" style={{ width: '300px' }}></input>
                 </label>
                </div>
              }
              
              {selectedValue == "department" && (
                <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange}> {/*save the selected value into serachByConditon*/}
                <option >-- Select an option --</option>
                  <option value="Department of Risk Management and Statistics">	Department of Risk Management and Statistics </option>
                  <option value="Department of Computer Science and Engineering"> Department of Computer Science and Engineering </option>
                  <option value="Department of Statistics and Actuarial Science"> Department of Statistics and Actuarial Science </option>
                  <option value="Department of Chemistry"> Department of Chemistry</option>
                  <option value="Department of Economics"> Department of Economics</option>
                  <option value="Department of English"> Department of English</option>
                  <option value="Department of Linguistics and Modern Languages"> Department of Linguistics and Modern Languages</option>
                  <option value="Department of Psychology"> Department of Psychology</option>
                  <option value="Department of History"> Department of History</option>
                  <option value="Department of Mathematics"> Department of Mathematics</option>
                  <option value="Department of Sociology"> Department of Sociology</option>
                  <option value="Department of Urban Planning and Design"> Department of Urban Planning and Design</option>
                  <option value="General Education"> General Education</option>
                </select>
              )}

              {selectedValue == "instructor" &&(
                <select>
                <option value="">-- Select an option --</option>
                <option value="Micheal"> Micheal </option>
                <option value="Ben"> Ben </option>
              </select>
              )}

              {selectedValue == "place"&&(
                <select>
                <option value="">-- Select an option --</option>
                <option value="Yia"> Yia </option>
                <option value="Lsk"> Lsk </option>
              </select>
              )
              }
              <button style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
            </div>
          </div>
          )}
  


        {action == "Search" && isLoading == false &&
          <div className = "container d-flex justify-content-center align-items-center" >
            <table>
                <thead>
                  <tr>
                    <th style={{padding: '10px'}}>CourseCode</th> {/* add a padding for a clear ui )*/}
                    <th style={{padding: '10px'}}>CourseName</th>
                    <th style={{padding: '10px'}}>CourseID</th>
                    <th style={{padding: '10px'}}>Venue</th>
                    <th style={{padding: '10px'}}>Data</th>
                    <th style={{padding: '10px'}}>StartTime</th>
                    <th style={{padding: '10px'}}>EndTime</th>
                    <th style={{padding: '10px'}}>Department</th>
                    <th style={{padding: '10px'}}>Instructor</th>
                    <th style={{padding: '10px'}}>Capacity</th>
                    <th style={{padding: '10px'}}>Available</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult .map((course) => (
                    <tr>
                      <td style={{padding: '10px'}}><Link to={'/coursedetail/' + course.id}>{course.CourseCode}</Link></td> {/* a link to a acces crouse detail )*/}
                      <td style={{padding: '10px'}}>{course.CourseName}</td>
                      <td style={{padding: '10px'}}>{course.CourseId}</td>
                      <td style={{padding: '10px'}}>{course.Venue}</td>
                      <td style={{padding: '10px'}}>{course.Data}</td>
                      <td style={{padding: '10px'}}>{course.StartTime}</td>
                      <td style={{padding: '10px'}}>{course.EndTime}</td>
                      <td style={{padding: '10px'}}>{course.Department}</td>
                      <td style={{padding: '10px'}}>{course.Instructor}</td>
                      <td style={{padding: '10px'}}>{course.Capacity}</td>
                      <td style={{padding: '10px'}}>{course.Capacity - course.RegUser.length}</td>
                      <td style={{padding: '10px'}}>
                        <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                          <AddIcon className="icon"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        }
  
      </div>
    )
  
  }


export default Search;
