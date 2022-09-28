/*eslint-disable */

import React, {useState, useEffect} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Rating from '@material-ui/lab/Rating/Rating';
import Header from '../Header';
import Footer from '../Footer';
import api from '../../../api';
import Nodata from '../../../Images/download.png';
import Add from '../images/icons8-plus-+-50.png';
import Sub from '../images/icons8-minus-50.png';
import Delete from '../images/icons8-ecommerce-64.png';

import {useParams, useNavigate, Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Button, Card} from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';

function Order() {
  const [cart, setcart] = useState([]);
  const {id} = useParams();

  // let [count, setCount] = useState(0);

  //   function incrementCount() {
  //     count = count + 1;
  //     setCount(count);
  //   }
  //   function decrementCount() {
  //     count = count - 1;
  //     setCount(count);
  //   }

  const [value, setValue] = React.useState(4);
  const [UserId, setUserId] = useState(localStorage.getItem('userid'));
  const [cartitem, setcartitem] = useState([]);
  const [Quantity, setQuantity] = useState(0);
  const [Subtotal, setSubtotal] = useState('');
  const [cartid, setcartid] = useState('');
  const navigate = useNavigate(); // rating
  const [couponcode, setcouponcode] = useState('');
  const [discount, setdiscount] = useState(0);
  const [finalSubtotal, setfinalSubtotal] = useState(0);
  const [CouponId, setCouponId] = useState('');

  // rating
  useEffect(() => {
    GetProductById();
  }, [cartitem.length]);

  const GetProductById = () => {
    api.get(`/Admin/Cart/User/find/` + UserId).then((res) => {
      if (res.data.status == true) {
        console.log('Get All Cartdata------>', res.data.Cart.SubTotal);
        setcartitem(res.data.CartItem);
        setSubtotal(res.data.Cart.SubTotal);
        setcartid(res.data.Cart._id);
        // setRestaurantId(res.data.Cart.RestaurantId._id);
        setfinalSubtotal(res.data.Cart.SubTotal);

        // console.log(`res.dsta.Cart.RestaurantId._id`, res.data.Cart.RestaurantId._id)
        // console.log(`localstorage`,res.data )
      }
    });
  };

  const handledeleted = (data, qty) => {
    let postdata = {
      cartitemid: data._id,
      cartid: data.CartId
    };

    console.log('delet data log', data);

    api.post(`/Admin/Cart/delete`, postdata).then((res) => {
      console.log(`delete api called-----------`, res.data);
      GetProductById();
    });
  };

  const handledcheckoutpage = () => {
    let postdata = {};

    if (CouponId == '') {
      postdata = {
        UserId:UserId,

        cartid: cartid,
        Amount: completeTotal,
        OrderType: 'cash on delivery',
        PaymentStatus: 'Done',
        Details: 'testing details'
      };
    } else {
      postdata = {
        UserId:UserId,
        cartid: cartid,
        Amount: completeTotal,
        OrderType: 'cash on delivery',
        CouponId: CouponId,
        PaymentStatus: 'Done',
        Details: 'testing details'
      };
    }
    api.post(`/Admin/Order/create`, postdata).then((res) => {
      if (res.data.status == true) {
        navigate(`/Order/${res.data.order._id}`);
      }

      console.log(`THIS ISD MODODODOD`, res.data);
    });
  };

  const handleDecreamentQuantity = (data, qty) => {
    let value = qty - 1;

    if (value < 1) {
      let postdata = {
        cartitemid: data,
        cartid: cartid
      };

      api.post(`/Admin/Cart/delete/`, postdata).then((res) => {
        console.log(`THIS ISD MODODODOD`, res.data);
        GetProductById();
      });
    } else {
      let postdata = {
        id: data,
        ProductQty: value
      };

      api.post(`/Admin/Cart/update`, postdata).then((res) => {
        console.log(`Updated`, res.data);
        GetProductById();
      });
    }
  };

  const handleIncreamentQuantity = (data, qty) => {
    let value = qty + 1;

    let postdata = {
      id: data,
      ProductQty: value
    };

    api.post(`/Admin/Cart/update`, postdata).then((res) => {
      console.log(`Updated my cart `, res.data);
      GetProductById();
    });
  };

  const hendelcouponcode = () => {
    let postdata = {
      CouponCode: couponcode
      // restaurantid: RestaurantId
    };

    api.post(`/Admin/Coupon/findcode`, postdata).then((res) => {
      if (res.data.status == true) {
        console.log(`findCode Coupon`, res.data.coupon);
        setCouponId(res.data.coupon._id);
        let type = res.data.coupon.DiscountType[0].value;
        let MinPurchase = res.data.coupon.MinCartValue;
        console.log(`MiniMumCartValue := `, MinPurchase);

        if (Subtotal >= MinPurchase) {
          if (type == 'Amount') {
            setdiscount(res.data.coupon.Discount);
            setfinalSubtotal(Subtotal - res.data.coupon.Discount);
          } else {
            let discountamount = (Subtotal * res.data.coupon.Discount) / 100;

            if (res.data.coupon.MaxDiscount >= discountamount) {
              setdiscount(discountamount);
              // alert("IF ma ");
              // alert(Subtotal - discountamount);
              setfinalSubtotal(Subtotal - discountamount);
            } else {
              setdiscount(res.data.coupon.Discount);
              // alert("else  ma ");
              // alert(Subtotal - res.data.coupon.MaxDiscount);
              setfinalSubtotal(Subtotal - res.data.coupon.MaxDiscount);
            }
          }

          swal('coupon apply successfully', {
            icon: 'success'
          });
        } else {
          swal('Min Purchase amont ' + MinPurchase, {
            icon: 'error'
          });
        }
      } else {
        swal('coupon Code is not valid', {
          icon: 'error'
        });
      }
    });
  };

  const TotalPayments = finalSubtotal  ;

  console.log('>>>>>>>>>>>>>>>>>>>TotalPaymantsssssssssss', TotalPayments);

  // console.log(`get find cart`, cart[0].ProductId);
  let completeTotal = 10 - discount;
  return (
    <>
      <Header />

      <section class="breadcrumb" style={{marginTop: '100px'}}>
        <div class="container">
          <div class="row">
            <h2 class="col-md-6 col-12 section-title">Cart</h2>
            <ul class="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/User/Home">Home</Link> / <Link to="/User"> Pages</Link>{' '}
              / <b style={{color: '#2867E5', fontSize: '18px'}}>Order</b>
              {/* <li><a href="#">Pages</a></li>
            <li><span>Category</span></li> */}
              {/* <Link to="/User">Home</Link> / Pages / Category */}
            </ul>
          </div>
        </div>
      </section>

      <section class="order section-padding">
        <div class="container">
          <div class="row justify-content-between">
            <table id="cart" class="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style={{width: '50%'}}>Item</th>
                  <th style={{width: '20%'}}>Price</th>
                  <th style={{width: '20%'}}>Quantity</th>
                  <th style={{width: '20%'}} class="text-center">
                    Subtotal
                  </th>
                  <th style={{width: '10%'}}></th>
                </tr>
              </thead>
              <tbody>
                {cartitem.map(
                  (item) => (
                    // let sub = item.ProductId.Price;

                    (completeTotal =
                      completeTotal  +
                      item.ProductId.Price * item.ProductQty  
                      ),
                    (
                      <tr>
                        <td data-th="Product">
                          <div class="row">
                            {/* {console.log(">>>>>>>>>>>>>>>>Delete",item)} */}
                            <div class="col-4 hidden-xs">
                              <img
                                className="d-block w-100"
                                src={`http://localhost:5000/${
                                  item.ProductId && item.ProductId.Image
                                }`}
                                alt="image"
                                class="img-responsive"
                                style={{height: '200px', width: '250px'}}
                              />
                              <h6 class="name">
                                <a href="#">
                                  {item.ProductId && item.ProductId.Name}
                                </a>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td data-th="Price" class="price">
                          {item.ProductId.Price}
                        </td>
                        <td data-th="Quantity">
                          <div style={{display: 'flex'}}>
                            <img
                              src={Sub}
                              alt="..."
                              style={{width: '50px'}}
                              onClick={() =>
                                handleDecreamentQuantity(
                                  item._id,
                                  item.ProductQty
                                )
                              }
                            />
                            <p className="mt-3">
                              <b>{item.ProductQty}</b>{' '}
                            </p>
                            <img
                              src={Add}
                              style={{width: '50px'}}
                              onClick={() =>
                                handleIncreamentQuantity(
                                  item._id,
                                  item.ProductQty
                                )
                              }
                            />
                          </div>
                        </td>
                        <td data-th="Subtotal" class="price text-center">
                          ${item.ProductId.Price * item.ProductQty}
                        </td>
                        <td class="actions" data-th="">
                          {/* <button class="edit"><i class="fas fa-pencil-alt"></i></button> */}
                          <button
                            class="delete"
                            onClick={() => handledeleted(item)}
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
            <div class="col-12">
              <div style={{marginLeft: '60%'}} class="order-bottom ">
                

                <div>
                  <h3>Add Coupon Code</h3>
                </div>
                <div className="cart1">
                  <input
                    className="applycoupon"
                    type="text"
                    placeholder="Coupon Code"
                    onChange={(e) => {
                      setcouponcode(e.target.value);
                    }}
                  />
                  <a class="tx-ctm-btn mt-2" onClick={hendelcouponcode}>
                    APPLY
                  </a>
                </div>
                <div className="offer_card_heading3">
                  <div class="order-totals">
                    <ul>
                      <li>
                        {' '}
                        Delivery Fee: <span class="price">+$10</span>
                      </li>
                      <li>
                        {' '}
                        Coupon Discount: <span class="price">-${discount}</span>
                      </li>

                      <li>
                        <h5>
                          Sub Total <span class="price">${completeTotal}</span>
                        </h5>
                      </li>
                    </ul>

                    <hr></hr>
                    <h3 class="title"> Total Payment:${completeTotal}</h3>
                  </div>
                  <a
                    class="tx-ctm-btn "
                    onClick={() => handledcheckoutpage(cartid)}
                  >
                    Place Order <i class="fas fa-long-arrow-alt-right"></i>
                  </a>
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

export default Order;
