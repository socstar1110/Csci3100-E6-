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
const Admin =() =>{
    const navigate = useNavigate();

    const logout = ()=>{
      window.PopUpbox('Logout successfully','Please click OK to continue','success','OK')
      .then((result) => {
        cookie.remove('adminLogged')
        navigate("/")
        })
      
    }
  
    const toCourseList = () =>{
      navigate("/courselist")
    }
  
    const toUserList = () =>{
      navigate("/userlist")
    }
    
    if(cookie.load('adminLogged') == "true"){
      return(
        <div>
          <h4>Admin</h4>
          <hr className="line"/>
          <div className="icon-container"> {/* show the button on top right corner*/}
            <button onClick={logout}>
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
    }else{
      return(
        <p>Please login as admin</p>
      )
    }
  }

  export default Admin;
