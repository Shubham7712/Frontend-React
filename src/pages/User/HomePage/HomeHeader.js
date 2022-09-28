/*eslint-disable */
import React from 'react'
import{
    Navbar,
    Container,
    Nav
}from 'react-bootstrap'
// import {Link} from 'react-router-dom'
 import logo from  '../images/logo.png'
function Header() {
  return (
    <>
<header class="header-section">
        <div className='header-section'>
            {/* <div className='header-banner'>
                <div className='row justify-content-between'>
                    <div className='col-sm-6 col-12'>
                        <div className="shipping-order">
                            <i className="fas fa-tags"></i> 
                            <span> Free shipping on your first order.</span>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="phone">
                            <i className="fas fa-phone-alt"></i>
                            <span><a href="+91000123455"> +91 000 123 455</a></span>
                        </div>
                    </div>
                </div>
            </div> */}


            <div class="header-top">
                <Navbar class='navbar navbar-expand-xl' expand="lg" style={{position:'fixed', top:'0', left:'0', width:'100%', zIndex: "999", backgroundColor: "#ffffff",boxShadow:" 0 2px 10px 0px rgba(0, 0, 0, 0.15)"}}>
               

               
                   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav class="collapse navbar-collapse me-auto">
                       
                        <ul className='navbar-nav main-menu mr-auto d-inline-flex'>
                            <li>
                                <a href='/User/Home'> Home </a>
                                
                            </li>

                            <li>
                                <a href="/User/Product">Product</a>
                            </li>   
                            <li className="menu_has_children"><a href="/User/Category">Category</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/User/Category">Category</a>
                                    </li>
                                    <li>
                                        <a href="category-right">Category Right</a>
                                    </li>
                                    <li>
                                        <a href="checkout">Checkout</a>
                                    </li>
                                    <li>
                                        <a href="/User/Order">Order</a>
                                    </li>
                                    <li>
                                        <a href="/User/ProductDetails">Product Detail</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu_has_children"><a href="/User/Blog">Blog</a>
                                
                            </li>
                            <li className="menu_has_children"><a href="/">Pages</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/User/AboutUS">About Us</a>
                                    </li>
                                    <li>
                                        <a href="/User/Service">Service</a> 
                                    </li>
                                    <li>
                                        <a href="/User/FAQ">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="404">404 Page</a>
                                    </li>
                                    <li>
                                        <a href="/User/MyAccount">My Account</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/User/Contact">Contact Us</a>
                            </li>     

                                    
                        </ul>

                        <div style={{marginRight:"220px"}} > <a class="site-logo site-title" href="/User/Home"><img src={logo} alt="site-logo" style={{width:"100%"}}/></a>   </div>
                       
                     
                        <div className="header-search-block ml-auto">
                            <div className="search-container">
                                <form>
                                    <input type="text" name="q" id="search-terms" placeholder="Search terms..." />
                                    <button type="submit" name="submit" value="Go" className="search-icon"><i className="fas fa-fw fa-search"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="cart-block">
                            <a href="/">
                                <i className="fa fa-shopping-basket"></i>
                                <span className="count">2</span>
                            </a>   
                        </div>
                        <div className="my-account"> 
                            <a href="/" className="user"><i className="fas fa-user"></i></a>
                            <ul className="dropdown">
                            <li data-toggle="modal" data-target="#exampleModal">Sign Up</li>
                            </ul> 
                        </div>   
                        
                    </Nav>
                    </Navbar.Collapse>
              

               {/* <Container>
 <div class="header-top">
          <Nav class="navbar navbar-expand-xl">
            <button class="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="menu-toggle"></span>
            </button>   
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav main-menu mr-auto d-inline-flex">
                <li  class="menu_has_children"><a href="#">Home</a>
                  <ul class="sub-menu">
                    <li><a href="index.html">Home 1</a></li>
                    <li><a href="index2.html">Home 2</a></li>
                    <li><a href="index3.html">Home 3</a></li>
                    <li><a href="index4.html">Home 4</a></li>
                  </ul>
                </li>
                 <li class="menu_has_children"><a href="#">Category</a>
                  <ul class="sub-menu">
                    <li><a href="category.html">Category</a></li>
                    <li><a href="category-right.html">Category Right</a></li>
                    <li><a href="checkout.html">Checkout</a></li>
                    <li><a href="order.html">Order</a></li>
                    <li><a href="product-detail.html">Product Detail</a></li>
                  </ul>
                </li>
                <li class="menu_has_children"><a href="#">Blog</a>
                  <ul class="sub-menu">
                    <li><a href="blog-grid.html">Blog Grid</a></li>
                    <li><a href="blog-grid-three.html">Blog Three column</a></li>
                    <li><a href="blog-single.html">Single Blog</a></li>
                    <li><a href="blog-list-view.html">Blog List View</a></li>
                    <li><a href="blog-detail.html">Blog Detail</a></li>
                  </ul>
                </li>
                <li class="menu_has_children"><a href="#">Pages</a>
                  <ul class="sub-menu">
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="service.html">Service</a> </li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="404.html">404 Page</a></li>
                    <li><a href="my-account.html">My Account</a></li>
                  </ul>
                </li>
                <li><a href="contact-us.html">Contact Us</a></li>
              </ul>             
            </div>  

               
            <a class="site-logo site-title" href="index.html"><img src={logo} alt="site-logo"/></a>        
              <div class="header-search-block ml-auto">
                    <div class="search-container">
                      <form>
                        <input type="text" name="q" id="search-terms" placeholder="Search terms..." />
                        <button type="submit" name="submit" value="Go" class="search-icon"><i class="fas fa-fw fa-search"></i></button>
                      </form>
                    </div>
              </div>         
              <div class="cart-block">
                <a href="#">
                  <i class="fas fa-shopping-basket"></i>
                  <span class="count">2</span>
                </a>   
              </div>
              <div class="my-account"> 
                <a href="#" class="user"><i class="fas fa-user"></i></a>
                 <ul class="dropdown">
                   <li data-toggle="modal" data-target="#exampleModal">Sign Up</li>
                 </ul> 
              </div>                  
          </Nav>
      </div>    
      </Container> */}
         </Navbar>
                
            </div>
        </div>
        
       
        </header>


       
          
    </>
  )
}

export default Header