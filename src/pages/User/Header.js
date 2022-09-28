/*eslint-disable */
import React, { useState, useEffect } from 'react'
import api from '../../api'
import {
  Navbar,
  Container,
  Nav,

  Modal,
  ModalBody,
  ModelHeader,
  Button,
  Card
} from 'reactstrap'

import {toast} from 'react-toastify'

// import {Link} from 'react-router-dom'
import logo from './images/logo.png'
// import {Link} from 'react-router-dom'
// import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '@store/reducers/auth';
import { Dropdown } from '@components';
import styled from 'styled-components';
function Header() {

  const [User, setuser] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [UserId, setUserId] = useState(localStorage.getItem('userid'));


  // alert(UserId)



  const logOut = (event) => {
    event.preventDefault();
    setDropdownOpen(false);
    dispatch(logoutUser());

    if(localStorage.getItem("userid")){
      localStorage.removeItem("userid");
      localStorage.removeItem("usertoken");
      swal("Logout Sucessfully", "", "success");

       navigate('/login');
    }else {
       navigate('/login')
    }
  };

const SignUp =(event)=>{
 navigate('/signup')

}

const Profile =(event)=>{
  navigate('/userprofile')
 
 }

<div id="exampleModal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body">
                  <h2 className="text-center mb-4">Sign Up</h2>
                          <div className="contact-form">
                             <form id="contact" name="contact" method="post">
                                <div className="row">
                                  <div className="col-12 form-group">
                                    <input type="text" name="name" id="name" autocomplete="off" placeholder="Enter First name" required/> 
                                  </div>
                                  <div className="col-12 form-group">
                                    <input type="email" name="email" id="email" autocomplete="off" placeholder="E-mail" required/>
                                  </div>         
                                  <div className="col-12 form-group">
                                    <input  type="text" name="createpassword" id="createpassword" autocomplete="off" placeholder="Enter your create password" required/>
                                  </div>
                                  <div className="col-12 form-group"> 
                                    <input  type="text" name="confirmpassword" id="confirmpassword" autocomplete="off" placeholder="Enter your confirm password" required/>
                                  </div>
                                  <div className="col-12 form-group customcheckbox">
                                    <input type="checkbox" id="condition"/>
                                    <label for="condition">Accept  Terms & Condtions</label>
                                    <input type="checkbox" id="receive"/>
                                    <label for="receive">Yes, I’d love to receive emails with great content  And updates</label>                                    
                                  </div>                                                                    
                                </div>
                                <div className="form-group">
                                  <button id="submit" type="submit" name="submit" className="tx-ctm-btn ">Sign Up <i className="fas fa-long-arrow-alt-right"></i></button>
                                </div>
                             </form>
                             <p>You don’t have an account? <a href="#">Login</a> </p>
                          </div>
                </div>
                <button type="button" className="popup-close" data-dismiss="modal"><i className="fas fa-times"></i></button>
            </div>
        </div>
    </div>

  return (
    <>
      <header className="header-section">
        <div className='header-section'>



          <div className="header-top">
            <Navbar className='navbar navbar-expand-xl' expand="lg" style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: "999", backgroundColor: "#ffffff", boxShadow: " 0 2px 10px 0px rgba(0, 0, 0, 0.15)" }}>
              <a className="site-logo site-title" href="/"> <img src={logo} alt="site-logo" style={{ width: "100%" }} /></a>
              <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="menu-toggle"></span>
              </button>


              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul className="navbar-nav main-menu ml-auto">
                  <li><Link to={`/`}>Home</Link></li>
                  <li><Link to={`/Product`}>Product</Link></li>
                  <li><Link to={`/category`}>Category</Link></li>
                  
                  <li ><a href="/Blog">Blog</a>

                  </li>
                  <li className="/Pages"><a href="#">Pages</a>
                    <ul className="sub-menu">
                      <li><Link to={`/AboutUs`}>About</Link></li>
                      <li><Link to={`/FAQ`}>FAQ</Link></li>
                      <li><Link to={`/404`}>404</Link></li>

                      <li><Link to={`/MyAccount`}>My Account</Link></li>
                    </ul>
                  </li>
                  <li><Link to={`/Contactus`}>ContactUs</Link></li>
                </ul>
               
              </div>
              {UserId !== null && UserId !== '' ? (
                <>

<div className="cart-block">
                    <a href="/cart">
                      <i className="fas fa-shopping-basket"></i>
                      {/* <span className="count"></span> */}
                    </a>
                  </div>

                  <Link to={`/wishlist`}>
                                  <i className="far fa-heart" style={{color:"red"}}></i>
                                </Link>

                  <div className="my-account">
                    <a href="#" className="user"><i className="fas fa-user"></i></a>
                    <ul className="dropdown">
                      
                     
                    <Card >
                
                  
                <Button
                  type="button"
                  color='primary'
                 className='mb-2'
                  onClick={Profile}
                >
                  {t('My Profile')}
                </Button>
       <Button
                  type="button"
                  color='primary'
                 className='mb-2'
                  onClick={logOut}
                >
                  {t('Log Out')}
                </Button>
               
                </Card>  
                      

                    </ul>
                  </div>
                  
                            
       


               
                </>

              ) :
                <div className="my-account">
                  <a href="#" className="user"><i className="fas fa-user"></i></a>
                  <ul className="dropdown">
                 <Card >
                
                  
                    <Button
                      type="button"
                      color='primary'
                     className='mb-2'
                      onClick={SignUp}
                    >
                      {t('Sign Up')}
                    </Button>

                       <Button
                      type="button"
                      color='primary'
                     className='mb-2'
                      onClick={logOut}
                    >
                      {t('Log in')}
                    </Button>
                   
                    </Card>  

                   
                  </ul>
                </div>

              }







            </Navbar>

          </div>
        </div>


      </header>




    </>
  )
}

export default Header