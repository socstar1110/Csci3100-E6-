import React from 'react';
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
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom";


const Login = () =>{
    const [username, setUsername] = useState(''); /* define two variable in the functional component, this value of two variable will be send to backend */
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const encryptedUsername = CryptoJS.AES.encrypt(username, 'secret_default_key').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_default_key').toString();

    function login(){
      console.log(username)
      console.log(password)
      fetch('http://localhost:80/login', {
      method: 'POST',
      model: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }, credentials: 'include', // for receive cookies
      body: JSON.stringify({
        encryptedUsername,
        encryptedPassword
      })
    })
    .then(res => res.text())
    .then(data => {
      if(data == 'userVaild'){
        window.PopUpbox('Login successfully','Please click OK to continue','success','OK')
        .then((result) => {
          navigate("/profile")
          })
      }else if(data == 'adminVaild'){
        window.PopUpbox('Login successfully','Please click OK to continue','success','OK')
        .then((result) => {
          navigate("/admin")
          })
      }else{
        window.PopUpbox('Login unsuccessfully','Please check carefully','error','OK')
      }
    })
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
              <button onClick={() =>login()} class="btn btn-primary">
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
export default Login;
