import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


import Home from './Pages/Home';
import Signup from './Components/Signup/Signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/'  element={<Home />}/>
          <Route path='/signup' element={<Signup />}/>
            
        </Routes>

      </Router>
    </div>
  );
}

export default App;
