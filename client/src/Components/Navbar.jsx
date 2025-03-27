import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import evently from "../assets/evently-logo.png";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // Import the provider
import axios from "axios";

const Navbar = () => {
  const clientId = '412421812169-vs1jao677pkgf7fhf90pgacqk4tk9idv.apps.googleusercontent.com';
  const [modal2, setModal2] = useState(false);

  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  const handleLoginSuccess = async (response) => {
    try {
      const token = response.tokenId;
      const res = await axios.post('http://localhost:3001/evently/login', { token });
      console.log(res.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}> {/* Wrap your component with the provider */}
      <div>
        <div className='main-nav'>
          <img src={evently} alt="" className='evently-logo' />
          <div className='second-nav'>
            <button className='join-evently-btn' onClick={toggleModal2}>Join Evently</button>
            <button className='sign-in-btn'>Sign in</button>
          </div>
        </div>
        {modal2 && (
          <div className="modal2">
            <div onClick={toggleModal2} className="overlay1"></div>
            <div className="modal2-content">
              <p className='page5-signup'>Signup</p>
              <p className='page5-signin-tag'>Already have an account? <Link>Sign in</Link></p>
              <input type="email" className='text-input' placeholder='Enter your email' />
              <hr className='hr-2' />
              <center>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Login"
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                  onSuccess={handleLoginSuccess}
                  onFailure={handleLoginFailure}
                />
                <p className='terms-conditions'>This site is protected by Google <span className='go-green'> Privacy Policy</span> and <span className='go-green'>Terms of Service</span>  apply.</p>
              </center>
            </div>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
