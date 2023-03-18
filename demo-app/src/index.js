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
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as Search } from './icon/search.svg';
import { ReactComponent as Person } from './icon/person-circle.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AllCrouse } from './icon/open-book-study-svgrepo-com.svg';
import { ReactComponent as AllUser } from './icon/user.svg';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/userlist" element={<Userlist/>}/>
        <Route path="/crouselist" element={<Crouselist/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const Login = () =>{
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit =()=>{
    window.alert(password)
  }

  return( // whre the value of the box is changed will updata the username and passowrd  
  <div>
    <MDBContainer fluid className='p-4'>
    <MDBRow>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
          Cusis 2.0  <br />
        </h1>

        <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          A better crouse selection system
        </p>

      </MDBCol>
      <MDBCol md='6'>
        <MDBCard className='my-5'>
          <MDBCardBody className='p-5'>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='User name' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
              </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSubmit} class="btn btn-primary">Login</button>
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
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSubmit =()=>{
    window.alert(password)
  }
  return ( // log in form and some style by bootstrap
  <MDBContainer fluid> 
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            <h2 className="fw-bold mb-2 text-center">Register</h2>
            

            <MDBInput wrapperClass='mb-4 w-100' label='Username' id='username' size="lg" type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <MDBInput wrapperClass='mb-4 w-100' label='Password' id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={handleSubmit} class="btn btn-primary">Register</button>
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
  useEffect(() => {
    // This function will execute automatically
    setUsername("testuser")
  }, []);
  const test = () =>{
    window.alert('testing')
  }
  const data = [
    {name: 'Csci3100'},
    {name: 'Csci2100'},
    {name: 'Csci2720'},
  ];

  return(
    <div>
      <h4>{username}</h4>
      <div className="icon-container">
        <button onClick={test}>
          <Exit className="icon"/>
        </button>
        <button onClick={test} >
          <Search className="icon"/>
        </button>
        <button onClick={test} >
          <Person className="icon"/>
        </button>
      </div>
      <hr className="line"/>
      <h6>View my crouse</h6>
      <table>
        <thead>
          <tr>
            <th>Crouse</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crouse) => (
            <tr>
              <td><Link to={'/'}>{crouse.name}</Link></td>
              <td>
                <button onClick={test} style={{ width: '40px', height: '40px', padding: '0px' }} >
                  <Drop className="icon"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


const Admin =() =>{
  return(
    <div>
      <h4>Admin</h4>
      <hr className="line"/>
      <div className="icon-container">
        <button>
          <Exit className="icon"/>
        </button>
        <button>
          <Search className="icon"/>
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style = {{marginRight: '10px' }}>
          <button className="admin-button" >
            <AllCrouse className="option" />
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
    {name: 'testuser', Id:"1234"},
  ];
  return(
    <div>
      <div className="icon-container">
        <button>
          <Exit className="icon"/>
        </button>
        <button>
          <Search className="icon"/>
        </button>
      </div>
      <AllUser className="icon"/>
      <hr className="line"/>
      <h6>Userlist</h6>

      <div className="row">
        <div className="col-8">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>UserId</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr>
                  <td><Link to={'/'}>{user.name}</Link></td>
                  <td>{user.Id}</td>
                  <td>
                    <button style={{ width: '40px', height: '40px', padding: '0px' }} >
                      <Drop className="icon"/>
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-4">
          <form >
          <h5>Modify user Information</h5>
          <br></br>
          <label>
            Original UserId:
            <input type="text"/> 
          </label>
          <br></br>
          <label>
            New UserId:
            <input type="text"/>
          </label>
          <br></br>
          <label>
            New Username:
            <input type="text"/>
          </label>
          <br></br>
          <button type="submit">modify</button>
          </form>
        </div>
      </div>

    </div>
  )
}

const Crouselist = () =>{
  const data = [
    {code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15"},
  ];

  return(
    <div>
      <div className="icon-container">
        <button>
          <Exit className="icon"/>
        </button>
        <button>
          <Search className="icon"/>
        </button>
      </div>
      <AllCrouse className="icon"/>
      <hr className="line"/>
      <h6>Crouselist</h6>

      <div className="row">
        <div className="col-8">
          <table>
            <thead>
              <tr>
                <th>Crouse Code</th>
                <th>Venue</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((crouse) => (
                <tr>
                  <td><Link to={'/'}>{crouse.code}</Link></td>
                  <td>{crouse.venue}</td>
                  <td>{crouse.time}</td>
                  <td>
                    <button style={{ width: '40px', height: '40px', padding: '0px' }} >
                      <Drop className="icon"/>
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-4">
          <form >
          <h5>Modify crouse Information</h5>
          <br></br>
          <label>
            Original Crouse Code:
            <input type="text"/> 
          </label>
          <br></br>
          <label>
            New Crouse Code:
            <input type="text"/>
          </label>
          <br></br>
          <label>
            New Venue:
            <input type="text"/>
          </label>
          <br></br>
          <label>
            New Time:
            <input type="text"/>
          </label>
          <br></br>
          <button type="submit">modify</button>
          </form>
        </div>
      </div>

    </div>
  )
}






const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
