import ReactDOM from "react-dom/client";
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';
import cookie from 'react-cookies'



// fetch all course information from back-end (aws : http://54.252.45.29. local :http://54.252.45.29


const Courselist = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
  const obj = { useless: '00' } // meaningless body for fetch
  useEffect(() => {
    // This function will execute automatically when your access this page 
    fetch('http://54.252.45.29/allcourse', { // fetch all course information from back-end (aws : http://54.252.45.29. local :http://54.252.45.29
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((obj))
    })
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem('allCourse', JSON.stringify(data)) //store the data to local Storage first
        setLoading(false)
      })
  }, []);
  const data = JSON.parse(sessionStorage.getItem('allCourse')) // fetch back the data from local Storage 



  const logout = () => {
    window.PopUpbox('Logout successfully', 'Please click OK to continue', 'success', 'OK')
      .then((result) => {
        cookie.remove('adminLogged')
        navigate("/")
      })

  }

  // below a for add a new course 
  const [addCourse, setaddCourse] = useState({
    name: '',
    code: '',
    id: '',
    venue: '',
    Date: 'Monday',
    StartTime: '8:00',
    EndTime: '9:00',
    department: '',
    instructor: '',
    Capacity: 10,
    outline: '',
  });

  function handleSubmitAddCourse(event) { // submit the Object addCourse to the backend
    event.preventDefault();
    fetch('http://54.252.45.29/addcourse', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((addCourse))
    })
      .then(res => res.text())
      .then(date => {
        //console.log(data)
        if (date == 'Added') { // the adding process is success
          window.PopUpbox('Add a new course successfully', 'Please click OK to continue', 'success', 'OK')
            .then((result) => {
              window.location.reload()
            })
        } else if (date == 'Repeated') { // the user user try to add existing course into the system
          window.PopUpbox('Duplicate Id/Code/Name', 'Please check carefully', 'error', 'OK')
        } else if (date == 'Invaild time') { // the time slot is invaild ie 9:15 - 8:30
          window.PopUpbox('Invaild time slot', 'Please check carefully', 'error', 'OK')
        } else if (date == 'Invaild Capacity') {
          window.PopUpbox('Invaild Capacity', 'Please check carefully', 'error', 'OK')
        } else { // some data is missing 
          date = date.charAt(0).toUpperCase() + date.slice(1)
          window.PopUpbox(date + ' is empty', 'Please check carefully', 'error', 'OK')
        }
      }
      )
  }

  // the below function is use to modeify the object addcourse by the form  

  function handleAddCourseDateChange(event) {
    setaddCourse(prevState => ({ ...prevState, Date: event.target.value }));
  }

  function handleAddCourseStartTimeChange(event) {
    setaddCourse(prevState => ({ ...prevState, StartTime: event.target.value }));
  }

  function handleAddCourseEndTimeChange(event) {
    setaddCourse(prevState => ({ ...prevState, EndTime: event.target.value }));
  }

  function handleAddCourseChange(event) {
    const { name, value } = event.target;
    setaddCourse(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  // below a for modify a course 
  const [modifyCourse, setmodifyCourse] = useState({
    oldId: '',
    CourseName: '',
    CourseCode: '',
    CourseId: '',
    Venue: '',
    Date: 'Monday',
    StartTime: '8:00',
    Department: '',
    Instructor: '',
    Capacity: 10,
    Outline: '',
  });

  function handleSubmitModifyCourse(event) {
    event.preventDefault();
    fetch('http://54.252.45.29/modifycourse', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((modifyCourse)) // send modifyCourse object to backend
    })
      .then(res => res.text())
      .then(date => {
        if (date == 'Updated') { // the modify process is success
          window.PopUpbox('Modify course successfully', 'Please click OK to continue', 'success', 'OK')
            .then((result) => {
              window.location.reload()
            })
        } else if (date == 'Not exist') { // this course do not exist 
          window.PopUpbox('Wrong Original CourseID', 'Please check carefully', 'error', 'OK')
        } else if (date == 'duplicate') {
          window.PopUpbox('Duplicate Id/Code/Name', 'Please check carefully', 'error', 'OK')
        } else if (date == 'Invaild Capacity') {
          window.PopUpbox('Invaild Capacity', 'Please check carefully', 'error', 'OK')
        }
        else { // the time slot is not reasonable 
          window.PopUpbox('Invaild time slot', 'Please check carefully', 'error', 'OK')
        }
      })
  }
  function handleModifyCourseDateChange(event) {
    setmodifyCourse(prevState => ({ ...prevState, Date: event.target.value }));
  }

  function handleModifyCourseStartTimeChange(event) {
    setmodifyCourse(prevState => ({ ...prevState, StartTime: event.target.value }));
  }

  function handleModifyCourseEndTimeChange(event) {
    setmodifyCourse(prevState => ({ ...prevState, EndTime: event.target.value }));
  }

  function handleModifyCourseChange(event) {
    const { name, value } = event.target;
    setmodifyCourse(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [showModifyForm, setShowModifyForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleModifyClick = () => {
    setShowModifyForm(!showModifyForm);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setShowAddForm(!showAddForm);
    setShowModifyForm(false);
  };


  // below a for remove a course 
  const Removeobj = { id: '' } // a object contain a course id the admin would like to remove 
  function Removecourse(ID) {
    Removeobj.id = ID
    fetch('http://54.252.45.29/removecourse', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((Removeobj))
    })
      .then(res => res.text())
      .then(date => {
        window.PopUpbox('Delete course successfully', 'Please click OK to continue', 'success', 'OK')
          .then((result) => {
            window.location.reload()
          })
      })
  }
  if (cookie.load('adminLogged') == "true") {
    return (
      <div>
        <div className="icon-container"> {/* show the button on top right corner*/}
          <button>
            <Exit className="icon" onClick={logout} />
          </button>
          <button>
            <SearchIcon className="icon" />
          </button>
        </div>

        <AllCourse className="icon" />
        <hr className="line" />




        {/* display all course information by a table (the logic of this code is similar to the table of profile )*/}
        {isLoading == false && // make sure we retune the date after fetch the a latest date 
        <div >
          <div class="sticky-top" style={{ backgroundColor: 'lavender' }}> {/* fix the form on a position )*/}
            <div className="text-center" style={{ display: 'flex', justifyContent: 'center', padding: '10px' }} >
              <button
                type="button"
                className="btn"
                onClick={handleModifyClick}
                style={{
                  backgroundColor: '#2196f3',
                  color: '#fff',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                {showModifyForm ? "Fold modify form" : "Modify Course information"}
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  marginLeft: '20px'
                }}
                onClick={handleAddClick}
              >
                {showAddForm ? "Fold add form" : "Add New Course"}
              </button>
            </div>


            <div>
              <form>
                {showModifyForm &&
                  <div>
                    <form className=" row col-lg-12 text-center">
                      <div className="col-lg-4 " >
                      </div>
                      <div className="col-lg-4 " >
                        <h5 style={{ display: 'inline-block', padding: "10px" }}>Modify Course Information</h5>
                      </div>
                      <div className="col-lg-4 " >
                        <button type="submit" className="btn btn-primary" style={{
                          backgroundColor: '#2196f3',
                          color: '#fff',
                          borderRadius: '5px',
                          padding: '10px 20px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        }} onClick={handleSubmitModifyCourse}>Submit Modification</button>
                      </div>
                    </form>

                    <div class="row text-center">
                      <div className="col-lg-2 " >
                        <label>
                          Original CourseID:
                          <MDBInput type="text" name="oldId" value={modifyCourse.oldId} onChange={handleModifyCourseChange} />  {/* modify modifyCourse.oldId by onChange*/}
                        </label>
                        <br></br>
                        <label>
                          New CourseID:
                          <MDBInput type="text" name="CourseId" value={modifyCourse.CourseId} onChange={handleModifyCourseChange} />{/* modify modifyCourse.CourseId by onChange*/}
                        </label>
                        <br></br>
                      </div>

                      <div className="col-lg-2">
                        <label>
                          New CourseCode:
                          <MDBInput type="text" name="CourseCode" value={modifyCourse.CourseCode} onChange={handleModifyCourseChange} />{/* modify modifyCourse.CourseCode by onChange*/}
                        </label>
                        <br></br>
                        <label>
                          New CourseName:
                          <MDBInput type="text" name="CourseName" value={modifyCourse.CourseName} onChange={handleModifyCourseChange} />{/* modify modifyCourse.CourseName by onChange*/}
                        </label>
                        <br></br>
                      </div>


                      <div className="col-lg-2">
                        <label>
                          New Department:
                          <MDBInput type="text" name="Department" value={modifyCourse.Department} onChange={handleModifyCourseChange} />{/* modify modifyCourse.Department by onChange*/}
                        </label>
                        <br></br>
                        <label>
                          New Instructor:
                          <MDBInput type="text" name="Instructor" value={modifyCourse.Instructor} onChange={handleModifyCourseChange} />{/* modify modifyCourse.Instructor by onChange*/}
                        </label>
                        <br></br>

                      </div>

                      <div className="col-lg-2">
                        <label>
                          New Capacity:
                          <MDBInput type="text" name="Capacity" value={modifyCourse.Capacity} onChange={handleModifyCourseChange} />{/* modify modifyCourse.Capacity by onChange*/}
                        </label>
                        <br></br>
                        <label>
                          New Venue:
                          <MDBInput type="text" name="Venue" value={modifyCourse.Venue} onChange={handleModifyCourseChange} />{/* modify modifyCourse.Venue by onChange*/}
                        </label>
                        <br></br>

                      </div>

                      <div className="col-lg-1">

                        <label>
                          New Date:
                        </label>
                        <br></br>
                        <select name="data" value={modifyCourse.Date} onChange={handleModifyCourseDateChange}> {/* modify modifyCourse.Data by onChange*/}
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                        </select>
                        <br></br>
                        <label>
                          New Start Time:
                        </label>
                        <br></br>
                        <select name="starttime" value={modifyCourse.StartTime} onChange={handleModifyCourseStartTimeChange}>{/* modify modifyCourse.StartTime by onChange*/}
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
                        <br></br>

                      </div>


                      <div className="col-lg-3">
                        <label>
                          New Outline:
                          <br></br>
                          <textarea rows={4} cols={30} type="text" name="Outline" value={modifyCourse.Outline} onChange={handleModifyCourseChange} />{/* modify modifyCourse.Outline by onChange*/}
                        </label>
                        <br></br>

                      </div>
                    </div>
                    <br></br>
                  </div>
                }

                {showAddForm && (
                  <div>
                    <form className=" row col-lg-12 text-center">
                      <div className="col-lg-4 " >

                      </div>
                      <div className="col-lg-4 " >
                        <h5 style={{ display: 'inline-block' , padding: "10px" }}>Add New Course</h5>
                      </div>
                      <div className="col-lg-4 " >
                        <button type="submit" className="btn btn-success" style={{
                          backgroundColor: '#28a745',
                          color: '#fff',
                          borderRadius: '5px',
                          padding: '10px 20px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        }} onClick={handleSubmitAddCourse}>Sumbit Addition</button>
                      </div>
                    </form>

                    <div class="row text-center">
                      <div className="col-lg-2 " >
                        <label>
                          New CourseID:
                          <MDBInput type="text" name="id" value={addCourse.id} onChange={handleAddCourseChange} /> {/* modify addCourse. id by onChange*/}
                        </label>
                        <br></br>
                      </div>
                      <div className="col-lg-2 " >
                        <label>
                          New CourseCode:
                          <MDBInput type="text" name="code" value={addCourse.code} onChange={handleAddCourseChange} />{/* modify addCourse.code by onChange*/}
                        </label>
                        <br></br>
                        <label>
                          New CourseName:
                          <MDBInput type="text" name="name" value={addCourse.name} onChange={handleAddCourseChange} />{/* modify addCourse.name by onChange*/}
                        </label>
                        <br></br>
                      </div>
                      <div className="col-lg-2 " >
                        <label>
                          New Department:
                          <MDBInput type="text" name="department" value={addCourse.department} onChange={handleAddCourseChange} />{/* modify addCourse.instructor by onChange*/}
                        </label>
                        <br></br>
                        <label>
                          New Instructor:
                          <MDBInput type="text" name="instructor" value={addCourse.instructor} onChange={handleAddCourseChange} />{/* modify addCourse.instructor by onChange*/}
                        </label>
                        <br></br>
                      </div>
                      <div className="col-lg-2 " >
                        <label>
                          New Capacity:
                          <MDBInput type="text" name="Capacity" value={addCourse.Capacity} onChange={handleAddCourseChange} />{/* modify addCourse.capacity by onChange*/}
                        </label>
                        <br></br>
                        <label>
                          New Venue:
                          <MDBInput type="text" name="venue" value={addCourse.venue} onChange={handleAddCourseChange} />{/* modify addCourse.venue by onChange*/}
                        </label>
                        <br></br>
                      </div>
                      <div className="col-lg-1 " >
                        <label>
                          New Date:
                        </label>
                        <br></br>
                        <select name="data" value={addCourse.Date} onChange={handleAddCourseDateChange}>{/* modify addCourse.data by onChange*/}
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                        </select>

                        <br></br>
                        <label>
                          New Start Time:
                        </label>
                        <br></br>
                        <select name="starttime" value={addCourse.StartTime} onChange={handleAddCourseStartTimeChange}>{/* modify addCourse.StartTime by onChange*/}
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
                        <br></br>
                        
                      </div>

                      <div className="col-lg-3 " >
                        <label>
                          New Outline:
                          <br></br>
                          <textarea rows={4} cols={30} type="text" name="outline" value={addCourse.outline} onChange={handleAddCourseChange} />{/* modify addCourse.outline by onChange*/}
                        </label>

                      </div>
                    </div>
                    <br></br>
                  </div>)
                }

              </form>

            </div>


          </div>

          <div className="row">

            <div className="col-lg-12">
              <h6 style={{ padding: '10px' }}>Course List</h6>
              <table>
                <thead>
                  <tr>
                    <th style={{ padding: '10px' }}>CourseCode</th>
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
                  {data.map((course) => (
                    <tr>
                      <td style={{ padding: '10px' }}><Link to={'/coursedetail/' + course.id}>{course.code}</Link></td>
                      <td style={{ padding: '10px' }}>{course.name}</td>
                      <td style={{ padding: '10px' }}>{course.id}</td>
                      <td style={{ padding: '10px' }}>{course.venue}</td>
                      <td style={{ padding: '10px' }}>{course.Date}</td>
                      <td style={{ padding: '10px' }}>{course.StartTime}</td>
                      <td style={{ padding: '10px' }}>{course.EndTime}</td>
                      <td style={{ padding: '10px' }}>{course.department}</td>
                      <td style={{ padding: '10px' }}>{course.instructor}</td>
                      <td style={{ padding: '10px' }}>{course.capacity}</td>
                      <td style={{ padding: '10px' }}>{course.available}</td>
                      <td style={{ padding: '10px' }}>
                        <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} onClick={(() => Removecourse(course.id))}>
                          <Drop className="icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      }

      </div>
    )
  } else {
    return (
      <p>Please login as admin</p>
    )
  }
}

export default Courselist;
