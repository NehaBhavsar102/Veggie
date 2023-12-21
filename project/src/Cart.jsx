import React, {  useState ,useEffect} from "react";
import axios from "axios";

function Cart(){
    const [cart, setCart] = useState({});
    const [cartProducts,setProduct] = useState({});
    const [qty,SetQty]=useState({});
    const[totalPrice,setTotalPrice]=useState(0);
    const [cartempty,setCartEmpty]=useState();
    const [username, setUsername] = useState(""); 

    useEffect(() => {
      setUsername(sessionStorage.getItem('username') || "");
    }, []); 
    console.log("username:", username);
    useEffect(() => {
      const storedCart = sessionStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      }
    }, []);
    useEffect(() => {
      const totalPrice = sessionStorage.getItem('totalPrice');
      setTotalPrice(totalPrice);
    }, []);
    
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/backapp/carts/",
            { cart },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if(response.status==200){
            setProduct(response.data)
            sessionStorage.setItem("cartProducts", JSON.stringify(response.data));
          }else{
            alert("Cart is empty")
          }
          
          
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      fetchData();
     
    }, [cart])
    useEffect(() => {
      
      const storedCartProducts = sessionStorage.getItem("cartProducts");
      if (storedCartProducts) {
        const parsedCartProducts = JSON.parse(storedCartProducts);
        setProduct(parsedCartProducts);
      }
    }, []);
    useEffect(() => {
      let totalPrice = 0;
      const cartProducts = JSON.parse(sessionStorage.getItem("cartProducts"));
      const cart = JSON.parse(sessionStorage.getItem("cart"));
  
      if (cartProducts  && cart ) {
        for (const product of cartProducts) {
          const productId = product.id;
          let productQty=0;
          if(cart[productId]){
            productQty = cart[productId].quantity ;
          }
          
          console.log("quantity")
          //console.log(cart[productId].quantity);
          console.log(product.description);
          const stringPrice=product.description;
          const productPrice = parseFloat(stringPrice.split(" ")[1]) || 0;
          console.log(`Product ID: ${productId}, Quantity: ${productQty}, Price: ${productPrice}`);
          totalPrice += productQty * productPrice;
        }
      }
      setTotalPrice(totalPrice);
      sessionStorage.setItem("totalPrice",totalPrice);
  
    }, [cart,cartProducts]);
    
    const increaseQty =(productId)  =>{
      const updatedCartQty = { ...cart };
      updatedCartQty[productId].quantity = (updatedCartQty[productId].quantity || 0) + 1;
      
      const stringPrice = updatedCartQty[productId].description || ""; 
      const productPrice = parseFloat(stringPrice.split(" ")[1]) || 0;

      const updatedTotalPrice = updatedCartQty[productId].quantity * productPrice;
      
      console.log(updatedTotalPrice);

      sessionStorage.setItem('cart',JSON.stringify(updatedCartQty));
      const newTotal=sessionStorage.getItem('totalPrice')+updatedTotalPrice;
      sessionStorage.setItem('totalPrice',newTotal);
      setTotalPrice(totalPrice);
      setCart(updatedCartQty);

    }
    const decreaseQty =(productId) => {
      const updatedCartQty = { ...cart};
      if (updatedCartQty[productId].quantity > 1) {
        updatedCartQty[productId].quantity -= 1;
        const stringPrice = updatedCartQty[productId].description || ""; 
      const productPrice = parseFloat(stringPrice.split(" ")[1]) || 0;

      const updatedTotalPrice = updatedCartQty[productId].quantity * productPrice;
      
      console.log(updatedTotalPrice);
     
      sessionStorage.setItem('cart',JSON.stringify(updatedCartQty));
      const newTotal=sessionStorage.getItem('totalPrice')-updatedTotalPrice;
      sessionStorage.setItem('totalPrice',newTotal);
      setTotalPrice(totalPrice);
      setCart(updatedCartQty);

      } else{

      }
      sessionStorage.setItem('cart',JSON.stringify(updatedCartQty));
      setCart(updatedCartQty);
    }
    const placeOrder = async () => {
      const order=JSON.parse(sessionStorage.getItem('cart'));
      if(!sessionStorage.getItem('username') || sessionStorage.getItem('username') === ''){
          alert("Please Login before Placing order")
      }
      console.log("your order")
      console.log(order["4"].quantity)
      try{
        const response = await axios.post(
          "http://127.0.0.1:8000/backapp/placeOrder/",
          { order ,username },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
            if(response.status==200){
              window.location.href='/success'
            }
      }catch(error){
        console.error('Error fetching data:', error);
      }

    }
    const delCartPro = (productId) => {
      const updatedCart = { ...cart };
      delete updatedCart[productId];
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    };
    return( 
        <>
        <div>
            
          <ul>
            {Object.keys(cart).map((itemKey) => (
              <li key={itemKey}>
                Item ID: {itemKey} 
              </li>
            ))}
          </ul>
          <div class=" container mt-3 mb-1">
            <div class="justify-content-center">
                     <div class="col-md-10">
                      
                        <div class="card"> 
                          <div class="card-body">

                        
                        {sessionStorage.getItem('cart') === null || sessionStorage.getItem("cartProducts") === null || sessionStorage.getItem("cartProducts").length === 0 || sessionStorage.getItem("cart").length === 0 ? (
                          <h5>Cart is Empty</h5>
                        ) : (
                          <table className="col-md-9">
                          
                          
  <thead>
    <tr>
      <th><h5>Product Name</h5></th>
      <th><h5>Price</h5></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {JSON.parse(sessionStorage.getItem("cartProducts")).length === 0 && (
      <tr>
        <td colSpan="3">Cart is Empty</td>
      </tr>
    )}
    {JSON.parse(sessionStorage.getItem("cartProducts")) && JSON.parse(sessionStorage.getItem("cartProducts")).map((product) => (
      
      <tr key={product.id}>
        
        <td>{product.title}</td>
        
        <td>{product.description}</td>
        
        <td colSpan={3}>
        <div class=" d-flex justify-content-center align-items-center">
          <button class="btn btn-outline-dark btn-md mx-2" 
          onClick={() => { increaseQty(product.id);}}
         >+</button>
          {JSON.parse(sessionStorage.getItem('cart'))?.[product.id]?.quantity || 0}
          <button class="btn btn-outline-dark btn-md mx-2"
          onClick={() => { decreaseQty(product.id);}}>-</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"  onClick={() => delCartPro(product.id)}>
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </div>
          
        </td>
        <br/><br />
      </tr>
      
    ))}
   
   
  </tbody>
  
                        
        <tfoot>
          <tr><hr></hr></tr>
          <tr>
            <td colSpan="8"><b>Total:</b></td>
            <td><h5><b>Rs. {sessionStorage.getItem('totalPrice')} /-</b></h5></td>
          </tr>
        </tfoot>
    </table>

                          
                          
    )}
   <div className="container mt-2 mb-1">
  <div className="row">
    <div className="col text-end">
      
      {JSON.parse(sessionStorage.getItem("cartProducts"))?.length !== 0 && (
        <div>
          <button className="btn btn-light btn-block">Cancel</button>&nbsp;
          <button className="btn btn-success btn-block" onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  </div>
</div>

    
  
    
    
      </div>
      
    </div>
    
    
  </div>
  

</div>
</div>

</div>
</>
    )

}
export default Cart;