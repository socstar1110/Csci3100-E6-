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
import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';
import cookie from 'react-cookies'
import { FaEdit, FaPlus } from 'react-icons/fa';



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

  const toCourseList = () => {
    navigate("/courselist")
  }

  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

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

  const [selectedColumns, setSelectedColumns] = useState(['username', 'password',"SID"]);

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

        <div style={{ height: '40px' }}>
          <div style={{ height: '40px', backgroundColor: '#f2f2f2' }}>
            <div style={{ marginLeft: '40px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
              <h3 style={{ display: 'inline-block', color: '#222' }}>Welcome back, &nbsp; <span style={{ color: '#3b5998' }}>Admin</span></h3>
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
              <button onMouseEnter={() => handleMouseEnter('All Course Page')} onMouseLeave={handleMouseLeave} onClick={toCourseList}>
                <AllCourse className="icon" />
              </button>
            </div>
          </div>
        </div>
        <hr className="line" />

        <div class="sticky-top" style={{ backgroundColor: 'lavender' }}>
          <div className="row text-center" style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <div className="col-lg-6">
              <button type="button" className="btn btn-warning" onClick={handleModifyClick}>
                {showModifyForm ? <><FaEdit /> Fold modify form</> : <><FaEdit /> Select Action: Modify user information</>}
              </button>
            </div>
            <div className="col-lg-6">
              <button type="button" className="btn btn-info" onClick={handleAddClick}>
                {showAddForm ? <><FaPlus /> Fold add form</> : <><FaPlus /> Select Action: Add new user</>}
              </button>
            </div>
            {showModifyForm && (
              <div>
                
                <form className=" row col-lg-12 text-center">

                  <div className="col-4 " >
                  </div>
                  <div className="col-4 " >
                    <h5 style={{ display: 'inline-block', padding: "10px" }}>Modify User Information</h5>
                  </div>
                  <div className="col-4 " >
                    <button type="submit" className="btn btn-warning" style={{ display: 'inline-block', margin: "10px" }} onClick={handleSubmitModifyUser}>
                      Submit the Modification
                    </button>
                  </div>

                  <div class="row text-center" style={{ paddingLeft: '20px' }}>
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

                  </div>
                </form>
              </div>
            )}
            {showAddForm && (
              <div>
             <form className=" row col-lg-12 text-center">

                <div className="col-4 " >
                  </div>
                  <div className="col-4 " >
                    <h5 style={{ display: 'inline-block', padding: "10px" }}>Add New User</h5>
                  </div>
                  <div className="col-4 " >
                    <button type="submit" className="btn btn-info" style={{ display: 'inline-block', margin: "10px" }} onClick={handleSubmitAddUser}>
                    Submit the Addition
                    </button>
                  </div>


                  <div class="row text-center" style={{ paddingLeft: '20px' }}>
                  <div className="col-lg-2">
                    </div>

                    <div className="col-lg-2">
                    <label>
                        New SID:
                        <br />
                        <MDBInput type="text" name="Sid" value={adduser.Sid} onChange={handleAddUserChange} />
                      </label>
                      <label>
                        New Username:
                        <br />
                        <MDBInput type="text" name="username" value={adduser.username} onChange={handleAddUserChange} />
                      </label>
                    </div>

                    <div className="col-lg-2">
                      <label>
                        New Password:
                        <br />
                        <MDBInput type="text" name="password" value={adduser.password} onChange={handleAddUserChange} />
                      </label>
                      <label>
                        New Sex:
                        <br />
                        <MDBInput type="text" name="Sex" value={adduser.Sex} onChange={handleAddUserChange} />
                      </label>
                    </div>
                    <div className="col-lg-2">
                      <label>
                        New Department:
                        <br />
                        <MDBInput type="text" name="Department" value={adduser.Department} onChange={handleAddUserChange} />
                      </label>
                      <label>
                        New Email:
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
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <h6 style={{ padding: '10px' }}>User List</h6>
        {/* display all user information by a table (the logic of this code is similar to the table of profile )*/}
        {isLoading == false &&
          <div className="row vh-100">
            <div className=" justify-content-center align-items-center ml-auto">
              <div >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <h5 style={{ marginRight: '10px' }}>Select User Attributes:</h5>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    {allColumns.map(column => (
                      <label key={column.key} style={{ marginRight: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" checked={selectedColumns.includes(column.key)} onChange={() => handleColumnToggle(column.key)} style={{ marginRight: '5px' }} />
                        <span>{column.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
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
