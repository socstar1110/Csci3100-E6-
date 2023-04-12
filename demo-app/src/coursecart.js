import ReactDOM from "react-dom/client";
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import cookie from 'react-cookies'
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AddIcon } from './icon/plus.svg';


const Coursecart =() =>{
  const [username, setUsername] = useState(cookie.load('username')); 
  const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
  const [temp, setFinalData] = useState([]);
  //checkIDs
  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const regCourses = (courseIDs) => {
    const responses = [];
  
    courseIDs.forEach((courseID) => {
      let payload = {
        courseID: courseID,
        username: username
      };
      console.log(payload);
  
      let options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };
  
      fetch('http://localhost:80/regCourse', options)
        .then((response) => response.text())
        .then((data) => {
          setLoading(true);
          responses.push("Course "+ courseID +" : " + data);
          if (responses.length === courseIDs.length) {
            // All requests have been completed
            // console.log(responses);
            window.PopUpbox(responses.join('\n'), 'Please click OK to continue', null, 'OK');
          }
        })
        .catch((err) => {
          console.error(err);
          responses.push(`Error occurred: ${err.message}`);
          if (responses.length === courseIDs.length) {
            // All requests have been completed
            console.log(responses);
            window.PopUpbox(responses.join('\n'));
          }
        });
    });

  };

  const dropFromCart = (courseID)=>{             //drop from cart
    setLoading(true);
    let payload={
        username: username,
        courseId: courseID
    }
    console.log(payload);
    let options ={
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    fetch("http://localhost:80/dropfromcart",options)
    .then(res => res.text()) 
    .then(data => {
      window.PopUpbox(data, 'Please click OK to continue', 'success', 'OK');
      setLoading(true);
    }) 
  }
  
  // const temp = [ //temp data for display //9867
  // {name:"Software Engineering", id:"7894",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
  // {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
  // ];
  //const name = "wilson";
  useEffect(() => {
    fetch('http://localhost:80/cartcourse/'+username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        setFinalData(data);
        localStorage.setItem("CartCourse", JSON.stringify(data));
        setLoading(false)
      })
      .catch(error => console.error(error));
  }, [isLoading]);
  //console.log(temp);
  
  return(
    <div>
    {isLoading == false &&
      <div>
        <h6 className = "container d-flex justify-content-center align-items-center">Your Course Cart</h6>
        <div className = "container d-flex justify-content-center align-items-center">
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
                <th style={{ padding: '10px' }}>Remove</th>
                <th style={{ padding: '10px' }}>Select</th>
              </tr>
            </thead>
          <tbody>
            {temp.map((course) => (
              <tr>
                <td style={{padding: '20px'}}><Link to={'/'}>{course.courseCode}</Link></td>
                <td style={{padding: '20px'}}>{course.courseName}</td>
                <td style={{padding: '20px'}}>{course.courseId}</td>
                <td style={{padding: '20px'}}>{course.venue}</td>
                <td style={{padding: '20px'}}>{course.date}</td>
                <td style={{padding: '20px'}}>{course.startTime}</td>
                <td style={{padding: '20px'}}>{course.endTime}</td>
                <td style={{padding: '20px'}}>{course.department}</td>
                <td style={{padding: '20px'}}>{course.instructor}</td>
                <td style={{padding: '20px'}}>{course.capacity}</td>
                <td style={{padding: '20px'}}>{course.availability}</td>
                <td style={{padding: '20px'}}>
                  <button className="dropCrouse" onClick={() => dropFromCart(course.courseId)} style={{ width: '40px', height: '40px', padding: '0px' }}>
                    <Drop className="icon"/>
                  </button>
                </td>
                <td style={{padding: '20px'}}>
                  <input
                      type="checkbox"
                      checked={checkedIds.includes(course.courseId)}
                      onChange={() => handleCheckboxChange(course.courseId)}
                    ></input>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <div className = "container d-flex justify-content-center align-items-center">
          <button className = "btn btn-dark" onClick={() => regCourses(checkedIds)} > Select</button>
        </div>  
      </div>
      }
      </div>
  )
}


export default Coursecart;
