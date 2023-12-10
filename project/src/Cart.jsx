import React, { useContext, useState ,useEffect} from "react";
import { AuthContext } from "./AuthContext";

function Cart(){
    const [cart, setCart] = useState({});
    useEffect(() => {
        // Retrieve cart data from sessionStorage
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCart(parsedCart);
        }
      }, []);
    const {setIsLogIn,isLogIn,loggedInUsername,setLoggedInUsername} = useContext(AuthContext);
    console.log(isLogIn)
    console.log(loggedInUsername)
    return(
        <>
        <div>
            <h2>Cart Items</h2>
      <ul>
        {Object.keys(cart).map((itemKey) => (
          <li key={itemKey}>
            Item ID: {itemKey} {/* Display cart item details here */}
          </li>
        ))}
      </ul>
        </div>
        </>
    )

}
export default Cart;