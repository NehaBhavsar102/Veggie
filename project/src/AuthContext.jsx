// AuthContext.js
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  return (
    <AuthContext.Provider value={{ isLogIn, setIsLogIn,loggedInUsername,setLoggedInUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
