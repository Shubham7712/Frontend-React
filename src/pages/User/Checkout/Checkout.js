/*eslint-disable */
import React, {useState, useEffect} from 'react';
import '../App.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';
import {useHistory, Link} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import product1 from '../images/products/product-1.png';
import product2 from '../images/products/product-2.png';
import product3 from '../images/products/product-3.png';
import product4 from '../images/products/product-4.jpg';
import blogimage from '../images/blog/1.jpg';
import blogimage1 from '../images/blog/2.jpg';
import blogimage2 from '../images/blog/3.jpg';
import blogimage3 from '../images/blog/4.jpg';
import leftbanner from '../images/left-banner.png';
import person1 from '../images/person1.jpg';
import person2 from '../images/person2.jpg';







function Checkout() {

   const [price,setPrice] = useState(150);
   const [qty,setQty] =useState(1);

    
  




  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Checkout</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/User/Home">Home</Link> / <Link to="/User"> Pages</Link>
              <b style={{color: '#2867E5', fontSize: '18px'}}>/ Checkout</b>
            </ul>
          </div>
        </div>
      </section>
      <section className="checkout section-padding">
        <div className="container">
          <div className="row justify-content-between"> 
            <div className="col-12">  
              <div className="section-header">
                <h2 className="section-title">Billing Detail</h2>
              </div> 
              <div className="row">
                <div className="col-md-7 col-12">                
                  <div className="contact-form">
                    <form id="contact" name="contact" method="post">
                      <div className="row">
                        <div className="col-6 form-group">
                          <label>First Name</label>
                          <input type="text" name="name" id="name" autoComplete="off" required /> 
                        </div>
                        <div className="col-6 form-group">
                          <label>Last Name</label>
                          <input type="text" name="lastname" id="lastname" autoComplete="off" required /> 
                        </div>
                        <div className="col-12 form-group"> 
                          <label>Company  Name (Optional) </label>
                          <input type="text" name="companyname" id="companyname" autoComplete="off" required /> 
                        </div>
                        <div className="col-12 form-group"> 
                          <label>Country</label>
                          <select>
                            <option>bangladesh</option>
                            <option>Malesiya</option>
                            <option>India</option>
                          </select> 
                        </div>
                        <div className="col-12 form-group"> 
                          <label>Street Address</label>
                          <input type="text" name="address" id="address" autoComplete="off" required />
                        </div>   
                        <div className="col-12 form-group"> 
                          <label>Town / City</label>
                          <input type="text" name="city" id="city" autoComplete="off" required />
                        </div> 
                        <div className="col-12 form-group"> 
                          <label>State</label>
                          <input type="text" name="state" id="state" autoComplete="off" required />
                        </div>                                   
                        <div className="col-12 form-group">
                          <label>Phone Number</label> 
                          <input type="text" name="number" id="number" autoComplete="off" required />
                        </div>
                        <div className="col-12 form-group">
                          <label>Email Address</label> 
                          <input type="email" name="email" id="email" autoComplete="off" />
                        </div>
                        <div className="col-12 form-group">
                          <label>Order Notes</label> 
                          <textarea name="message" id="message" autoComplete="off" required defaultValue={""} />
                        </div>                                                                    
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="order-totals">
                    <ul className="mb-3">
                      <li>Product <span className="price">Price</span></li>
                    </ul>
                    <hr />     
                    <ul className="mb-3">
                      <li>Sed mollis efficitur X 1<span className="price">$120</span></li>
                    </ul>
                    <hr />                                                         
                    <ul className="mb-3">
                      <li>Shipping <span className="price">$20</span></li> 
                      <li><h5>Sub Total <span className="price">$220</span></h5></li>
                    </ul>
                    <hr />
                    <h3 className="title">Order Total: $240</h3>
                  </div>
                  <div className="order-totals bottom">
                    <ul className="mb-3">                                  
                      <li>
                        <label className="paymentmethod">Cash On Delivery
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                      </li>
                      <li>
                        <label className="paymentmethod">Cheque Payments
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>                        
                      </li>
                      <li>
                        <label className="paymentmethod">Direct Bank Transfer
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>                             
                      </li>
                    </ul>
                    <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purpo ses described in our privacy policy.</p>
                    <a href="#" className="tx-ctm-btn mt-4">Place Order <i className="fas fa-long-arrow-alt-right" /></a>
                  </div>                          
                </div>                                           
              </div>                    
            </div>                              
          </div>
        </div>      
      </section>
      <Footer />
    </>
  );
}

export default  Checkout;
