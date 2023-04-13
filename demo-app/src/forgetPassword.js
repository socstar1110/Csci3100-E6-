import { useState } from 'react';
import './forgotpassword.css';
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [sid, setSid] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState();
    const [isPassWordUpdated, setPassWordUpdated] = useState(false);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSidChange = (event) => {
        setSid(event.target.value);
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setPassWordUpdated(false);
        setNewPassword(password);

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

    const handleVerify = async (event) => {
        setIsVerified(false);
        event.preventDefault();

        try {
            const res = await fetch('http://localhost:80/checkingprocess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    username: username,
                    sid: sid
                }),
            })

            const data = await res.json()
            console.log(data)

            if (data.length) {
                setIsVerified(true);
                console.log("isVerified set to true");
            } else {
                setIsVerified(false);
                window.PopUpbox('No Match', 'Incorrect Username or Student ID. Please enter again', 'error', 'OK');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        setPassWordUpdated(false);
        try {
            const res2 = await fetch('http://localhost:80/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    username: username,
                    sid: sid,
                    password: newPassword
                }),
            })
            console.log(res2);
            const data = await res2.json()
            
            if(data.length){
                window.PopUpbox('Change Password Successfully', 'You will be redirected to the login page after 3 seconds', 'success', 'OK');
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000';
                  }, 3000);
            }
            else{
                window.PopUpbox('Password cannot be changed', 'Please enter the password again', 'error', 'OK');
            }
        }
        catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form-container">
                <h2 className="forgot-password-form-title">Forgot Password</h2>
                {!isVerified && !isPassWordUpdated && (
                    <form onSubmit={handleVerify}>
                        <div className="form-group">
                            <label htmlFor="username">Original Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sid">Original Student ID</label>
                            <input
                                type="text"
                                id="sid"
                                className="form-control"
                                value={sid}
                                onChange={handleSidChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Verify
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Back to{' '}
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
                        {message && <p className="forgot-password-message">{message}</p>}
                    </form>
                )}

                {isVerified && !isPassWordUpdated && (
                    <form>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                className="form-control"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Reset Password
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Back to{' '}
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
                    </form>
                )}



            </div>
        </div>
    );
};

export default ForgotPassword;