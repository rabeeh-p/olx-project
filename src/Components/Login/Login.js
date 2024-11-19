import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; 

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { auth } = useContext(FirebaseContext);
  const naviagte = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      naviagte('/')
    } catch (error) {
      console.error('Error signing in:', error.message);
      alert(error.message);
    }
  };
  return (

    <div>
      <div className="loginParentDiv">
        <img width="150px" height="150px" src={Logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
          onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
  
}

export default Login;
