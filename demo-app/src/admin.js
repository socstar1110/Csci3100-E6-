import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';
import { ReactComponent as AllUser } from './icon/user.svg';

const Admin =() =>{
    const navigate = useNavigate();
  
    const toCourseList = () =>{
      navigate("/courselist")
    }
  
    const toUserList = () =>{
      navigate("/userlist")
    }
  
    return(
      <div>
        <h4>Admin</h4>
        <hr className="line"/>
        <div className="icon-container"> {/* show the button on top right corner*/}
          <button>
            <Exit className="icon"/>
          </button>
          <button>
            <SearchIcon className="icon"/>
          </button>
        </div>
        {/* a button for admim to access the crouselist*/}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style = {{marginRight: '10px' }}>
            <button className="admin-button" onClick = {toCourseList}>
              <AllCourse className="option" />
            </button>
            <br></br>
            <span>All Course</span>
          </div>
          
          {/* a button for admim to access the userlist*/}
          <div>
            <button className="admin-button" onClick = {toUserList}>
              <AllUser className="option"/>
            </button>
            <br></br>
            <span>All User</span>
          </div>
        </div> 
      </div>
    )
  }

  export default Admin;
