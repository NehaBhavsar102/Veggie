import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

function Cart(){
    const {setIsLogIn,isLogIn,loggedInUsername,setLoggedInUsername} = useContext(AuthContext);
    console.log(isLogIn)
    console.log(loggedInUsername)
    return(
        <>
        <div>
            <h1>Your are in Cart</h1>
        </div>
        </>
    )

}
export default Cart;