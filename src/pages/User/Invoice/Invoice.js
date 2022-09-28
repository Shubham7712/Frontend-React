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
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import paypal from '../images/paypal.png'
import mastercard from '../images/mastercard.png'
import visa from '../images/visa.png'
import american from '../images/americanexp.png'
import {useParams, useNavigate, Link} from 'react-router-dom';
import Moment from 'react-moment';

// import swal from 'sweetalert';
// import {Button, Card ,button,table} from 'react-bootstrap';
// import AddIcon from '@mui/icons-material/Add';

function Order() {
    const { id } = useParams();

    const [Order, setOrder] = useState([]);
    const [OrderUser, setOrderuser] = useState([]);
    const [OrderDetails, setOrderDetails] = useState([]);
    const [OrderCoupon, setOrderCoupon] = useState([0]);



    const [UserId, setUserId] = useState(localStorage.getItem('userid'));
  const [ProductPrice, setProductPrice] = useState(0);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>oederuser", OrderDetails);
  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    api.get(`/Admin/Order/find/` + id).then((res) => {
    let newData = res.data.order
    let Data = res.data.orderitem

    setOrderDetails(newData);
    setOrder(newData.UserId);
    setOrderCoupon(newData.CouponId && newData.CouponId.Discount );

    setOrderuser(Data)
    });
  };

  
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>clllll",Order);


 

 


  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Invoice</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/">Home</Link>  
              / <b style={{color: '#2867E5', fontSize: '18px'}}>Invoice</b>
              {/* <li><a href="#">Pages</a></li>
            <li><span>Category</span></li> */}
              {/* <Link to="/User">Home</Link> / Pages / Category */}
            </ul>
          </div>
        </div>
      </section>
      <section className="product-section ">
      <div className="container">
        <div className="row ">
          <div className="col-12">
      <div className="callout callout-info">
              <h5><i className="fas fa-info"></i> Note:</h5>
              This page has been enhanced for printing. Click the print button at the bottom of the invoice to test.
            </div>





            <div className="tab-content mb-4 mt-4" >
    <div className="tab-pane active" id="tab_default_2">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <div className="address-info">
                                <h6 className="title mb-3"><b>Shipping Address</b></h6>
                                <hr></hr>
                                <ul>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-map-marker-alt" />
                                    </span>
                                    <span>...........</span>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-mobile" />
                                    </span>
                                    <a href="#">..............</a>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-envelope-open" />
                                    </span>
                                    <a href="#">fffff</a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                           
                            <div className="col-md-6 col-12">
                              <div className="address-info">
                                <h6 className="title mb-3"><b>Billing Address</b></h6>
                               <hr></hr>
                                <ul>
                              
                                <li>
                                    <span className="address-icon">
                                      <i className="fas fa-user" />
                                    </span>
                                   
                                    <span>{Order.FirstName}</span>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-map-marker-alt" />
                                    </span>
                                    <span>{Order.Address}</span>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-mobile" />
                                    </span>
                                    <a href="#">{Order.Phone}</a>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-envelope-open" />
                                    </span>
                                    <a href="#">{Order.Email}</a>
                                  </li>
                              
                            

                                </ul>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      </div>

                      <div className="tab-content mb-4 mt-4" >
    <div className="tab-pane active" id="tab_default_2">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <div className="address-info">
                                <h6 className="title mb-3"><b>Order Details</b></h6>
                                <hr></hr>
                                <ul>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-check-circle" />
                                      <span>  Order Id : </span>
                                    </span>
                                   
                                    <span> {OrderDetails.OrderNumber}</span>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-mobile" />
                                      <span>  Order Date : </span>
                                    </span>
                                    <a href="#"><Moment format="DD MMM YYYY">
                      {OrderDetails.createdAt}</Moment></a>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-envelope-open" />
                                      <span>  Order Time :</span>
                                    </span>
                                    <a href="#"> <Moment format="hh ss">
                      {OrderDetails.createdAt}</Moment></a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                      </div>

            

<hr></hr>
<div className="row">
                <div className="col-12 table-responsive"></div>
<table className="table table-striped">
                    <thead>
                    <tr>
                      <th>Product</th>
                      <th >Price</th>
                      <th >Qty</th>
                      <th>Subtotal</th>
                    </tr>
                    </thead>
                    {OrderUser.map((data)=>(
                    <tbody>
                       
                    <tr>
                      <td >{data.ProductId.Name}</td>
                      <td>{data.ProductId.Price}</td>
                      <td>{data.Qty}</td>

                      <td>{data.Qty * data.ProductId.Price}</td>
                    </tr>
                    </tbody>
                     ))}
                  </table>
                  </div>   
                  <div className="row">
                  <div className="col-6">
                  <p className="lead">Payment Methods:</p>
                  <img src={visa} style={{hight:"50px", width:"60px"}}/>

                  <img src={mastercard}alt="Mastercard" style={{hight:"40px", width:"40px"}}/>
                  <img src={american} alt="American Express" style={{hight:"50px", width:"50px"}}/>
                  <img src={paypal}alt="Paypal" style={{hight:"30px", width:"90px"}}/>

                  <p className="text-muted well well-sm shadow-none" style={{marginTop:" 10px"}}>
                    Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem
                    plugg
                    dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                  </p>
                </div>  

                 <div className="col-6">
                

                  <div className="table-responsive">
                    <table className="table">
                    <tr>
                        <th>Shipping:</th>
                        <td>+$10</td>
                      </tr>
                      <tr>
                        <th>Coupon Discount</th>
                        <td>-${OrderCoupon}</td>
                      </tr>
                      <tr>
                        <th style={{width:"50%"}}>Subtotal:</th>
                        <td>{OrderDetails.Amount}</td>
                      </tr>
                     
                     
                      <tr>
                        <th>Total:</th>
                        <td>{OrderDetails.Amount}</td>
                      </tr>
                    </table>
                  </div>
                </div>
             <div className="row no-print mb-5">
                <div className="col-12">
                  <a href="invoice-print.html" rel="noopener" target="_blank" className="btn btn-default"><i className="fas fa-print"></i> Print</a>
                  <button type="button" className="btn btn-success float-right"><i className="far fa-credit-card"></i> Submit
                    Payment
                  </button>
                  <button type="button" className="btn btn-primary float-right" style={{marginRight: "5px"}}>
                    <i className="fas fa-download"></i> Generate PDF
                  </button>
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

export default Order;
