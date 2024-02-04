  import axios from 'axios';
  import React, { useState, useEffect } from 'react';

  function ViewOrder() {
    const [username, setUsername] = useState("");
    const [overall, setOverallOrder] = useState([]);

    useEffect(async () => {
      const username = sessionStorage.getItem('username');
      setUsername(username || "");

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/backapp/viewOrder/",
          { username },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          setOverallOrder(response.data);
        }
      } catch (e) {
        console.error("something went wrong");
      }
    }, []);
    
    const total = (quantity, price) => {
      const qty = parseInt(quantity);
      const cost = parseFloat(price.replace(/[^\d.]/g, '')); 
      const totalPrice = qty * cost;
      return `Rs. ${totalPrice.toFixed(2)}`; 
    };

    const myorders = () => {
      return overall.map((order, index) => (
        <tr key={index}>
          <td>{order.title}</td>
          <td>{order.quantity}</td>
          <td>{total(order.quantity,order.description)}</td>
          <td>{order.orderDate}</td>
          <td><button class="btn btn-light">Delete</button></td>
        </tr>
      ));
    };
    

    return (
      <div className="container d-flex justify-content-center mt-5">
        <div className="col-md-8">
          <h1 className="text-center"> Current Orders </h1>
          <br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Order Date</th>  
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{myorders()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  export default ViewOrder;
