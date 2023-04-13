import ReactDOM from "react-dom/client";
import React from 'react';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';

import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';
import cookie from 'react-cookies'


// fetch all course information from back-end (aws : http://54.252.45.29. local :http://localhost:80

const CourseDetail = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
  const obj = { id: decodeURI(window.location.href.split('/')[4]) }  //get the id by the url
  fetch('http://localhost:80/coursedetail', {
    method: 'POST',
    model: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify((obj))
  })
    .then(res => res.json()) // save the data as json 
    .then(data => {
      //console.log(data)
      sessionStorage.setItem('CourseDetail', JSON.stringify(data)) // stroe the data as string in local Storage
      setLoading(false)
    })
  const CourseDetail = JSON.parse(sessionStorage.getItem('CourseDetail'))

  const logout = () => {
    window.PopUpbox('Logout successfully', 'Please click OK to continue', 'success', 'OK')
      .then((result) => {
        cookie.remove('adminLogged')
        cookie.remove('username')
        cookie.remove('logged')
        navigate("/")
      })

  }
  if(cookie.load('adminLogged') == "true" || cookie.load('logged') == "true"){
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
        {cookie.load('adminLogged') == "true" &&
          <AllCourse className="icon" />
        }
        {cookie.load('logged') == "true" &&
          <h4>{cookie.load('username')}</h4>
        }
        <hr className="line" />


        {isLoading == false &&
          <div style={{ padding: '80px' }}>
            <p style={{ fontSize: '20px' ,fontWeight: 'bold'}}>{CourseDetail.code}</p>
            <p style={{ fontSize: '20px' ,fontWeight: 'bold'}}>{CourseDetail.name}</p>
            <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }} />
            <div className="row">
              <div className="col-lg-6 ">
                <table style={{ fontSize: '20px' }}>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Course ID:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.id}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Venue:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.venue}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Date:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.date}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Start Time:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.startTime}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>End Time:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.endTime}</td>

                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Department:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.department}</td>

                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Instructor:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.instructor}</td>

                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Capacity:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.capacity}</td>

                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Available:</td>
                    <td style={{ padding: '10px' }}>{CourseDetail.available}</td>
                  </tr>
                </table>
              </div>

              <div className="col-lg-6 ">
                <p style={{ fontSize: '20px' ,fontWeight: 'bold'}}>Outline: </p>
                <p style={{ fontSize: '20px' }}>{CourseDetail.outline}</p>
              </div>


              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                {cookie.load('adminLogged') == "true" &&
                  <Link to="/courselist" style={{ textDecoration: 'none' }}>
                    <br></br>
                    <button style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}>
                      Back to Course List
                    </button>
                  </Link>
                }

                {cookie.load('logged') == "true" &&
                  <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <br></br>
                    <button style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}>
                      Back to Profile
                    </button>
                  </Link>
                }


              </div>

            </div>
          </div>
        }

      </div>
    )
  }else{
    return(
      <p>Plese login</p>
    )
  }
}

export default CourseDetail;
