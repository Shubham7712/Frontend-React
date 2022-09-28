/*eslint-disable */
import React, {useState, useEffect, renderItem} from 'react';
import '../App.css';
// import {Carousel} from '@trendyol-js/react-carousel';

import 'react-circular-progressbar/dist/styles.css';

import 'react-circular-progressbar/dist/styles.css';

import {useHistory, Link,useParams} from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import product1 from '../images/products/product-1.png';
import product2 from '../images/products/product-2.png';
import product3 from '../images/products/product-3.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import api from '../../../api'

import swal from 'sweetalert';

import Slider from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { toast } from 'react-toastify';

function ProductDetails() {
  const [search, setSearch] = useState('');
  const { id } = useParams();
const [Product,setproduct]=useState([])

const [Productgetall,setProductgetall]= useState([])
const [Quantity, setQuantity] = useState(1);
const [Subtotal, setSubtotal] = useState(0);
const [ProductId, setProductId] = useState("");
const [ProductPrice, setProductPrice] = useState(0);
//-------------CART IMPORTS -----------------
const [UserId, setUserId] = useState(localStorage.getItem('userid'));

const [cartitem, setcartitem] = useState([]);
const [cartid, setcartid] = useState("");
const [couponcode, setcouponcode] = useState("");

  const [active, setActive] = useState('description');
  const activeClass = 'active';
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
 
  useEffect(() => {

    api.get('/Admin/Products/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all ProductGetAll`, newData);
      
      setProductgetall(newData)
    });
  
    
    api.get('/Admin/Products/find/'+ id).then((res) => {
      let newData = res.data.product;

      console.log(`get find Product Id`, newData);
      setProductId(newData._id);
      setProductPrice(newData.Price)
      
      setproduct(newData)

    });

      api.get(`/Admin/Cart/User/find/`,UserId).then((res) => {
        if (res.data.status == true) {
          console.log("Get All Cartdata------>", res.data.Cart.SubTotal)
          setcartitem(res.data.CartItem);
          setSubtotal(res.data.Cart.SubTotal);
          setcartid(res.data.Cart._id);
          // setRestaurantId(res.data.Cart.RestaurantId._id);
          // setfinalSubtotal(res.data.Cart.SubTotal);
    
          // console.log(`res.dsta.Cart.RestaurantId._id`, res.data.Cart.RestaurantId._id)
          // console.log(`localstorage`,res.data )
    
        }
    
      })
    
  
  }, [id]);
  
 

 



  
const handleDecreamentQuantity = (data, qty) => {

  let value = qty - 1;

  if (value < 1) {
    let postdata = {
      cartitemid: data,
      cartid: cartid
    }


    api.post(`/Admin/Cart/delete/`, postdata).then((res) => {

      console.log(`delete`, res.data);
     
    })

  }
  else {
    let postdata = {
      id: data,
      ProductQty: value
    }

    api.post(`/Admin/Cart/update`, postdata).then((res) => {

      console.log(`Updated`, res.data);
    
    })


  }

}

const handleIncreamentQuantity = (data, qty) => {

  let value = qty + 1;

 
  let postdata = {
    id: data,
    ProductQty: value
  }


  api.post(`/Admin/Cart/update`, postdata).then((res) => {

    console.log(`Updated my cart `, res.data);
  
  })
  
}
  const handleaddtocart = () => {

    if (id) {
      let postdata = {
        UserId: UserId,
        Qty: 1,
        SubTotal: 1,
        ProductId: ProductId,
        ProductQty: Quantity,
        ProductPrice: ProductPrice,
        ItemTotalPrice: 0,
      }
      let userid = localStorage.getItem("userid")
      console.log(` ==>==>==> Cart=----------POst------Data`, postdata);
      if(userid == null || userid == ""){
        swal("You are not logged in kindly login", "", "error");

      }else {
      api.post("/Admin/Cart/create", postdata).then((res) => {
        if (res.data.status == true) {
          swal(res.data.message);
        }
        else {
          if (res.data.cartdel == true) {
            swal({
              title: "",
              text: res.data.message,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  api.get("/Admin/Cart/delete" + UserId).then((resqest) => {
                    if (resqest.data.status == true) {
                      swal(resqest.data.message, {
                        icon: "success",
                      });
                    }
                    else {
                      swal(resqest.data.message, {
                        icon: "error",
                      });
                    }
                  })
                } else {
                }
              });
          }
          else {
            swal(res.data.message, {
              icon: "error"
            });
          }
        }
      })
    }

    }
  
    else {


      swal("Please login user ", {
        icon: "error"
      });
     

    }



  }
  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Product Details </h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/User/Home">Home</Link> / <Link to="/User"> Pages</Link>
              <b style={{color: '#2867E5', fontSize: '18px'}}>
                / Product Details
              </b>
            </ul>
          </div>
        </div>
      </section>
      <section className="product-main section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-md-0 mb-sm-3">
              <div className="left-column">
                <div className="slider-wrapper">
                  <div className="main-product-image ">
                    <Carousel>

                    
                      <div>
                      <img src={`http://localhost:5000/${Product.Image}`} />

                      </div>
                     

     {Productgetall.map((data)=>(<Link to={`/ProductDetails/${data._id}`}>  <img src={"http://localhost:5000/" +
                                                 data.Image
                                            }  /> </Link>))}
                      

                     

                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-md-0 mb-sm-3">
              <div className="right-column product-single">
                <div className="shipping-method">
                  <span>
                    <i className="fas fa-truck" />
                    Free shipping
                  </span>
                  <span>
                    <i className="fas fa-box-open" />
                    Unlimited
                  </span>
                </div>
                <hr />
                <div className="content text-left">
                  <h6 className="name">
                    <a href="#">{Product.Name}</a>
                  </h6>
                  <p>
                    Availability: <span className="stock">In Stock</span>
                  </p>
                  <div className="price">
                    <span className="regular-price">{Product.Price}</span>
                    <span className="discount-price">{Product.Price}</span>
                  </div>
                  <hr />
                  <div className="description">
                    
                  {Product.Details}

                  </div>
                  <hr />
                  {/* <div className="quantity prod-items">
                    <h6 className="title">Quantity:</h6>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={1}
                    />
                  </div> */}
                  <div className="color-selector prod-items">
                    <h6 className="title">Color:</h6>
                    <ul>
                      <li style={{background: '#000'}} />
                      <li style={{background: '#ff0000'}} />
                      <li style={{background: '#28a5e5'}} />
                      <li style={{background: '#9c28e5'}} />
                      <li style={{background: '#66e528'}} />
                      <li style={{background: '#c19f9f'}} />
                    </ul>
                  </div>
                  <div className="size-selector prod-items">
                    <h6 className="title">Size: </h6>
                    <ul>
                      <li>Xl</li>
                      <li>XXl</li>
                      <li>M</li>
                    </ul>
                  </div>
                  <div className="add-to-cart">
                    <a className="tx-ctm-btn" onClick={() => handleaddtocart()}>
                      Add To Cart  <i className="fas fa-shopping-cart" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 pt-100">
              <div className="tabbable-panel">
                <div className="tabbable-line">
                  <ul className="nav nav-tabs ">
                    <li className="active">
                      <a
                        data-toggle="tab"
                        className={active === 'description' && activeClass}
                        onClick={(e) => setActive('description')}
                      >
                        Description
                      </a>
                    </li>
                    <li>
                      <a
                        className={active === 'review' && activeClass}
                        data-toggle="tab"
                        onClick={(e) => setActive('review')}
                      >
                        Review
                      </a>
                    </li>
                    <li>
                      <a
                        className={active === 'additionalinfo' && activeClass}
                        data-toggle="tab"
                        onClick={(e) => setActive('additionalinfo')}
                      >
                        Additional Informations
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active" id="description">
                      {active === 'description' && (
                        <div className="description">
                          <p>
                          {Product.Details}
                          </p>
                        </div>
                      )}
                      {active === 'review' && (
                        <div className="description">
                          <p>
                          {Product.Details}
                          </p>
                        </div>
                      )}
                      {active === 'additionalinfo' && (
                        <div className="description">
                          <p>
                          {Product.Details}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="tab-pane" id="review">
                      <form className="rating-form">
                        <div className="row">
                          <div className="col-12 form-group">
                            <div className="rating">
                              <label>
                                <input
                                  type="radio"
                                  name="stars"
                                  defaultValue={1}
                                />
                                <span className="icon">★</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="stars"
                                  defaultValue={2}
                                />
                                <span className="icon" >★</span>
                                <span className="icon">★</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="stars"
                                  defaultValue={3}
                                />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="stars"
                                  defaultValue={4}
                                />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="stars"
                                  defaultValue={5}
                                />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-12 form-group">
                            <input
                              type="text"
                              name="text"
                              id="text"
                              autoComplete="off"
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div className="col-12 form-group">
                            <textarea
                              name="review"
                              id="review"
                              maxLength={100}
                              placeholder="Write your review hear (Required)"
                              required
                              defaultValue={''}
                            />
                          </div>
                          <div className="col-sm-3 col-12 form-group">
                            <button
                              id="submit"
                              type="submit"
                              name="submit"
                              className="tx-ctm-btn "
                            >
                              Save <i className="fas fa-long-arrow-alt-right" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane" id="additional">
                      <div className="description">
                        <p>
                        {Product.Details}
                        </p>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================= product main section end =================*/}
      {/*================= replatedproduct section start =================*/}
      <section className="releatedproduct-section pb-80">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="section-header text-center">
                <h2 className="section-title">Related Products</h2>
              </div>
              <div className="relatedproduct-slider row justify-content-between" >



              <Slider responsive={responsive}>
      
              {Productgetall.map((data)=>(


                  <div className="col-lg-4 col-sm-6 mb-sm-3"  >
                    <div className="product-single text-center" >
                      <div className="thumb"  style={{width:"350px",height:"500px"}} >
                     
                        <img src={"http://localhost:5000/" +
                                                 data.Image
                                            }  /> 
                        <span className="new">new</span>
                        <ul className="product-icons">
                          {/* <li>
                            <a href="#">
                              <i className="far fa-eye" />
                            </a>
                          </li> */}
                          {/* <li>
                            <a href="#">
                              <i className="fas fa-shopping-cart" />
                            </a>
                          </li> */}
                        </ul>
                        <div className="rating">
                          <span className="fas fa-star checked" />
                          <span className="fas fa-star checked" />
                          <span className="fas fa-star checked" />
                          <span className="fas fa-star" />
                          <span className="far fa-star" />
                        </div>
                      </div>
                      <div className="content text-left">
                        <h6 className="name">
                          <a href="#">
                          {data.Name}
                          </a>
                        </h6>
                        <div className="price">
                          <span className="regular-price">{data.Price}</span>
                          <span className="discount-price">{data.Price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                 ))}
                  </Slider>
              </div>
              <div className="relatedprod-arrow custom-slick-nav" />
            </div>
          </div>
        </div>
      </section>
      {/*================= product section end =================*/}

      <Footer />
    </>
  );
}

export default ProductDetails;
