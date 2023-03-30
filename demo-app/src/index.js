import ReactDOM from "react-dom/client";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import {View, Switch, StyleSheet, Text} from 'react-native';
import { CDBBtn ,CDBIcon} from "cdbreact";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';
import { ReactComponent as AllUser } from './icon/user.svg';
import { ReactComponent as AddIcon } from './icon/plus.svg';

/* use window. to create a global function */
window.PopUpbox = function(title,text,icon,confirmButtonText) { /* a box will show up when the function is called */
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
    confirmButtonText: confirmButtonText,
  });
};



function App() {
  return ( /* BrowserRouter asign each functional component as a link, each component will render a page */
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/userlist" element={<Userlist/>}/>
        <Route path="/courselist" element={<Courslist/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const Login = () =>{
  const [username, setUsername] = useState(''); /* define two variable in the functional component, this value of two variable will be send to backend */
  const [password, setPassword] = useState('');

  return( // whre the value of the box is changed will updata the username and passowrd  
  <div>
    <MDBContainer fluid className='p-4'>
    <MDBRow>
      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
          Cusis 2.0  <br />
        </h1>

        <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          A better course selection system
        </p>

      </MDBCol>
      <MDBCol md='6'>
        <MDBCard className='my-5'>
          <MDBCardBody className='p-5'>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='User name' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/> 
                {/* change the value of username base on the value of this box */}
              </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            {/* change the value of password base on the value of this box */}
            <button onClick={() => window.PopUpbox('Invalid login credentials','Please type the correct login credentials or register a new account','error','OK')} class="btn btn-primary">
              Login
            </button>
            <br></br>
            <button class="btn btn-link">Register</button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </MDBContainer>
  </div>
  )
}

const Register =() =>{
  const [username, setUsername] = useState(''); /* define two variable in the functional component, this value of two variable will be send to backend */
  const [password, setPassword] = useState('');

  return ( // log in form and some style by bootstrap
  <MDBContainer fluid> 
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            <h2 className="fw-bold mb-2 text-center">Register</h2>
            

            <MDBInput wrapperClass='mb-4 w-100' label='Username' id='username' size="lg" type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
            {/* change the value of username base on the value of this box */}
            <MDBInput wrapperClass='mb-4 w-100' label='Password' id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {/* change the value of password base on the value of this box */}

            <button class="btn btn-primary">
              Register
            </button>
            <hr className="my-4" />

          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
}


const Profile = () =>{
  const [username, setUsername] = useState(''); 
  const [page, setPage] = useState(''); // page indicate which part of profile you would like to show


  useEffect(() => {
    // This function will execute automatically when your access this page 
    setUsername("testuser")
    setPage("home")
  }, []);

  const sethome = () =>{
    setPage("home") // show home 
  }

  const setTimetable = () =>{
    setPage("Timetable") // show timetable 
  }

  const setSelected = () =>{ // show selected courese 
    setPage("Selected")
  }

  const data = [
    {name:"Software Engineering", id:"4912",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
    {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
  ];

  return(
    <div >
      <h4>{username}</h4>
      <div className="icon-container">
        <button >
          <Exit className="icon"/>
        </button>
        <button >
          <SearchIcon className="icon"/>
        </button>
        <button >
          <Person className="icon"/>
        </button>
      </div>
      <hr className="line"/>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse container d-flex justify-content-center align-items-center" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <button style={{margin:'10px'}} type="button" class="btn btn-primary" onClick={sethome}>Home </button>
            <button style={{margin:'10px'}} type="button" class="btn btn-success" onClick={setSelected}>Selected Course </button>
            <button style={{margin:'10px'}} type="button" class="btn btn-warning" onClick={setTimetable}>Timetable </button>
          </div>
        </div>
      </nav>

      {page == "home" && /* show the home  */
        <p class="collapse navbar-collapse container d-flex justify-content-center align-items-center"> welcome back</p>
      }

      {page == "Selected" && /* show the selected course */
        <div>
          <h6 className = "container d-flex justify-content-center align-items-center">View Select Course</h6>
          <div class="collapse navbar-collapse container d-flex justify-content-center align-items-center">
            <table>
            <thead>
              <tr>
                <th style={{padding: '30px'}}>CourseCode</th>
                <th style={{padding: '30px'}}>CourseName</th>
                <th style={{padding: '30px'}}>CourseID</th>
                <th style={{padding: '30px'}}>Venue</th>
                <th style={{padding: '30px'}}>Time</th>
                <th style={{padding: '30px'}}>Department</th>
                <th style={{padding: '30px'}}>Instructor</th>
                <th style={{padding: '30px'}}>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr>
                  <td style={{padding: '30px'}}><Link to={'/'}>{course.code}</Link></td>
                  <td style={{padding: '30px'}}>{course.name}</td>
                  <td style={{padding: '30px'}}>{course.id}</td>
                  <td style={{padding: '30px'}}>{course.venue}</td>
                  <td style={{padding: '30px'}}>{course.time}</td>
                  <td style={{padding: '30px'}}>{course.department}</td>
                  <td style={{padding: '30px'}}>{course.instructor}</td>
                  <td style={{padding: '30px'}}>{course.capacity}</td>
                  <td style={{padding: '30px'}}>
                    <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }}>
                      <Drop className="icon"/>
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
}


const Admin =() =>{
  return(
    <div>
      <h4>Admin</h4>
      <hr className="line"/>
      <div className="icon-container"> // show the secarh and exit icon one the right hand side
        <button>
          <Exit className="icon"/>
        </button>
        <button>
          <SearchIcon className="icon"/>
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style = {{marginRight: '10px' }}>
          <button className="admin-button" >
            <AllCourse className="option" />
          </button>
          <br></br>
          <span>All Crouse</span>
        </div>
        
        <div>
          <button className="admin-button">
            <AllUser className="option"/>
          </button>
          <br></br>
          <span>All User</span>
        </div>
      </div> 
    </div>
  )
}

const Userlist =() =>{
  const data = [
    {name: 'testuser', password:"csci3100",ID:"1234"},
  ];
  return(
    <div>
      <div className="icon-container">
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
                  <td style={{padding: '20px'}}><Link to={'/'}>{user.name}</Link></td>
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
          <button type="submit" class="btn btn-primary">modify</button>         
        </div>

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
          <button type="submit" class="btn btn-success">add</button>         
        </div>
      </div>

    </div>
  )
}

const Courslist = () =>{
  const data = [
    {name:"Software Engineering", id:"4912",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
    {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
  ];

  return(
    <div>
      <div className="icon-container">
        <button>
          <Exit className="icon"/>
        </button>
        <button>
          <SearchIcon className="icon"/>
        </button>
      </div>
      <AllCourse className="icon"/>
      <hr className="line"/>
      <h6>Courslist</h6>

      <div className="row">
        <div className="col-7">
          <table>
            <thead>
              <tr>
                <th style={{padding: '30px'}}>CourseCode</th>
                <th style={{padding: '30px'}}>CourseName</th>
                <th style={{padding: '30px'}}>CourseID</th>
                <th style={{padding: '30px'}}>Venue</th>
                <th style={{padding: '30px'}}>Time</th>
                <th style={{padding: '30px'}}>Department</th>
                <th style={{padding: '30px'}}>Instructor</th>
                <th style={{padding: '30px'}}>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr>
                  <td style={{padding: '30px'}}><Link to={'/'}>{course.code}</Link></td>
                  <td style={{padding: '30px'}}>{course.name}</td>
                  <td style={{padding: '30px'}}>{course.id}</td>
                  <td style={{padding: '30px'}}>{course.venue}</td>
                  <td style={{padding: '30px'}}>{course.time}</td>
                  <td style={{padding: '30px'}}>{course.department}</td>
                  <td style={{padding: '30px'}}>{course.instructor}</td>
                  <td style={{padding: '30px'}}>{course.capacity}</td>
                  <td style={{padding: '10px'}}>
                    <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                      <Drop className="icon"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-2">
          <form >
          <h5>Modify course Information</h5>
          <br></br>
          <label>
            Original CourseCode:
            <MDBInput type="text"/> 
          </label>
          <br></br>
          <label>
            New CourseCode:
            <MDBInput type="text"/>
          </label>
          <br></br>
          <label>
            New Venue:
            <MDBInput type="text"/>
          </label>
          <br></br>
          <label>
            New Time:
          </label>
          <br></br>
          <select>
            <option value="8:30">8:30</option>
            <option value="9:30">9:30</option>
            <option value="10:30">10:30</option>
            <option value="11:30">11:30</option>
            <option value="12:30">12:30</option>
            <option value="13:30">13:30</option>
            <option value="14:30">14:30</option>
            <option value="15:30">15:30</option>
            <option value="16:30">16:30</option>
            <option value="17:30">17:30</option>
          </select>
          <p style={{display: 'inline-block'}}> - </p>
          <select>
            <option value="9:15">9:15</option>
            <option value="10:15">10:15</option>
            <option value="11:15">11:15</option>
            <option value="12:15">12:15</option>
            <option value="13:15">13:15</option>
            <option value="14:15">14:15</option>
            <option value="15:15">15:15</option>
            <option value="16:15">16:15</option>
            <option value="17:15">17:15</option>
            <option value="18:15">18:15</option>
          </select>
          <br></br>
          <label>
            New Instructor:
            <MDBInput type="text"/>
          </label>
          <br></br>
          <label>
            New Capacity:
            <MDBInput type="text"/>
          </label>
          </form>
          <br></br>
          <button type="submit" class="btn btn-primary">modify</button>
        </div>

        <div className="col-2">
          <form >
          <h5>Add new course</h5>
          <br></br>
          <label>
            New CourseCode:
            <MDBInput type="text"/>
          </label>
          <br></br>
          <label>
            New Venue:
            <MDBInput type="text"/>
          </label>
          <br></br>
          <label>
            New Time:
          </label>
          <br></br>
          <select>
            <option value="8:30">8:30</option>
            <option value="9:30">9:30</option>
            <option value="10:30">10:30</option>
            <option value="11:30">11:30</option>
            <option value="12:30">12:30</option>
            <option value="13:30">13:30</option>
            <option value="14:30">14:30</option>
            <option value="15:30">15:30</option>
            <option value="16:30">16:30</option>
            <option value="17:30">17:30</option>
          </select>
          <p style={{display: 'inline-block'}}> - </p>
          <select>
            <option value="9:15">9:15</option>
            <option value="10:15">10:15</option>
            <option value="11:15">11:15</option>
            <option value="12:15">12:15</option>
            <option value="13:15">13:15</option>
            <option value="14:15">14:15</option>
            <option value="15:15">15:15</option>
            <option value="16:15">16:15</option>
            <option value="17:15">17:15</option>
            <option value="18:15">18:15</option>
          </select>
          <br></br>
          <label>
            New Instructor:
            <MDBInput type="text"/>
          </label>
          <br></br>
          <label>
            New Capacity:
            <MDBInput type="text"/>
          </label>
          </form>
          <br></br>
          <button type="submit" class="btn btn-success">add</button>
        </div>
      </div>
    </div>
  )
}

const Search =() =>{
  const [username, setUsername] = useState(''); 
  const [selectedValue, setSelectedValue] = useState(''); 
  const [action, setAction] = useState(''); 
  useEffect(() => {
    // This function will execute automatically
    setUsername("testuser")
    setSelectedValue("other")
    setAction("Search")
  }, []);

  function handleSelectChange(event) {
    setSelectedValue(event.target.value); // update selectedValue with the new value
  }

  const toCart= () =>{
    setAction("Cart")
  }

  const toSearch= () =>{
    setAction("Search")
  }

  

  const data = [
    {name:"Software Engineering", id:"4912",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
    {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
  ];
  return(
    <div>
      <h4>{username}</h4>  
      <div className="icon-container">
        <button>
          <Exit className="icon"/>
        </button>
        <button>
          <SearchIcon className="icon"/>
        </button>
        <button >
          <Person className="icon"/>
        </button>
        </div> 
        <hr className="line"/>


      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
          <div class="collapse navbar-collapse container d-flex justify-content-center align-items-center" id="navbarNavAltMarkup " >
            <div class="navbar-nav">
              <button style={{margin:'10px'}} type="button" class="btn btn-primary" onClick={toCart}>Course Cart </button>
              <button style={{margin:'10px'}} type="button" class="btn btn-success" onClick={toSearch}>Search </button>
            </div>
          </div>
        </nav>
        
      </div>

      {action == "Cart" &&
        <div>
          <h6 className = "container d-flex justify-content-center align-items-center">Your Course Cart</h6>
          <div className = "container d-flex justify-content-center align-items-center">
            <table>
            <thead>
              <tr>
                <th style={{padding: '20px'}}>CourseCode</th>
                <th style={{padding: '20px'}}>CourseName</th>
                <th style={{padding: '20px'}}>CourseID</th>
                <th style={{padding: '20px'}}>Venue</th>
                <th style={{padding: '20px'}}>Time</th>
                <th style={{padding: '20px'}}>Department</th>
                <th style={{padding: '20px'}}>Instructor</th>
                <th style={{padding: '20px'}}>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr>
                  <td style={{padding: '20px'}}><Link to={'/'}>{course.code}</Link></td>
                  <td style={{padding: '20px'}}>{course.name}</td>
                  <td style={{padding: '20px'}}>{course.id}</td>
                  <td style={{padding: '20px'}}>{course.venue}</td>
                  <td style={{padding: '20px'}}>{course.time}</td>
                  <td style={{padding: '20px'}}>{course.department}</td>
                  <td style={{padding: '20px'}}>{course.instructor}</td>
                  <td style={{padding: '20px'}}>{course.capacity}</td>
                  <td style={{padding: '20px'}}>
                    <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }}>
                      <Drop className="icon"/>
                    </button>
                  </td>
                  <td style={{padding: '20px'}}>
                    <input type="checkbox"></input>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
          <div className = "container d-flex justify-content-center align-items-center">
            <button className = "btn btn-dark"> Select</button>
          </div>  
        </div>
      }


      {action == "Search" && selectedValue == "other"&&
      <div className = "container d-flex justify-content-center align-items-center" >
      <div className="search" style={{ display: 'block' }}> 
        <h6 style={{ display: 'block' }}>Select Search Condition</h6>
        <select value={selectedValue} onChange={handleSelectChange}>
              <option value="other"> other </option>
              <option value="department"> department </option>
              <option value="instructor"> instructor </option>
              <option value="place"> place </option>
        </select>
        <h6 style={{ display: 'block' }}>Search by keywords...</h6>
        <label>
            <input className="search " type="type" placeholder="Search by the course's keywords..." required="required" style={{ width: '300px' }}></input>
        </label>
        <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
        <table>
          <thead>
            <tr>
              <th style={{padding: '20px'}}>CourseCode</th>
              <th style={{padding: '20px'}}>CourseName</th>
              <th style={{padding: '20px'}}>CourseID</th>
              <th style={{padding: '20px'}}>Venue</th>
              <th style={{padding: '20px'}}>Time</th>
              <th style={{padding: '20px'}}>Department</th>
              <th style={{padding: '20px'}}>Instructor</th>
              <th style={{padding: '20px'}}>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr>
                <td style={{padding: '20px'}}><Link to={'/'}>{course.code}</Link></td>
                <td style={{padding: '20px'}}>{course.name}</td>
                <td style={{padding: '20px'}}>{course.id}</td>
                <td style={{padding: '20px'}}>{course.venue}</td>
                <td style={{padding: '20px'}}>{course.time}</td>
                <td style={{padding: '20px'}}>{course.department}</td>
                <td style={{padding: '20px'}}>{course.instructor}</td>
                <td style={{padding: '20px'}}>{course.capacity}</td>
                <td style={{padding: '20px'}}>
                  <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                    <AddIcon className="icon"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


      }

      {action == "Search" && selectedValue == "department"&&
      <div className = "container d-flex justify-content-center align-items-center" >
        <div className="search" style={{ display: 'block' }}> 
          <h6 style={{ display: 'block' }}>Search by department...</h6>
          <h6 style={{ display: 'block' }}>Select Search Condition</h6>
          <select value={selectedValue} onChange={handleSelectChange}>
              <option value="other"> other </option>
              <option value="department"> department </option>
              <option value="instructor"> instructor </option>
              <option value="place"> place </option>
          </select>
          <select>
          <option value="">-- Select an option --</option>
            <option value="csci"> Computer Science </option>
            <option value="stat"> Statistics </option>
          </select>
          <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
          <table>
            <thead>
              <tr>
                <th style={{padding: '20px'}}>CourseCode</th>
                <th style={{padding: '20px'}}>CourseName</th>
                <th style={{padding: '20px'}}>CourseID</th>
                <th style={{padding: '20px'}}>Venue</th>
                <th style={{padding: '20px'}}>Time</th>
                <th style={{padding: '20px'}}>Department</th>
                <th style={{padding: '20px'}}>Instructor</th>
                <th style={{padding: '20px'}}>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr>
                  <td style={{padding: '20px'}}><Link to={'/'}>{course.code}</Link></td>
                  <td style={{padding: '20px'}}>{course.name}</td>
                  <td style={{padding: '20px'}}>{course.id}</td>
                  <td style={{padding: '20px'}}>{course.venue}</td>
                  <td style={{padding: '20px'}}>{course.time}</td>
                  <td style={{padding: '20px'}}>{course.department}</td>
                  <td style={{padding: '20px'}}>{course.instructor}</td>
                  <td style={{padding: '20px'}}>{course.capacity}</td>
                  <td style={{padding: '20px'}}>
                    <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                      <AddIcon className="icon"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }

      {action == "Search" && selectedValue == "instructor" &&
      <div className = "container d-flex justify-content-center align-items-center" >
      <div className="search" style={{ display: 'block' }}> 
        <h6 style={{ display: 'block' }}>Search by instructor...</h6>
        <h6 style={{ display: 'block' }}>Select Search Condition</h6>
        <select value={selectedValue} onChange={handleSelectChange}>
          <option value="other"> other </option>
          <option value="department"> department </option>
          <option value="instructor"> instructor </option>
          <option value="place"> place </option>
        </select>
        <select>
          <option value="">-- Select an option --</option>
          <option value="Micheal"> Micheal </option>
          <option value="Ben"> Ben </option>
        </select>
        <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
        <table>
          <thead>
            <tr>
              <th style={{padding: '20px'}}>CourseCode</th>
              <th style={{padding: '20px'}}>CourseName</th>
              <th style={{padding: '20px'}}>CourseID</th>
              <th style={{padding: '20px'}}>Venue</th>
              <th style={{padding: '20px'}}>Time</th>
              <th style={{padding: '20px'}}>Department</th>
              <th style={{padding: '20px'}}>Instructor</th>
              <th style={{padding: '20px'}}>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr>
                <td style={{padding: '20px'}}><Link to={'/'}>{course.code}</Link></td>
                <td style={{padding: '20px'}}>{course.name}</td>
                <td style={{padding: '20px'}}>{course.id}</td>
                <td style={{padding: '20px'}}>{course.venue}</td>
                <td style={{padding: '20px'}}>{course.time}</td>
                <td style={{padding: '20px'}}>{course.department}</td>
                <td style={{padding: '20px'}}>{course.instructor}</td>
                <td style={{padding: '20px'}}>{course.capacity}</td>
                <td style={{padding: '20px'}}>
                  <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                    <AddIcon className="icon"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      }

      {action == "Search" && selectedValue == "place" &&
      <div className = "container d-flex justify-content-center align-items-center" >
        <div className="search" style={{ display: 'block' }}> 
          <h6 style={{ display: 'block' }}>Search by location...</h6>
          <h6 style={{ display: 'block' }}>Select Search Condition</h6>
          <select value={selectedValue} onChange={handleSelectChange}>
              <option value="other"> other </option>
              <option value="department"> department </option>
              <option value="instructor"> instructor </option>
              <option value="place"> place </option>
          </select>
          <select>
            <option value="">-- Select an option --</option>
            <option value="Yia"> Yia </option>
            <option value="Lsk"> Lsk </option>
          </select>
          <button style={{ width: '30px', height: '30px', padding: '0px' }}> <SearchIcon style={{ width: '25px', height: '25px', padding: '0px' }}/> </button>
          <table>
            <thead>
              <tr>
                <th style={{padding: '20px'}}>CourseCode</th>
                <th style={{padding: '20px'}}>CourseName</th>
                <th style={{padding: '20px'}}>CourseID</th>
                <th style={{padding: '20px'}}>Venue</th>
                <th style={{padding: '20px'}}>Time</th>
                <th style={{padding: '20px'}}>Department</th>
                <th style={{padding: '20px'}}>Instructor</th>
                <th style={{padding: '20px'}}>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr>
                  <td style={{padding: '20px'}}><Link to={'/'}>{course.code}</Link></td>
                  <td style={{padding: '20px'}}>{course.name}</td>
                  <td style={{padding: '20px'}}>{course.id}</td>
                  <td style={{padding: '20px'}}>{course.venue}</td>
                  <td style={{padding: '20px'}}>{course.time}</td>
                  <td style={{padding: '20px'}}>{course.department}</td>
                  <td style={{padding: '20px'}}>{course.instructor}</td>
                  <td style={{padding: '20px'}}>{course.capacity}</td>
                  <td style={{padding: '20px'}}>
                    <button className="addCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} >
                      <AddIcon className="icon"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }

    </div>
    
    
  )

}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
