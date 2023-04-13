import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBProgress,
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { Link } from 'react-router-dom'
import './register.css'
import CryptoJS from 'crypto-js'

const Register = () => {
  const [username, setUsername] = useState('');
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [password, setPassword] = useState('');
  const [sid, setSid] = useState('');
  const [isSidUnique, setIsSidUnique] = useState(true);
  const [sex, setSex] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const faculties = [
    "Faculty of Arts",
    "Faculty of Business Administration",
    "Faculty of Education",
    "Faculty of Engineering",
    "Faculty of Law",
    "Faculty of Medicine",
    "Faculty of Science",
    "Faculty of Social Science"
  ];
  const [countryCode, setCountryCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    setPhone("");
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (username === "" || password === "" || sid === "" || sex === "" || department === "" || email === "" || phone === "" || isUsernameUnique === false || isSidUnique === false) {
      window.PopUpbox('At least one entries are empty/ wrong', 'Please check all entries again', 'error', 'OK')
      return;
    }

    const encryptedUsername = CryptoJS.AES.encrypt(username, 'secret_default_key').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_default_key').toString();

    e.preventDefault();
    try {
      const res = await fetch('http://localhost:80/registeringuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: encryptedUsername,
          password: encryptedPassword,
          sid: sid,
          sex: sex,
          department: department,
          email: email,
          phone: phone,
        }),
      });
      const data = await res.json()
      window.PopUpbox('The registration complete', 'You will be redirected to the login page after 3 seconds', 'success', 'OK');

      setTimeout(() => {
        window.location.href = 'http://localhost:3000';
      }, 3000);

    } catch {
      console.log("error")
    }

  };

  const handleUserNameChange = async (e) => {
    setUsername('');
    setIsUsernameUnique(true);
    setUsername(e.target.value);

    // Check if the username is unique
    try {
      const res = await fetch('http://localhost:80/checkusername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: e.target.value }),
      });
      const data = await res.json()
      if (data.length === 1) {
        console.log("duplicated")
        setIsUsernameUnique(false);
        //window.PopUpbox('Username is duplicated', 'Please enter another username', 'error', 'OK')
      }
      else {
        console.log("no duplicated")
      }

    } catch (err) {
      console.log("error")
    }
  };

  const handleSIDChange = async (e) => {
    setSid('');
    setIsSidUnique(true);
    setSid(e.target.value);

    // Check if the username is unique
    try {
      const res = await fetch('http://localhost:80/checkusersid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Sid: e.target.value }),
      });
      const data = await res.json()
      if (data.length === 1) {
        console.log(data)
        console.log("duplicated")
        setIsSidUnique(false);
        //window.PopUpbox('Username is duplicated', 'Please enter another username', 'error', 'OK')
      }
      else {
        console.log("no duplicated")
      }

    } catch (err) {
      console.log("error")
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) {
      strength = 100;
    } else if (password.length >= 6) {
      strength = 50;
    } else if (password.length > 0) {
      strength = 25;
    }
    setPasswordStrength(strength);
  };

  const [emailError, setEmailError] = useState("");

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(email))
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email === "" || isEmailValid(email)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format");
    }
  };

  function handleInputKey(event) {
    event.preventDefault();
    // Check if the key pressed was the "Enter" key.
    if (event.key === 'Enter') {
      // Activate the search button.
      handleSubmit(event);
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: '1rem', maxWidth: '500px' }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Register</h2>

              <div className="mb-4">
                <label htmlFor="username">Username</label>
                <MDBInput
                  id="username"
                  size="lg"
                  type="text"
                  value={username}
                  onChange={handleUserNameChange}
                  onKeyUp={handleInputKey}
                />
                {!isUsernameUnique && (
                  <p style={{ color: "red" }}>Username has been used. Please enter another username.</p>
                )}
              </div>

              <div className="mb-4" style={{
                borderColor:
                  passwordStrength === 100
                    ? '#00C851'
                    : passwordStrength >= 50
                      ? '#FF8800'
                      : '#9e9e9e'
              }}>
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <MDBInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    size="lg"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{
                      borderColor:
                        passwordStrength === 100
                          ? '#00C851'
                          : passwordStrength >= 50
                            ? '#FF8800'
                            : '#9e9e9e'
                    }}
                  />
                  <button
                    className="password-toggle"
                    onClick={toggleShowPassword}
                    type="button"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {passwordStrength > 0 && (
                  <div className="password-strength">
                    <p className="text-center mb-0">
                      The strength of password is <span style={{
                        color:
                          passwordStrength === 100
                            ? '#00C851'
                            : passwordStrength >= 50
                              ? '#FF8800'
                              : '#FF4444'
                      }}>
                        {passwordStrength === 100 ? 'Strong' : passwordStrength >= 50 ? 'Medium' : 'Weak'}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="sid">Student ID</label>
                <MDBInput
                  id="sid"
                  size="lg"
                  type="text"
                  value={sid}
                  onChange={handleSIDChange}
                  onKeyUp={handleInputKey}
                />
                {!isSidUnique && (
                  <p style={{ color: "red" }}>Student ID has been used. Please enter another username.</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="sex">Sex</label>
                <select
                  id="sex"
                  className="form-control form-control-lg"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  onKeyDown={handleInputKey}
                >
                  <option value="">Select sex...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not-disclosed">Not Disclosed</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="department">Faculty</label>
                <select
                  id="department"
                  className="form-control form-control-lg"
                  value={department}
                  onChange={handleDepartmentChange}
                  onKeyDown={handleInputKey}
                >
                  <option value="">Choose a faculty</option>
                  {faculties.map((faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <MDBInput
                  id="email"
                  size="lg"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  handleInputKey
                  className={emailError && "invalid-input"} // add the invalid-input class if there is an email error
                />
                {emailError == "Invalid email format" && (
                  <p style={{ color: "red" }}>It is not a vaild email. Please enter a correct email.</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone">Phone</label>
                <div className="d-flex align-items-center">
                  <select
                    id="countryCode"
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    style={{ padding: "0.25rem", fontSize: "0.875rem" }}
                    onKeyDown={handleInputKey}
                  >
                    <option value="">Select a country code</option>
                    <option value="+852">+852 (Hong Kong)</option>
                    <option value="+86">+86 (China)</option>
                  </select>
                  {countryCode === "+852" && (
                    <MDBInput
                      id="phone"
                      size="lg"
                      type="text"
                      value={phone}
                      maxLength={8}
                      onChange={handlePhoneChange}
                      onKeyUp={handleInputKey}
                    />
                  )}
                  {countryCode === "+86" && (
                    <MDBInput
                      id="phone"
                      size="lg"
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                      onKeyUp={handleInputKey}
                    />
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center mt-5">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg fw-bold"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  Already have an account?{' '}
                  <Link to="/" style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    background: 'linear-gradient(to right, #1cb5e0, #000851)',
                    color: '#fff',
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.3)',
                    textDecoration: 'none',
                    transition: 'background 0.3s ease',
                  }}
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;