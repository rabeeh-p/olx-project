

import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config'; 

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user); 
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, currentUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
