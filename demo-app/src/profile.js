import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import SelectCourse from './selectedcourses'
import TimeTable from './timetable';
import cookie from 'react-cookies'
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaHome, FaBook, FaCalendar } from 'react-icons/fa';


const Profile = () => {
  const [username, setUsername] = useState(cookie.load('username'));
  const [userdata, setUserdata] = useState();
  const [page, setPage] = useState(''); // page indicate which part of profile you would like to show
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    window.PopUpbox('Logout successfully', 'Please click OK to continue', 'success', 'OK')
      .then((result) => {
        cookie.remove('username')
        cookie.remove('logged')
        navigate("/")
      })

  }
  const ToSearch = () => {
    navigate("/search")
  }

  const reload = () => {
    window.location.reload()
  }
  useEffect(() => {
    // This function will execute automatically when your access this page 
    setPage("home")
    const obj = { username: username }

    fetch('http://localhost:80/userdata', { // fetch all course information from back-end (aws : http://54.252.45.29. local :http://localhost:80
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((obj))
    })
      .then(res => res.json())
      .then(data => {
        setUserdata(data)
        setLoading(false)
      })

  }, []);

  const sethome = () => {
    setPage("home") // show home 
  }

  const setTimetable = () => {
    setPage("Timetable") // show timetable 
  }

  const setSelected = () => { // show selected courese 
    setPage("Selected")
  }

  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordValue = () => {
    if (showPassword) {
      return userdata.password;
    } else {
      return '×'.repeat(userdata.password.length);
    }
  };


  if (cookie.load('logged') == "true") {
    return (
      <div >

        <div style={{ height: '40px' }}>
          <div style={{ height: '40px', backgroundColor: '#f2f2f2' }}>
            <div style={{ marginLeft: '40px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
              <h3 style={{ display: 'inline-block', color: '#222' }}>Welcome back, &nbsp; <span style={{ color: '#3b5998' }}>{username}</span></h3>
              {hoveredButton && (
                <div className="tooltip-container" style={{ display: 'inline-block', position: 'absolute', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#3b5998', color: '#fff', borderRadius: '5px', padding: '5px' }}>
                  <h3>{hoveredButton}</h3>
                </div>
              )}
            </div>
          </div>
          <div>

            <div className="icon-container">
              <button onMouseEnter={() => handleMouseEnter('Log out')} onMouseLeave={handleMouseLeave} onClick={logout}>
                <Exit className="icon" />
              </button>
              <button onMouseEnter={() => handleMouseEnter('Search')} onMouseLeave={handleMouseLeave} onClick={ToSearch}>
                <SearchIcon className="icon" />
              </button>
              <button onMouseEnter={() => handleMouseEnter('Profile')} onMouseLeave={handleMouseLeave} onClick={reload}>
                <Person className="icon" />
              </button>
            </div>
          </div>
        </div>
        <hr className="line" />

        <nav class="navbar navbar-expand ">
          <div class="collapse navbar-collapse d-flex justify-content-center align-items-center" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <button style={{ margin: '10px', fontSize: '20px', backgroundColor: '#0077b6', borderColor: '#0077b6', color: '#fff', padding: '10px 20px' }} type="button" class="btn btn-lg" onClick={sethome}>
                <FaHome style={{ marginRight: '5px' }} /> Home
              </button>
              <button style={{ margin: '10px', fontSize: '20px', backgroundColor: '#e63946', borderColor: '#e63946', color: '#fff', padding: '10px 20px' }} type="button" class="btn btn-lg" onClick={setSelected}>
                <FaBook style={{ marginRight: '5px' }} /> Selected Course
              </button>
              <button style={{ margin: '10px', fontSize: '20px', backgroundColor: '#FFA500', borderColor: '#FFA500', color: '#fff', padding: '10px 20px' }} type="button" class="btn btn-lg" onClick={setTimetable}>
                <FaCalendar style={{ marginRight: '5px' }} /> View Timetable
              </button>
            </div>
          </div>
        </nav>


        {page === "home" && isLoading == false &&

          /* show the home  */
          <div class="collapse navbar-collapse container d-flex justify-content-center align-items-center">

            <div className>
              <table style={{ fontSize: '20px' }}>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '15px' }}>Username:</td>
                  <td style={{ padding: '15px' }}>{userdata.username}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '15px' }}>Password:</td>
                  <td style={{ padding: '15px', position: 'relative' }}>
                    {getPasswordValue()}{' '}
                    <span
                      onClick={handleShowPassword}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        padding: '10px'
                      }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '15px' }}>SID:</td>
                  <td style={{ padding: '15px' }}>{userdata.Sid}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '15px' }}>Sex:</td>
                  <td style={{ padding: '15px' }}>{userdata.Sex}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '15px' }}>Department:</td>
                  <td style={{ padding: '15px' }}>{userdata.Department}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '15px' }}>Email:</td>
                  <td style={{ padding: '15px' }}>{userdata.Email}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold', padding: '15px' }}>Phone:</td>
                  <td style={{ padding: '15px' }}>{userdata.Phone}</td>
                </tr>
              </table>
            </div>








          </div>







        }
        {/* show the selected course */}
        {page === "Selected" && <SelectCourse />}
        {page === "Timetable" && <TimeTable />}
      </div>
    )
  } else {
    return (
      <p>Please login</p>
    )
  }
}


export default Profile;
