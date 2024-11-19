import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


import Home from './Pages/Home';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/'  element={<Home />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
            
        </Routes>

      </Router>
    </div>
  );
}

export default App;
