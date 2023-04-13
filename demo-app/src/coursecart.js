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
import './courseCart.css';
import cookie from 'react-cookies'


const Coursecart =() =>{
  const username = cookie.load('username');
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
  const regCourses = async (courseIDs) => {
    const responses = [];
    try {
      for (const courseID of courseIDs) {
        let payload = {
          courseID: courseID,
          Idlist: courseIDs,
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
  
        const response = await fetch('http://54.252.45.29/regCourse', options);
        const data = await response.text();
        setLoading(true);
        responses.push("CourseID "+ courseID +" : " + data);
        if (data.includes("Registered course " )||data.includes("You have already registered for the course " )) {
          await dropFromCart(courseID, false);
        }
      }
      // All requests have been completed
      window.PopUpbox(responses.join('\n'), 'Please click OK to continue', null, 'OK');
      setCheckedIds([]);
    } catch (err) {
      console.error(err);
      responses.push(`Error occurred: ${err.message}`);
      window.PopUpbox(responses.join('\n'));
    }
  };

  const dropFromCart = async (courseID, windowPop = true) => {
    setLoading(true);
    let payload = {
      username: username,
      courseId: courseID
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
    try {
      const response = await fetch("http://54.252.45.29/dropfromcart/" + username + "/" + courseID, options);
      const data = await response.text();
      if (windowPop) {
        window.PopUpbox(data, 'Please click OK to continue', 'success', 'OK');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (windowPop) {
        window.PopUpbox(`Error occurred: ${err.message}`);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('http://54.252.45.29/cartcourse/'+username, {
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
  
  // select All boxes
  const selectAll = () => {
    const allIds = temp.map((course) => course.courseId);
    setCheckedIds(allIds);
  };
  
  return (
    <div>
      {isLoading == false && (
        <div>
          <h6 className="container d-flex justify-content-center align-items-center">Your Course Cart</h6>
          <div className="container d-flex justify-content-center align-items-center">
            <table>
              <thead>
                <tr> {/*Display the column names */}
                  <th style={{ padding: "10px" }}>CourseCode</th>  {/* add a padding for a clear ui )*/}
                  <th style={{ padding: "10px" }}>CourseName</th>
                  <th style={{ padding: "10px" }}>CourseID</th>
                  <th style={{ padding: "10px" }}>Venue</th>
                  <th style={{ padding: "10px" }}>Date</th>
                  <th style={{ padding: "10px" }}>StartTime</th>
                  <th style={{ padding: "10px" }}>EndTime</th>
                  <th style={{ padding: "10px" }}>Department</th>
                  <th style={{ padding: "10px" }}>Instructor</th>
                  <th style={{ padding: "10px" }}>Capacity</th>
                  <th style={{ padding: "10px" }}>Available</th>
                  <th style={{ padding: "10px" }}>Remove</th>
                  <th style={{ padding: "10px" }}>Select</th>
                </tr>
              </thead>
              <tbody>
                {temp.map((course) => (
                  <tr>
                    <td style={{ padding: "20px" }}>
                      <Link to={"/"}>{course.courseCode}</Link>
                    </td>
                    <td style={{ padding: "20px" }}>{course.courseName}</td>
                    <td style={{ padding: "20px" }}>{course.courseId}</td>
                    <td style={{ padding: "20px" }}>{course.venue}</td>
                    <td style={{ padding: "20px" }}>{course.date}</td>
                    <td style={{ padding: "20px" }}>{course.startTime}</td>
                    <td style={{ padding: "20px" }}>{course.endTime}</td>
                    <td style={{ padding: "20px" }}>{course.department}</td>
                    <td style={{ padding: "20px" }}>{course.instructor}</td>
                    <td style={{ padding: "20px" }}>{course.capacity}</td>
                    <td style={{ padding: "20px" }}>{course.availability}</td>
                    <td style={{ padding: "20px" }}>
                      <button
                        className="dropCrouse"
                        onClick={() => dropFromCart(course.courseId)}
                        style={{ width: "40px", height: "40px", padding: "0px" }}
                      >
                        <Drop className="icon" />
                      </button>
                    </td>
                    <td style={{ padding: "20px" }}>
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
          <div className="container d-flex justify-content-center align-items-center">
            <button className="btn btn-success" onClick={() => regCourses(checkedIds)}>
              Register
            </button>
            <button className="btn btn-dark" style={{ marginLeft: "10px" }} onClick={selectAll}>
              Select All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Coursecart;
