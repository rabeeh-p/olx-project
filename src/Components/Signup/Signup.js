import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const naviagte= useNavigate()
  
  const handlSubmit = (e) => {
    e.preventDefault();
  
    // Input validation
    if (!email || !password) {
      console.error('Please fill in all fields');
      return; // Stop the form submission
    }
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update user profile with username
        updateProfile(result.user, { displayName: username })
          .then(() => {
            console.log('User profile updated successfully');
            naviagte('/login')
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
          });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };
  

  return (
    <div className="signupContainer">
      <div className="signupParentDiv">
        <img width="150px" height="150px" src={Logo} alt="icon" className="logoImage" />
        <form onSubmit={handlSubmit}>
          {/* <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="name"
              placeholder="Enter your username"
            />
          </div> */}
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          {/* <div className="formGroup">
            <label htmlFor="phone">Phone</label>
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div> */}
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <div className="loginRedirect">
          <span>Already have an account? </span>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
