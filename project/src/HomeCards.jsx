
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
                  <button className="btn btn-outline-success btn-sm-3">Add to Cart</button>
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