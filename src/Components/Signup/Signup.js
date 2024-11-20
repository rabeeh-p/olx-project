import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const naviagte= useNavigate()
  
  const handlSubmit = (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      console.error('Please fill in all fields');
      return; 
    }
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
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
