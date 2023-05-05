import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Drop } from './icon/dash.svg';
import cookie from 'react-cookies'
import { useEffect, useState } from 'react';

const SelectCourse = ({ data }) => {
  const [SelectedCourse, setSelectedCourse] = useState();
  const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return

  const obj ={username:cookie.load('username')} // send to the backend 
  useEffect(() => {
    // This function will execute automatically when the component mounts
    fetch('http://localhost:80/showSelected', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, 
      credentials: 'include', // for receiving cookies
      body: JSON.stringify((obj))
    })
      .then(res => res.json())
      .then(data => {
        setSelectedCourse(data)
        console.log(SelectedCourse)
        setLoading(false)
      })
  }, []);

  const Removeobj = { username: cookie.load('username'), id: '123' } // an object that contains a course id the admin would like to remove 
  function Removecourse(ID) {
    Removeobj.id = ID
    console.log(ID)
    fetch('http://localhost:80/removeSelected', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify((Removeobj))
    })
      .then(res => res.text())
      .then(data => {
        window.PopUpbox('The course has been removed', 'Please click OK to continue', 'success', 'OK')
        .then((result) => {
          window.location.reload()
        })
      })
  }

  return (
    <div>
      {isLoading == false &&
        <div>
          <h6 className="container d-flex justify-content-center align-items-center">View Select Course</h6>
          <div className="collapse navbar-collapse container d-flex justify-content-center align-items-center">
            <table>
              <thead>
                <tr>
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
                  <th style={{ padding: '10px' }}>Availability</th>
                  <th style={{ padding: '10px' }}>Delete</th>        
                </tr>
              </thead>
              <tbody>
                {SelectedCourse.map((course) => (
                  <tr key={course.id}>
                    <td style={{ padding: '10px' }}><Link to={'/coursedetail/' + course.CourseId}>{course.CourseCode}</Link></td> {/* a link to access course detail )*/}
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
                    <td style={{ padding: '30px' }}>
                      <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} onClick={(() => Removecourse(course.CourseId))}>
                        <Drop className="Del_Add_icon" />
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
  );
};

export default SelectCourse;
