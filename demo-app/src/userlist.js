import ReactDOM from "react-dom/client";
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
} from 'mdb-react-ui-kit';
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AllUser } from './icon/user.svg';
import cookie from 'react-cookies'




const Userlist = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
  // This function will execute automatically when your access this page 
  const obj = { useless: '00' } // meaningless body for fetch
  useEffect(() => {
    // This function will execute automatically when your access this page 
    fetch('http://localhost:80/alluser', { // fetch all user information from back-end (aws : http://54.252.45.29. local :http://localhost:80
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((obj))
    })
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem('allUser', JSON.stringify(data)) //store the data to local Storage first
        setLoading(false)
      })
  }, []);
  const data = JSON.parse(sessionStorage.getItem('allUser')) // fetch back the data from local Storage 

  const [adduser, setaddUser] = useState({
    username: '',
    password: '',
    Sid: '',
    Sex: '',
    Department: '',
    Email: '',
    Phone: '',
  });

  const logout = () => {
    window.PopUpbox('Logout successfully', 'Please click OK to continue', 'success', 'OK')
      .then((result) => {
        cookie.remove('adminLogged')
        navigate("/")
      })

  }

  const [modifyUser, setmodifyUser] = useState({
    username: '',
    password: '',
    OldSid: '',
    Sid: '',
    Sex: '',
    Department: '',
    Email: '',
    Phone: '',
  });

  function handleSubmitAddUser(event) { // submit the Object adduser to the backend
    event.preventDefault();
    fetch('http://localhost:80/adduser', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((adduser))
    })
      .then(res => res.text())
      .then(data => {
        //console.log(data)
        if (data == 'User added successfully.') { // the adding process is success
          window.PopUpbox('Add a new user successfully', 'Please click OK to continue', 'success', 'OK')
            .then((result) => {
              window.location.reload()
            })
        }
        else { // some data is missing 
          window.PopUpbox(data, 'Please check carefully', 'error', 'OK')
        }
      }
      )
  }

  // below a for remove a course 
  const Removeobj = { id: '' } // a object contain a course id the admin would like to remove 
  async function deleteUser(ID) {
    try {
      const Removeobj = { id: ID };
      const response = await fetch('http://localhost:80/removeuser', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Removeobj)
      });
      const data = await response.text();
      await window.PopUpbox('Delete user successfully', 'Please click OK to continue', 'success', 'OK');
      window.location.reload();
    } catch (error) {
      console.log(error);
      window.PopUpbox('Failed to delete user', 'Please try again later', 'error', 'OK');
    }
  }

  function handleSubmitModifyUser(event) {
    event.preventDefault();
    fetch('http://localhost:80/modifyuser', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify((modifyUser)) // send modifyUser object to backend
    })
      .then(res => res.text())
      .then(data => {
        if (data == 'User updated successfully') { // the modify process is success
          window.PopUpbox('Modify user successfully', 'Please click OK to continue', 'success', 'OK')
            .then((result) => {
              window.location.reload()
            })
        } else {
          window.PopUpbox(data, 'Please check carefully', 'error', 'OK')
        }
      })
  }
  const [countryCode, setCountryCode] = useState("");

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  function handleAddUserChange(event) {
    const { name, value } = event.target;
    setaddUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleModifyUserChange(event) {
    const { name, value } = event.target;
    setmodifyUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  const allColumns = [
    { key: 'username', label: 'Username' },
    { key: 'password', label: 'Password' },
    { key: 'SID', label: 'SID' },
    { key: 'Sex', label: 'Sex' },
    { key: 'Department', label: 'Department' },
    { key: 'Email', label: 'Email' },
    { key: 'Phone', label: 'Phone' },
    { key: 'CartCourse', label: 'Cart Course' },
    { key: 'RegCourse', label: 'Reg Course' }
  ];

  const [selectedColumns, setSelectedColumns] = useState(['username', 'password', 'username']);

  function handleColumnToggle(columnKey) {
    if (selectedColumns.includes(columnKey)) {
      setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
    } else {
      setSelectedColumns([...selectedColumns, columnKey]);
    }
  }

  const [showModifyForm, setShowModifyForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleModifyClick = () => {
    setShowModifyForm(!showModifyForm);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setShowAddForm(!showAddForm);
    setShowModifyForm(false);
  };


  if (cookie.load('adminLogged') == "true") {
    return (
      <div>
        <div className="icon-container">
          {/* show the button on top right corner*/}
          <button onClick={logout}>
            <Exit className="icon" />
          </button>
        </div>
        <AllUser className="icon" />
        <hr className="line" />
        <h3>Userlist</h3>
        <div class="sticky-top" style={{ backgroundColor: 'lavender' }}>
          <div className="row text-center" style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <div className="col-lg-4">
              <button type="button" className="btn btn-primary" onClick={handleModifyClick}>
                {showModifyForm ? "Fold modify form" : "Select Action: Modify user information"}
              </button>
            </div>
            <div className="col-lg-4">
              <button type="button" className="btn btn-success" onClick={handleAddClick}>
                {showAddForm ? "Fold add form" : "Select Action: Add new user"}
              </button>
            </div>
            {showModifyForm && (
              <div>
                <form>
                  <h5>Modify user Information</h5>
                  <div className="row">
                    <div className="col-lg-2">
                      <label>
                        Original SID:
                        <br />
                        <MDBInput type="text" name="OldSid" value={modifyUser.OldSid} onChange={handleModifyUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        New SID:
                        <br />
                        <MDBInput type="text" name="Sid" value={modifyUser.Sid} onChange={handleModifyUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        New Username:
                        <br />
                        <MDBInput type="text" name="username" value={modifyUser.username} onChange={handleModifyUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        New Password:
                        <br />
                        <MDBInput type="text" name="password" value={modifyUser.password} onChange={handleModifyUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        New Sex:
                        <br />
                        <MDBInput type="text" name="Sex" value={modifyUser.Sex} onChange={handleModifyUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        New Department:
                        <br />
                        <MDBInput type="text" name="Department" value={modifyUser.Department} onChange={handleModifyUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        New Email:
                        <br />
                        <MDBInput type="text" name="Email" value={modifyUser.Email} onChange={handleModifyUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <label>
                        New Phone:
                        <br />
                        <div className="d-flex align-items-center">
                          <select
                            id="countryCode"
                            value={countryCode}
                            onChange={handleCountryCodeChange}
                            style={{ padding: "0.25rem", fontSize: "0.875rem" }}
                          >
                            <option value="">Select a country code</option>
                            <option value="+852">+852 (Hong Kong)</option>
                            <option value="+86">+86 (China)</option>
                          </select>
                          {countryCode === "+852" && (
                            <MDBInput type="text" name="Phone" value={modifyUser.Phone} maxLength={8} onChange={handleModifyUserChange} />
                          )}
                          {countryCode === "+86" && (
                            <MDBInput type="text" name="Phone" value={modifyUser.Phone} maxLength={13} onChange={handleModifyUserChange} />
                          )}
                        </div>
                      </label>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <button type="submit" className="btn btn-primary" onClick={handleSubmitModifyUser}>
                        Submit the Modification
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {showAddForm && (
              <div>
                <form>
                  <h5>Add new user</h5>
                  <div className="row">
                    <div className="col-lg-2">
                      <label>
                        Username:
                        <br />
                        <MDBInput type="text" name="username" value={adduser.username} onChange={handleAddUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        Password:
                        <br />
                        <MDBInput type="text" name="password" value={adduser.password} onChange={handleAddUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        SID:
                        <br />
                        <MDBInput type="text" name="Sid" value={adduser.Sid} onChange={handleAddUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        Sex:
                        <br />
                        <MDBInput type="text" name="Sex" value={adduser.Sex} onChange={handleAddUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        Department:
                        <br />
                        <MDBInput type="text" name="Department" value={adduser.Department} onChange={handleAddUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        Email:
                        <br />
                        <MDBInput type="text" name="Email" value={adduser.Email} onChange={handleAddUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <label>
                        New Phone:
                        <br />
                        <div className="d-flex align-items-center">
                          <select
                            id="countryCode"
                            value={countryCode}
                            onChange={handleCountryCodeChange}
                            style={{ padding: "0.25rem", fontSize: "0.875rem" }}
                          >
                            <option value="">Select a country code</option>
                            <option value="+852">+852 (Hong Kong)</option>
                            <option value="+86">+86 (China)</option>
                          </select>
                          {countryCode === "+852" && (
                            <MDBInput type="text" name="Phone" value={adduser.Phone} maxLength={8} onChange={handleAddUserChange} />
                          )}
                          {countryCode === "+86" && (
                            <MDBInput type="text" name="Phone" value={adduser.Phone} maxLength={13} onChange={handleAddUserChange} />
                          )}
                        </div>
                      </label>
                    </div>
                    <div className="text-center mt-3" style={{ textAlign: "center" }}>
                      <button type="submit" className="btn btn-success" onClick={handleSubmitAddUser}>
                        Add new user
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>


        {/* display all user information by a table (the logic of this code is similar to the table of profile )*/}
        {isLoading == false &&
          <div className="row vh-100">
            <div className="col-6 justify-content-center align-items-center ml-auto">
              <div>
                <h4>Select User Attributes:</h4>
                {allColumns.map(column => (
                  <label key={column.key} style={{ marginRight: '10px' }}>
                    <input type="checkbox" checked={selectedColumns.includes(column.key)} onChange={() => handleColumnToggle(column.key)} />
                    {column.label}
                  </label>
                ))}
                <table style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}>
                  {/* Table content */}
                  <thead>
                    <tr>
                      {selectedColumns.map(columnKey => (
                        <th key={columnKey} style={{ padding: '20px' }}>{allColumns.find(column => column.key === columnKey).label}</th>
                      ))}
                      <th style={{ padding: '20px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => (
                      <tr key={user.username}>
                        {selectedColumns.map(columnKey => (
                          <td key={columnKey} style={{ padding: '20px' }}>{user[columnKey]}</td>
                        ))}
                        <td style={{ padding: '20px' }}>
                          <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} onClick={() => deleteUser(user.username)}>
                            <Drop className="Del_Add_icon" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
      </div>
    )
  } else {
    return (
      <p>Please login as admin</p>
    )
  }
}

export default Userlist;
