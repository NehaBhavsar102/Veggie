
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card, Button } from 'react-bootstrap';
const ComboCards = () => {
    const comboData = [
        {
          id: 1,
          imageUrl: 'https://www.bigbasket.com/media/uploads/p/l/40005761_8-fresho-fruit-basket-big.jpg',
          title: 'Fresho Fruit Premium Salad',
          description: 'Size: 200 gm<br />Price: Rs 50<br />Contents: Banana,Apple,Orange,Papaya',
        },
        {
            id:2,
            imageUrl: 'https://www.orgpick.com/cdn/shop/products/vegetables-box.jpg?v=1541021440',
            title: 'Fresho Daily Vegetables',
            description: 'Size: 600 gm<br />Price: Rs 150<br />Contents: Customized Delivery',

        },
        {
            id:3,
            imageUrl: 'data:image/jpeg;base64,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',
            title : 'Organic Mix Veg Combo',
            description: 'Size: 600 gm<br />Price: Rs 150<br />Contents: Customized Delivery',
        },
        {
            id:4,
            imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/products/sliding_image/504097a.jpg?ts=1689328470',
            title: 'Recipe Combo',
            description: 'Size: Customized <br />Price: Rs 300<br />Contents: Customized Delivery'
        },
        
      ];
  return(
    <>
    <div className="container mt-4">
    <div>
        <br></br><br></br>
      <h2>Veggie's Combo Basket</h2>
      </div>
    </div>

    
    <div className="container mt-4 bg-light">
     <br></br><br></br>
     
      <div className="container mt-4 ">
        <div class="row">
       
        
        
        {comboData.map((card) => (
          <div key={card.id} className="col-md-6 mb-7">
            <Card style={{ border: 'none' }}>
              <div className="d-flex">
                <Card.Img variant="top" src={card.imageUrl} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title><h5>{card.title}</h5></Card.Title>
                  <Card.Text dangerouslySetInnerHTML={{ __html: card.description }} />
                </Card.Body>
               
              </div>
             
                  
                
            </Card>
          </div>
        ))}
      
        </div>
        </div>
        <br></br><br></br>
      </div>
      
    </>
  );
};

export default ComboCards;
