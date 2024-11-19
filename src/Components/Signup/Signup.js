import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')

  console.log('signup is working');
  
  const handlSubmit =(e)=>{
    e.preventDefault()

  }
  return (
    <div className="signupContainer">
      <div className="signupParentDiv">
        <img width="150px" height="150px" src={Logo} alt="icon" className="logoImage" />
        <form onSubmit={handlSubmit}>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              type="text"
              id="username"
              name="name"
              placeholder="Enter your username"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              onChange={(e)=> setEmail(e.target.value)}
              type="email"
              value={email}
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="phone">Phone</label>
            <input
            onChange={(e)=> setPhone(e.target.value)}
              className="input"
              type="tel"
              id="phone"
              value={phone}
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
            onChange={(e)=> setPassword(e.target.value)}
              className="input"
              type="password"
              value={password}
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
