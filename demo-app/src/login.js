import React from 'react';
import { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import './login.css'
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import ForgotPassword from './forgetPassword';
import { set } from 'mongoose';

const Login = () => {
  const [username, setUsername] = useState(''); // State variable for username
  const [password, setPassword] = useState(''); // State variable for password
  const navigate = useNavigate();

  // Encrypt username and password using CryptoJS
  const encryptedUsername = CryptoJS.AES.encrypt(username, 'secret_default_key').toString();
  const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_default_key').toString();

  function login() {
    console.log(username)
    console.log(password)
    // Send a POST request to the backend with encrypted username and password
    fetch('http://localhost:80/login', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, 
      credentials: 'include', // Send cookies along with the request
      body: JSON.stringify({
        encryptedUsername,
        encryptedPassword
      })
    })
      .then(res => res.text())
      .then(data => {
        // Display a pop-up box with a success or error message depending on the response
        if (data === 'userVaild') {
          window.PopUpbox('Login successfully', 'Please click OK to continue', 'success', 'OK')
            .then((result) => {
              navigate("/profile") // Navigate to the profile page if the user is valid
            })
        } else if (data === 'adminVaild') {
          window.PopUpbox('Login successfully', 'Please click OK to continue', 'success', 'OK')
            .then((result) => {
              navigate("/admin") // Navigate to the admin page if the admin is valid
            })
        } else {
          window.PopUpbox('Login unsuccessfully', 'Please check carefully', 'error', 'OK') // Display an error message if the login is unsuccessful
        }
      })
  }

  function handleInputKey(event) {
    // Check if the key pressed was the "Enter" key.
    if (event.key === 'Enter') {
      // Activate the search button.
      login(); // Call the login function if the "Enter" key is pressed
    }
  }

  return (
    // Render the login page with input fields for username and password,
    // a login button, and links for registration and forgot password pages
    <div className='center'>
      <MDBContainer fluid className='p-4 center'>
        <div className='loading'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <MDBRow className='center'>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3 color-change">
              Cusis 2.0  <br />
            </h1>
            <p className='px-3 shocked' style={{ color: 'hsl(217, 10%, 50.8%)', fontSize: 20}}>
              A better course selection system
            </p>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCard className='my-5 box'>
              <MDBCardBody className='p-5 cardbody'>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor="form1">Username</label>
                    <MDBInput wrapperClass='mb-4' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={handleInputKey}/>
                    {/* Update the username state variable with the value of this input field */}
                  </MDBCol>
                </MDBRow>
                <label htmlFor="form2">Password</label>
                <MDBInput wrapperClass='mb-4' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={handleInputKey}/>
                {/* Update the password state variable with the value of this input field */}
                <button onClick={() => login()} className='btn btn-primary fw-bold py-3 px-5 rounded-pill shadow-lg'>
                  Login
                </button>
                <br></br>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    Already have an account?{' '}
                    <Link to="/register" className = "loginButton" >Register</Link>
                  </p>
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link className = "loginButton" to = "/forgetpassword">Forget Password?</Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default Login;
