
import React , {useContext,useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card, Button } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import axios from "axios";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNDA5MjU4LCJpYXQiOjE3MDIxMTMyNTgsImp0aSI6IjYyOTI0YThhNGQ0OTRjM2ZiMmIxM2FiZjMyNDQ0YTRiIiwidXNlcl9pZCI6M30.aovXm0lgY7eYQDQSvf8FQ0_IVVGY_kCluCVOFuqIIlg';
const HomeCards = () => {
  const [cardData, setProduct] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/backapp/products', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProduct(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  
  const buyNow = () => {
   if(sessionStorage.getItem('user')){
    window.location.href='/cart';
   }else{
    alert("Please Login/SignUp before you Buy");
   
    
   }
   
  };
  const [cart, setCart] = useState(() => {
    const existingCart = sessionStorage.getItem('cart');
    return existingCart ? JSON.parse(existingCart) : {};
  });
  const addToCart = (id) => {
   
    const updatedCart = { ...cart, [id]: true };
    setCart(updatedCart);

    
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const renderCards = (start) => {
    
    const cards = [];
    const img_folder="backend/product_images"
    
    for (let i = start; i < start + 4; i++) {
      const card = cardData[i];
      
      
      if (card) {
       const img_folder='images/'
       const img_path = `${img_folder}/${card.image_url}`;
        cards.push(
          <Card key={card.id} style={{ width: '15rem'}}>
            <Card.Img variant="top" src={img_path} alt="product" style={{width: '170px',height:'170px'}} />
            <hr />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
             
              <div className="d-flex justify-content-between">
                {cart[card.id]=='Added' ? (
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                     <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                 </svg>
                  </>

                ) : (
                  <>
                  </>
                )}
              <button
                class="btn btn-outline-success btn-sm-3"
                onClick={() => {
                  addToCart(card.id);
                }}
                disabled={cart[card.id]} 
              >
                {cart[card.id] ? 'Added' : 'Add to Cart'}
              </button>
              {cart[card.id]=='Added' ? (
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                     <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                 </svg>
                  </>

                ) : (
                  <>
                  </>
                )}
                  <button className="btn btn-success btn-sm-3" onClick= {buyNow}>Buy Now</button>
                  
                </div>
            </Card.Body>
          </Card>
        );
      }
    }
    return cards;
  };
  return (
    <>
    <div className="container mt-4">
    <div>
        <br></br><br></br>
      <h2>Smart Basket</h2>
      </div>
    </div>
    <div className= "container mt-4 bg-light">
      
      <br></br> <br></br>
    
      <Carousel>     
      <Carousel.Item>
        <div className="d-flex justify-content-around">
          {renderCards(0)}
        </div>
       
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex justify-content-around">
          {renderCards(4)}
        </div>
      
      </Carousel.Item>
      
    </Carousel>
    <br></br>
      </div>
      </>
    
  );
};

export default HomeCards;
