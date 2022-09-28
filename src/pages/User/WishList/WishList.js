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
  const [apidata, setApidata] = useState([]);
  const [UserId, setUserId] = useState(localStorage.getItem('userid'));
  const [ProductPrice, setProductPrice] = useState(0);
  // rating
  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    api.get(`/Admin/WishList/getwishlistbyuserid/` + UserId).then((res) => {
      setApidata(res.data.Watchlist);
    });
  };

  



  // const handleaddtocart = (data) => {

  //   console.log(data);

  //   let prodcutId = data.ProductId._id;
  //   // let userId = data.UserId;
  //   let productPrice = data.ProductId.Price
  //   console.log(productPrice);

  //   api
  //     .post(`/Admin/Cart/create`, {
  //       UserId: UserId,
  //       Qty: 1,
  //       SubTotal: 1,
  //       ProductId: prodcutId,
  //       ProductQty: 1,
  //       ProductPrice: productPrice,
  //       ItemTotalPrice: 0,
  //     })
  //     .then((res) => {
  //     toast.success("Product Is Added Sucessfully")
  //     });
  // };

  const handleaddtocart = (ProductId, Quantity ,) => {
    let postdata = {
      UserId: UserId,
      Qty: 1,
      SubTotal: 1,
      ProductId: ProductId,
      ProductQty: Quantity,
      ProductPrice:ProductId.Price,
      ItemTotalPrice: 0
    };
    
    api.post('/Admin/Cart/create', postdata).then((res) => {
      if (res.data.status == true) {
        
        swal("Product Added to Cart", "", "success");
        console.log(res.data.status)
      } else {
        swal("Product is already in cart ", "", "error");
      }
    });
  };

  const handledeleted = (item) => {
let id = item._id



    api.get(`/Admin/WishList/Delete/${id}`).then((res) => {
      if(res.data.success === true){
        swal("Product Deleted Sucessfully", "", "success");

      GetAll();
    }else {
      swal(res.data.message, " ", "error");

    }
    });
  };

  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Wishlist</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/User/Home">Home</Link> / <Link to="/User"> Pages</Link>{' '}
              / <b style={{color: '#2867E5', fontSize: '18px'}}>Wishlist</b>
              {/* <li><a href="#">Pages</a></li>
            <li><span>Category</span></li> */}
              {/* <Link to="/User">Home</Link> / Pages / Category */}
            </ul>
          </div>
        </div>
      </section>
      <section className="product-section pb-80">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="featureproduct-slider row ">
                {apidata.map((data) => (
                  <>
                    <div className="col-4">
                      <div className="product-items mb-sm-4">
                        <div className="product-single text-center">
                          <div className="thumb" key={data._id}>
                            <img
                              src={
                                'http://localhost:5000/' + data.ProductId.Image
                              }
                              style={{hight: '200px', width: '200px'}}
                            />

                            <ul className="product-icons">
                              <li>
                                <a
                                  onClick={() => {
                                    handledeleted(data);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleaddtocart(data.ProductId, 1 ,)}>
                                  <i className="fas fa-shopping-cart"></i>
                                </a>
                              </li>
                            </ul>
                            <div className="rating">
                              <span className="fas fa-star checked"></span>
                              <span className="fas fa-star checked"></span>
                              <span className="fas fa-star checked"></span>
                              <span className="fas fa-star"></span>
                              <span className="far fa-star"></span>
                            </div>
                          </div>
                          <div className="content text-left">
                            <h6 className="name">
                              <a href="#">{data.ProductId.Name}</a>
                            </h6>
                            <div className="price">
                              <span className="regular-price">
                                {data.ProductId.Price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
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
