import React from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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


  export default Register;
