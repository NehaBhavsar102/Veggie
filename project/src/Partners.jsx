import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card, Button } from 'react-bootstrap';
import './Partners.css'
const Partners = () => {
    return(
        <>
         <div className="container mt-4 ">
            <h2>Our Indian Farmers</h2>
            <div className="quote-container">
        <p className="quote-text">
          "A farmer is a magician who produces money from the mud. If the farmer is rich, then so is the nation. To a farmer, dirt is not a waste, it is wealth."
        </p>
      </div>
        </div>
         <div className="container mt-4 ">
        <div class="row">
        <div class="col-sm-4">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">Rajkumari Devi</h5>
                <p class="card-text">She is fondly referred to as ‘Kisan Chachi’, which translates to ‘Farmer Aunty’.

Hailing from the small village of Anandpur, in Saraiya block of Muzaffarpur, this farmer cycles through different villages while giving people tips on kitchen farming. She mobilises women to form self-help groups and become financially independent through farming and small scale businesses.</p>
               
            </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">Babulal Dahiya</h5>
                <p class="card-text">The 72 year old Padma Shri Awardee organic farmer grows over 200 traditional varieties of rice crop (collected since 2005) on two-acres, the remaining six acres on his farm have more than 100 varieties of pulses, grains, and vegetables.From the Kargi rice variety to the kalawati, he started collecting and preserving rice varieties mentioned in the folktales and songs from farmers across India.</p>
               
            </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">Vallabhbhai  Marvaniya
</h5>
                <p class="card-text">Vallabhbhai Vasrambhai Marvaniya from Gujarat’s Junagarh was the first to introduce carrots to the palate of Gujaratis, because until 1943, locals did not consider carrots suitable for human consumption.

Vallabhbhai was 13-years-old then. He started by 5-acre farm where pulses, grains, and groundnuts were grown, while and maize, jowar, rajko, and carrots were cultivated as cattle feed.</p>
               
            </div>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}
export default Partners;