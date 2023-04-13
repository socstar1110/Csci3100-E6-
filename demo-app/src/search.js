import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import cookie from 'react-cookies'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import { ReactComponent as AddIcon } from './icon/plus.svg';
import CourseCart from "./coursecart";
import { useNavigate } from "react-router-dom";
import {
  MDBInput
}from 'mdb-react-ui-kit';


const Search = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
  const [searchResult, setSearchResult] = useState(); // final search result 
  const [action, setAction] = useState(''); // this variable indicate which page we would like to display (course cart or search)
  const navigate = useNavigate();
  const [serachByConditon, SetSerachByConditon] = useState({
    Conditon: 'other',
    Value: '',
    EndTime: "",
  });

  const [emptyReturn, setEmptyReturn] = useState(false);
  useEffect(() => {
    // This function will execute automatically
    setUsername(cookie.load('username'))
  }, []);

  const toCart = () => {
    setAction("Cart") //go to course cart page 
  }

  const toSearch = () => {
    setAction("Search") //go to search cart page 
  }

  const logout = ()=>{
    window.PopUpbox('Logout successfully','Please click OK to continue','success','OK')
    .then((result) => {
      cookie.remove('username')
      cookie.remove('logged')
      navigate("/")
      })
    
  }

  const ToProfile = ()=>{
    navigate("/profile")      
  }

  const reload = ()=>{
    window.location.reload()      
  }  

  function handleSerachByConditonValueChange(event) {
    // When the search field is changed, the conditionvalue will be set to null
    SetSerachByConditon(prevState => ({ ...prevState, Value: '' }));
    SetSerachByConditon(prevState => ({ ...prevState, Value: event.target.value }));
  }

  function handleConditonChange(event) {
    setEmptyReturn(false);
    setLoading(true);
    SetSerachByConditon(prevState => ({ ...prevState, Value: '' }));
    SetSerachByConditon(prevState => ({ ...prevState, Conditon: event.target.value }));
  }

  function handleSerachByConditonEndTimeChange(event) { //change the End Time of serachByConditon(only use this when the user want to search by time )
    SetSerachByConditon(prevState => ({ ...prevState, EndTime: event.target.value }));
  }

  function SerachByConditon(event) {

    // Display notification to show empty input/ No selection 
    if (serachByConditon.Conditon === "courseid" && serachByConditon.Value === '')
      window.PopUpbox('Empty Input is not allowed', 'Please enter the Course ID for searching', 'error', 'OK')

    else if (serachByConditon.Conditon === "coursename" && serachByConditon.Value === '')
      window.PopUpbox('Empty Input is not allowed', 'Please enter the Course Name for searching', 'error', 'OK')

    else if (serachByConditon.Conditon === "department" && serachByConditon.Value === '')
      window.PopUpbox('Selection is required', 'Please select the department for searching', 'error', 'OK')

    else if (serachByConditon.Conditon === "instructor" && serachByConditon.Value === '')
      window.PopUpbox('Selection is required', 'Please select the instructor for searching', 'error', 'OK')

    else if (serachByConditon.Conditon === "date" && serachByConditon.Value === '')
      window.PopUpbox('Selection is required', 'Please select the date for searching', 'error', 'OK')

    else if (serachByConditon.Conditon === "other" && serachByConditon.Value === '')
      window.PopUpbox('Empty Input is not allowed', 'Please enter the keywords for searching', 'error', 'OK')

    event.preventDefault();
    fetch('http://54.252.45.29/searchbycondition', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((serachByConditon)) // send serachByConditon object to backend
    })
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          setEmptyReturn(true);
        }
        else {
          setSearchResult(data) // store data to output  
          setEmptyReturn(false);
        }
        setLoading(false)
      })
  }

  const Addobj = { username: username, id: '' } // a object contain a course id the admin would like to remove 
  function Addcourse(ID) {
    Addobj.id = ID
    //console.log(ID)
    fetch('http://54.252.45.29/addToCourseCart', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((Addobj))
    })
      .then(res => res.text())
      .then(data => {
        if (data === 'successfully') {
          window.PopUpbox('The course has been successfully added to your cart', 'Please click OK to continue', 'success', 'OK')
        } else {
          window.PopUpbox('The course already in you cart', 'You cannot add a same course twice', 'error', 'OK')
        }
      })
  }
  
  function handleInputKey(event) {
    event.preventDefault();
    // Check if the key pressed was the "Enter" key.
    if (event.key === 'Enter') {
      // Activate the search button.
      SerachByConditon(event);
    }
  }

  if(cookie.load('logged') == "true"){
    return (
      <div> {/* show the button on top right corner*/}
        <h4>{username}</h4>
        <div className="icon-container">
          <button onClick={logout}>
            <Exit className="icon" />
          </button>
          <button onClick={reload}>
            <SearchIcon className="icon" />
          </button>
          <button onClick={ToProfile}>
            <Person className="icon" />
          </button>
        </div>
        <hr className="line" />


        {/* a nav bar to chose which page the user would like to acces */}
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse container d-flex justify-content-center align-items-center" id="navbarNavAltMarkup ">
              <div className="navbar-nav">
                <button style={{ margin: '10px' }} type="button" className="btn btn-primary" onClick={toCart}>
                  Course Cart{' '}
                </button>
                <button style={{ margin: '10px' }} type="button" className="btn btn-success" onClick={toSearch}>
                  Search{' '}
                </button>
              </div>
            </div>
          </nav>
        </div>
        {action === "Cart" && <CourseCart />}

        {/*Select the search field*/}
        {action === "Search" && (
          <div className="container d-flex justify-content-center align-items-center" >
            <div className="search" style={{ display: 'block' }}>
              <h6 style={{ display: 'block' }}>Select Search Condition</h6>

              <select value={serachByConditon.Conditon} onChange={handleConditonChange}>
                <option value="courseid"> Course ID </option>
                <option value="coursename"> Course Name </option>
                <option value="department"> Department </option>
                <option value="instructor"> Instructor </option>
                <option value="date"> Date </option>
                <option value="time"> Time </option>
                <option value="other"> Other </option>
              </select>
              <br></br>

              {/*input the keywords under the specific search fields: (i) Course ID, (ii) Course Name, (iii) Other */}
              {(serachByConditon.Conditon === "courseid" || serachByConditon.Conditon === "coursename" || serachByConditon.Conditon === "other") &&
                <div>
                  {serachByConditon.Conditon === "courseid" && <h6 style={{ display: 'block' }}>Please enter the <b>Course ID</b> below...</h6>}
                  {serachByConditon.Conditon === "coursename" && <h6 style={{ display: 'block' }}>Please enter the <b>Course Name</b> below...</h6>}
                  {serachByConditon.Conditon === "other" && <h6 style={{ display: 'block' }}>Please enter the <b>keywords</b> below...</h6>}

                  <label>
                    {serachByConditon.Conditon === "courseid" && 
                      <input className="search_Input " 
                        type="type" 
                        maxLength={4} 
                        placeholder="Enter the Course ID..." 
                        required="required" 
                        style={{ width: '300px' }} 
                        value={serachByConditon.Value} 
                        onChange={handleSerachByConditonValueChange}
                        onKeyUp={handleInputKey}>
                      </input>}
                    {serachByConditon.Conditon === "coursename" && 
                      <input className="search_Input " 
                        type="type" 
                        placeholder="Enter the Course Name..." 
                        required="required" 
                        style={{ width: '300px' }} 
                        value={serachByConditon.Value} 
                        onChange={handleSerachByConditonValueChange}
                        onKeyUp={handleInputKey}>
                      </input>}
                    {serachByConditon.Conditon === "other" && 
                      <input className="search_Input " 
                        type="type" 
                        placeholder="Enter the keyword..." 
                        required="required" 
                        style={{ width: '300px' }} 
                        value={serachByConditon.Value} 
                        onChange={handleSerachByConditonValueChange}
                        onKeyUp={handleInputKey}>
                      </input>}

                  </label>
                  <button className="search_button"style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '40px', height: '40px', padding: '0px' }} /> </button>

                  {/*Display notifications for users*/}
                  {serachByConditon.Conditon === "other" && (
                    <div>
                      <br></br>
                      <h6 style={{ display: 'block' }}>Note: Search by the followings are not supported</h6>
                      <h6 style={{ display: 'block' }}>i. The Start Time and End Time of the course</h6>
                      <h6 style={{ display: 'block' }}>iii. The Capacity of the course</h6>
                      <h6 style={{ display: 'block' }}>iii. The Availability of the course</h6>
                    </div>
                  )}

                </div>
              }

              {/*Select the department for searching */}
              {serachByConditon.Conditon === "department" && (
                <div>
                  <h6 style={{ display: 'block' }}>Please select the department: </h6>
                  <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange} onKeyDown={handleInputKey}> {/*save the selected value into serachByConditon*/}
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
                  <button className="search_button"style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '40px', height: '40px', padding: '0px' }} /> </button>
                </div>
              )}

              {/*Select the instructor for searching */}
              {serachByConditon.Conditon === "instructor" && (
                <div>
                  <h6 style={{ display: 'block' }}>Please select the lecturer: </h6>
                  <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange} onKeyDown={handleInputKey}>
                    <option value="">-- Select an option --</option>
                    <option value="Dr. LAM Wai Kin"> Dr. LAM Wai Kin</option>
                    <option value="Dr. WONG Ka Yan"> Dr. WONG Ka Yan</option>
                    <option value="Dr. CHAN Tai Man"> Dr. CHAN Tai Man	</option>
                    <option value="Dr. LAM Wai Kin"> Dr. LAM Wai Kin</option>
                    <option value="Dr. LEE Siu Lun"> Dr. LEE Siu Lun</option>
                    <option value="Dr. LEE Wai Ming"> Dr. LEE Wai Ming</option>
                    <option value="Dr. WONG Ka Shing"> Dr. WONG Ka Shing</option>
                    <option value="Dr. LEE Siu Man"> Dr. LEE Siu Man</option>
                    <option value="Dr. LEUNG Sze Him Isaac">Dr. LEUNG Sze Him Isaac</option>
                    <option value="Dr. OUYANG Ming"> Dr. OUYANG Ming</option>
                    <option value="Professor DAI Ben"> Professor DAI Ben</option>
                    <option value="Dr. WONG Tat Wing"> Dr. WONG Tat Wing</option>
                  </select>
                  <button className="search_button"style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '40px', height: '40px', padding: '0px' }} /> </button>
                </div>
              )}

              {/*Select the day for searching */}
              {serachByConditon.Conditon === "date" && (
                <div>
                  <h6 style={{ display: 'block' }}>Please select the date: </h6>
                  <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange} onKeyDown={handleInputKey}>
                    <option value="">-- Select an option --</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                  <button className="search_button"style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '40px', height: '40px', padding: '0px' }} /> </button>
                </div>
              )
              }

              {serachByConditon.Conditon === "time" && (
                <div>
                  <h6 style={{ display: 'block' }}>Please select the time: </h6>
                  <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange} onKeyDown={handleInputKey}> {/*save the selected value into serachByConditon.valeu*/}
                    <option value="">-- Select a StartTime --</option>
                    <option value="8:00">8:00</option>
                    <option value="9:00">9:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                  <button className="search_button"style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '40px', height: '40px', padding: '0px' }} /> </button>
                </div>
              )
              }

            </div>
          </div>
        )}

        {/*Display the table of search results */}
        {isLoading === false && emptyReturn === false && action === "Search" &&
          <div className="container d-flex justify-content-center align-items-center" >
            <table>
              <thead>
                <tr> {/*Display the column names */}
                  <th style={{ padding: '10px' }}>CourseCode</th> {/* add a padding for a clear ui )*/}
                  <th style={{ padding: '10px' }}>CourseName</th>
                  <th style={{ padding: '10px' }}>CourseID</th>
                  <th style={{ padding: '10px' }}>Venue</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>StartTime</th>
                  <th style={{ padding: '10px' }}>EndTime</th>
                  <th style={{ padding: '10px' }}>Department</th>
                  <th style={{ padding: '10px' }}>Instructor</th>
                  <th style={{ padding: '10px' }}>Capacity</th>
                  <th style={{ padding: '10px' }}>Available</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((course) => (
                  <tr> {/*Display the search results */}
                    <td style={{ padding: '10px' }}><Link to={'/coursedetail/' + course.CourseId}>{course.CourseCode}</Link></td> {/* a link to a acces crouse detail )*/}
                    <td style={{ padding: '10px' }}>{course.CourseName}</td>
                    <td style={{ padding: '10px' }}>{course.CourseId}</td>
                    <td style={{ padding: '10px' }}>{course.Venue}</td>
                    <td style={{ padding: '10px' }}>{course.Date}</td>
                    <td style={{ padding: '10px' }}>{course.StartTime}</td>
                    <td style={{ padding: '10px' }}>{course.EndTime}</td>
                    <td style={{ padding: '10px' }}>{course.Department}</td>
                    <td style={{ padding: '10px' }}>{course.Instructor}</td>
                    <td style={{ padding: '10px' }}>{course.Capacity}</td>
                    <td style={{ padding: '10px' }}>{course.Capacity - course.RegUser.length}</td>
                    <td style={{ padding: '10px' }}>
                      <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} onClick={(() => Addcourse(course.CourseId))} >
                        <AddIcon className="Del_Add_icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }

        {/*Display empty result*/}
        {emptyReturn === true && action === "Search" && (
          <table className="container d-flex justify-content-center align-items-center" >
            <tr>
              {serachByConditon.Conditon === "courseid" && <th><p id="displayItem">No available Course ID</p></th>}
              {serachByConditon.Conditon === "coursename" && <th><p id="displayItem">No available Course Name</p></th>}
              {serachByConditon.Conditon === "department" && <th><p id="displayItem">No available Course is found</p></th>}
              {serachByConditon.Conditon === "instructor" && <th><p id="displayItem">No available Course is found</p></th>}
              {serachByConditon.Conditon === "date" && <th><p id="displayItem">No available Course is found</p></th>}
              {serachByConditon.Conditon === "time" && <th><p id="displayItem">No available Course is found</p></th>}
              {serachByConditon.Conditon === "other" && <th><p id="displayItem">No available Course is found</p></th>}
            </tr>
          </table>
        )}

      </div>
    )
  }else{
    return(
      <p>Please login</p>
    )
  }
}

export default Search;
