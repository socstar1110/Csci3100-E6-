import React from 'react';
import { useEffect, useState } from 'react'; // Importing React hooks
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router
import 'bootstrap/dist/css/bootstrap.css'; // Importing Bootstrap CSS styles
import './style.css' // Importing custom styles
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg'; // Importing SVG icons
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';
import { ReactComponent as AllUser } from './icon/user.svg';
import cookie from 'react-cookies' // Importing the react-cookies package

const Admin = () => {
  const navigate = useNavigate(); // Initializing the useNavigate hook

  const logout = () => { // Function to handle logout
    window.PopUpbox('Logout successfully', 'Please click OK to continue', 'success', 'OK') // Display a confirmation popup
      .then((result) => {
        cookie.remove('adminLogged') // Remove the 'adminLogged' cookie
        navigate("/") // Navigate to the home page
      })

  }

  const toCourseList = () => { // Function to handle navigation to the course list
    navigate("/courselist")
  }

  const toUserList = () => { // Function to handle navigation to the user list
    navigate("/userlist")
  }


  const [hoveredButton, setHoveredButton] = useState(null); // Initializing the state for the hovered button

  const handleMouseEnter = (buttonName) => { // Function to handle mouse enter event for the logout button
    setHoveredButton(buttonName); // Update the state of the hovered button
  };

  const handleMouseLeave = () => { // Function to handle mouse leave event for the logout button
    setHoveredButton(null); // Reset the state of the hovered button
  };

  if (cookie.load('adminLogged') == "true") { // Check if the 'adminLogged' cookie is present
    return (
      <div>
        <div style={{ height: '40px', backgroundColor: '#f2f2f2' }}>
          <div style={{ marginLeft: '40px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            <h3 style={{ display: 'inline-block', color: '#222' }}>Welcome back, &nbsp; <span style={{ color: '#3b5998' }}>Admin</span></h3> {/* Display the welcome message */}
            {hoveredButton && ( // Render the tooltip if the hoveredButton state is not null
              <div className="tooltip-container" style={{ display: 'inline-block', position: 'absolute', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#3b5998', color: '#fff', borderRadius: '5px', padding: '5px' }}>
                <h3>{hoveredButton}</h3>
              </div>
            )}
          </div>
          <div className="icon-container"> {/* Display the logout button on the top right corner */}
          <button onMouseEnter={() => handleMouseEnter('Log out')} onMouseLeave={handleMouseLeave} onClick={logout}>
              <Exit className="icon" />
            </button>
          </div>
          <hr className="line" />

        </div>


        {/* Render the buttons to access the course list and user list */}
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
  } else { // Render a message asking the user to login as admin
    return (
      <p>Please login as admin</p>
    )
  }
}

export default Admin;
