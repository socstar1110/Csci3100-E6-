import ReactDOM from "react-dom/client";
import React from 'react';
import {

  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
}from 'mdb-react-ui-kit';

import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AllUser } from './icon/user.svg';

const Userlist =() =>{
    const data = [ //temp data for display 
      {name: 'testuser', password:"csci3100",ID:"1234"},
    ];
    return(
      <div>
        <div className="icon-container"> {/* show the button on top right corner*/}
          <button>
            <Exit className="icon"/>
          </button>
          <button>
            <SearchIcon className="icon"/>
          </button>
        </div>
        <AllUser className="icon"/>
        <hr className="line"/>
        <h6>Userlist</h6>
  
  
        {/* display all user information by a table (the logic of this code is similar to the table of profile )*/}
        <div className="row">
          <div className="col-6">
            <table>
              <thead>
                <tr>
                  <th style={{padding: '20px'}}>Username</th>
                  <th style={{padding: '20px'}}>Password</th>
                  <th style={{padding: '20px'}}>UserID</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr> 
                    <td style={{padding: '20px'}}><Link to={'/'}>{user.name}</Link></td> {/* a link to a acces user detail )*/}
                    <td style={{padding: '20px'}}>{user.password}</td>
                    <td style={{padding: '20px'}}>{user.ID}</td>
                    <td style={{padding: '20px'}}>
                      <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                        <Drop className="icon"/>
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* a form for a admin to modify user information*/}
          <div className="col-3">
            <form >
              <h5>Modify user Information</h5>
              <br></br>
              <label>
                Original UserID:
                <br></br>
                <MDBInput type="text"/> 
              </label>
              <br></br>
              <label>
                New UserID:
                <br></br>
                <MDBInput type="text"/>
              </label>
              <br></br>
              <label>
                New Username:
                <br></br>
                <MDBInput type="text"/>
              </label>
              <br></br>
              <label>
                New Password:
                <br></br>
                <MDBInput type="text"/>
              </label>
            </form>
            <br></br>
            {/*click this button to modify */}
            <button type="submit" class="btn btn-primary">modify</button>         
          </div>
          
          {/* a form for a admin to add a new user*/}
          <div className="col-3">
            <form >
              <h5>Add new user</h5>
              <br></br>
              <label>
                New UserID:
                <br></br>
                <MDBInput type="text"/>
              </label>
              <br></br>
              <label>
                New Username:
                <br></br>
                <MDBInput type="text"/>
              </label>
              <br></br>
              <label>
                New Password:
                <br></br>
                <MDBInput type="text"/>
              </label>
            </form>
            <br></br>
            {/*click this button to add */}
            <button type="submit" class="btn btn-success">add</button>         
          </div>
        </div>
  
      </div>
    )
  }

export default Userlist;
