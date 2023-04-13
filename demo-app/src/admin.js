import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';
import { ReactComponent as AllUser } from './icon/user.svg';
import cookie from 'react-cookies'
const Admin = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.PopUpbox('Logout successfully', 'Please click OK to continue', 'success', 'OK')
      .then((result) => {
        cookie.remove('adminLogged')
        navigate("/")
      })

  }

  const toCourseList = () => {
    navigate("/courselist")
  }

  const toUserList = () => {
    navigate("/userlist")
  }


  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  if (cookie.load('adminLogged') == "true") {
    return (
      <div>
        <div style={{ height: '40px', backgroundColor: '#f2f2f2' }}>
          <div style={{ marginLeft: '40px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            <h3 style={{ display: 'inline-block', color: '#222' }}>Welcome back, &nbsp; <span style={{ color: '#3b5998' }}>Admin</span></h3>
            {hoveredButton && (
              <div className="tooltip-container" style={{ display: 'inline-block', position: 'absolute', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#3b5998', color: '#fff', borderRadius: '5px', padding: '5px' }}>
                <h3>{hoveredButton}</h3>
              </div>
            )}
          </div>
          <div className="icon-container"> {/* show the button on top right corner*/}
          <button onMouseEnter={() => handleMouseEnter('Log out')} onMouseLeave={handleMouseLeave} onClick={logout}>
              <Exit className="icon" />
            </button>
          </div>
          <hr className="line" />

        </div>


        {/* a button for admim to access the crouselist*/}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
          <div style={{ padding: '10px' }}>
            <button className="admin-button" onClick={toCourseList}>
              <AllCourse className="option" />
            </button>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h2>All Courses</h2>
            </div>
          </div>

          {/* a button for admim to access the userlist*/}
          <div style={{ padding: '10px' }}>
            <button className="admin-button" onClick={toUserList}>
              <AllUser className="option" />
            </button>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h2>All Users</h2>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <p>Please login as admin</p>
    )
  }
}

export default Admin;
