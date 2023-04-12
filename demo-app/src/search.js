import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import { ReactComponent as AddIcon } from './icon/plus.svg';
import CourseCart from "./coursecart";

const Search = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
  const [searchResult, setSearchResult] = useState(); // final search result 
  const [action, setAction] = useState(''); // this variable indicate which page we would like to display (course cart or search)
  const [serachByConditon, SetSerachByConditon] = useState({
    Conditon: 'other',
    Value: '',
    EndTime: '',
  });

  const [emptyReturn, setEmptyReturn] = useState(false);
  useEffect(() => {
    // This function will execute automatically
    setUsername("henry")
  }, []);

  const toCart = () => {
    setAction("Cart") //go to course cart page 
  }

  const toSearch = () => {
    setAction("Search") //go to search cart page 
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
    fetch('http://localhost:80/searchbycondition', {
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
    fetch('http://localhost:80/addToCourseCart', {
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

  return (
    <div> {/* show the button on top right corner*/}
      <h4>{username}</h4>
      <div className="icon-container">
        <button>
          <Exit className="icon" />
        </button>
        <button>
          <SearchIcon className="icon" />
        </button>
        <button >
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
        {action === "Cart" && <CourseCart />}

      </div>

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
                  {serachByConditon.Conditon === "courseid" && <input className="search " type="type" maxLength={4} placeholder="Enter the Course ID..." required="required" style={{ width: '300px' }} value={serachByConditon.Value} onChange={handleSerachByConditonValueChange}></input>}
                  {serachByConditon.Conditon === "coursename" && <input className="search " type="type" placeholder="Enter the Course Name..." required="required" style={{ width: '300px' }} value={serachByConditon.Value} onChange={handleSerachByConditonValueChange}></input>}
                  {serachByConditon.Conditon === "other" && <input className="search " type="type" placeholder="Enter the keywords..." required="required" style={{ width: '300px' }} value={serachByConditon.Value} onChange={handleSerachByConditonValueChange}></input>}

                </label>
                <button style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }} /> </button>

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
                <button style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }} /> </button>
              </div>
            )}

            {/*Select the instructor for searching */}
            {serachByConditon.Conditon === "instructor" && (
              <div>
                <h6 style={{ display: 'block' }}>Please select the lecturer: </h6>
                <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange}>
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
                <button style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }} /> </button>
              </div>
            )}

            {/*Select the day for searching */}
            {serachByConditon.Conditon === "date" && (
              <div>
                <h6 style={{ display: 'block' }}>Please select the date: </h6>
                <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange}>
                  <option value="">-- Select an option --</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
                <button style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }} /> </button>
              </div>
            )
            }

            {serachByConditon.Conditon === "time" && (
              <div>
                <h6 style={{ display: 'block' }}>Please select the time: </h6>
                <select value={serachByConditon.value} onChange={handleSerachByConditonValueChange}> {/*save the selected value into serachByConditon.valeu*/}
                  <option value="">-- Select a StartTime --</option>
                  <option value="8:30">8:30</option>
                  <option value="9:30">9:30</option>
                  <option value="10:30">10:30</option>
                  <option value="11:30">11:30</option>
                  <option value="12:30">12:30</option>
                  <option value="13:30">13:30</option>
                  <option value="14:30">14:30</option>
                  <option value="15:30">15:30</option>
                  <option value="16:30">16:30</option>
                  <option value="17:30">17:30</option>
                </select>

                <p style={{ display: 'inline-block' }}> - </p>

                <select value={serachByConditon.value} onChange={handleSerachByConditonEndTimeChange}> {/*save the selected value into serachByConditon.EndTime*/}
                  <option value="">-- Select a EndTime --</option>
                  <option value="9:15">9:15</option>
                  <option value="10:15">10:15</option>
                  <option value="11:15">11:15</option>
                  <option value="12:15">12:15</option>
                  <option value="13:15">13:15</option>
                  <option value="14:15">14:15</option>
                  <option value="15:15">15:15</option>
                  <option value="16:15">16:15</option>
                  <option value="17:15">17:15</option>
                  <option value="18:15">18:15</option>
                </select>
                <button style={{ width: '30px', height: '30px', padding: '0px' }} onClick={SerachByConditon}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }} /> </button>
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
                <th style={{ padding: '10px' }}>Data</th>
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
                  <td style={{ padding: '10px' }}>{course.Data}</td>
                  <td style={{ padding: '10px' }}>{course.StartTime}</td>
                  <td style={{ padding: '10px' }}>{course.EndTime}</td>
                  <td style={{ padding: '10px' }}>{course.Department}</td>
                  <td style={{ padding: '10px' }}>{course.Instructor}</td>
                  <td style={{ padding: '10px' }}>{course.Capacity}</td>
                  <td style={{ padding: '10px' }}>{course.Capacity - course.RegUser.length}</td>
                  <td style={{ padding: '10px' }}>
                    <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} onClick={(() => Addcourse(course.CourseId))} >
                      <AddIcon className="icon" />
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

}

export default Search;
