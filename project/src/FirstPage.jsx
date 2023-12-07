import React, { useState } from "react";
import Navbar from './Navbar';
import HomeCards from './HomeCards';
import Home from './Home';
import Partners from './Partners';
import ComboCards from './ComboCards';
import { AuthProvider } from './AuthContext';
function FirstPage(){
    return(
        <div>
            
      <AuthProvider>
      <Navbar />
      <HomeCards />
      </AuthProvider>
            
            
      
    
   
            
            <Partners />
            <ComboCards />
            <Home />
        </div>
    )

}
export default FirstPage