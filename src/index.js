import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {FirebaseContext} from './store/FirebaseContext'
import  { auth } from './firebase/config'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{auth}}>
     <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);


reportWebVitals();
