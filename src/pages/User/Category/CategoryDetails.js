/*eslint-disable */

import React, {useState, useEffect} from 'react';
import '../App.css';
import leftbanner from '../images/left-banner.png';
import product1 from '../images/products/product-1.png';
import product2 from '../images/products/product-2.png';
import product3 from '../images/products/product-3.png';
import product4 from '../images/products/product-4.jpg';
import categorybanner from '../images/category-banner.png';
import {useHistory, Link, useParams} from 'react-router-dom';
import api from '../../../api';
import {toast} from 'react-toastify';

import Header from '../Header';
import Footer from '../Footer';

function CategoryDetails() {
  const [Id, setId] = useState('');

  const [UserId, setUserId] = useState(localStorage.getItem('userid'));

  const [ProductPrice, setProductPrice] = useState(0);
  const [product, setproduct] = useState([]);
  const [GetAllproduct, setGetAllproduct] = useState([]);

  
  const {id} = useParams();


	console.log(">>>>>>>>>>>>>>>>>>>>>product",product);

  useEffect(() => {
    api.get('/Admin/Products/find/Category/'+ id).then((res) => {
      let newData = res.data
    //   console.log(`get all Product`, newData, [0].Price);
     
      setproduct(newData.Products);
      
    });

    api.get('/Admin/Products/getAll').then((res) => {
        let newData = res.data
      //   console.log(`get all Product`, newData, [0].Price);
       
        setGetAllproduct(newData.List);
        
      });
    
  }, []);


  

  const wishList = (data) =>{

    console.log('>>>>>>>>>>>>>>>>>>>>>>>data',data);
    api.post('/Admin/WishList/Create', {
     UserId:UserId,
     ProductId:data
    }).then((res)=>{
      let status = res.status;
      let message = res.data.message
      console.log(status);
      if(status === 202){
        toast.error(message)
      }else if(status === 201){
        toast.success(message)
      }else {
        toast.error("something went")
      }
    })
  }



  const handleaddtocart = (ProductId,Quantity) => {
    let postdata = {
      UserId: UserId,
      Qty: 1,
      SubTotal: 1,
      ProductId: ProductId,
      ProductQty: Quantity,
      ProductPrice: ProductPrice,
      ItemTotalPrice: 0
    };
    console.log(` ==>==>==> Cart=----------POst------Data`, postdata);
    api.post('/Admin/Cart/create', postdata).then((res) => {
      if (res.data.status == true) {
        swal(res.data.message);
      } else {
        if (res.data.cartdel == true) {
          swal({
            title: '',
            text: res.data.message,
            icon: 'warning',
            buttons: true,
            dangerMode: true
          }).then((willDelete) => {
            if (willDelete) {
              api.get('/Admin/Cart/delete' + UserId).then((resqest) => {
                if (resqest.data.status == true) {
                  swal(resqest.data.message, {
                    icon: 'success'
                  });
                } else {
                  swal(resqest.data.message, {
                    icon: 'error'
                  });
                }
              });
            } else {
            }
          });
        } else {
          swal(res.data.message, {
            icon: 'error'
          });
        }
      }
    });
  };
  return (
    <>
      <Header />

      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Product</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/Home">Home</Link> / <Link to="/User"> Pages</Link> /{' '}
              <b style={{color: '#2867E5', fontSize: '18px'}}>Product</b>
            </ul>
          </div>
        </div>
      </section>

      <div className="category-main section-padding">
        <div className="container">
          <div className="row">
            <div >
              <div className="left-column">
                {/* <!-- search start --> */}
                <div className="left-search left-bottom-space">
                  <h2 className="left-title">Search</h2>
                  <div className="search-container">
                    <form>
                      <input
                        type="text"
                        name="q"
                        id="search-terms"
                        placeholder="Search terms..."
                      />
                      <button
                        type="submit"
                        name="submit"
                        value="Go"
                        className="search-icon"
                      >
                        <i className="fas fa-fw fa-search"></i>
                      </button>
                    </form>
                  </div>
                </div>

                {/* <div className="left-blog left-bottom-space">
                  <h2 className="left-title">Latest Products</h2>

                  {product.map((data) => (
                    <div className="left-blog-block product-single">
                      <div className="left-blog-img">
                        <img
                          src={'http://localhost:5000/' + data.Image}
                          style={{
                            width: '100px',
                            height: '100px'
                          }}
                        />
                      </div>
                      <div className="left-blog-detail content">
                        <a href="/" className="title">
                          {data.Name}
                        </a>
                        <div className="price">
                          <span className="regular-price">{data.Price}</span>
                          <span className="discount-price">{data.Price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* <div className="left-colors left-bottom-space">
                  <h2 className="left-title">Color</h2>
                  <div className="color-selector">
                    <ul>
                      <li style={{background: '#000'}}></li>
                      <li style={{background: '#ff0000'}}></li>
                      <li style={{background: '#28a5e5'}}></li>
                      <li style={{background: '#9c28e5'}}></li>
                      <li style={{background: '#66e528'}}></li>
                      <li style={{background: '#c19f9f'}}></li>
                      <li style={{background: '#f2f032'}}></li>
                      <li style={{background: '#ffffff'}}></li>
                      <li style={{background: '#9c28e5'}}></li>
                      <li style={{background: '#186729'}}></li>
                      <li style={{background: '#2835e5'}}></li>
                    </ul>
                  </div>
                </div> */}
                {/* <!-- Colors end --> */}

                {/* <!-- Size start --> */}
                {/* <div className="left-size left-bottom-space">
                  <h2 className="left-title">Size</h2>
                  <div className="size-selector">
                    <ul>
                      <li>Xl</li>
                      <li>XXl</li>
                      <li>M</li>
                      <li>L</li>
                      <li>S</li>
                    </ul>
                  </div>
                </div> */}
                {/* <!-- Size end --> */}
                {/* <!-- leftbanner start --> */}
                {/* <div className="left-banner">
                  <div className="left-banner">
                    <img src={leftbanner} alt="image" />
                    <div className="content">
                      <span>20% off</span>
                      <h5 className="section-title">Big Offer</h5>
                      <span className="shopnow">
                        <a href="/">
                          Read More{' '}
                          <i className="fas fa-long-arrow-alt-right"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <!-- leftbanner end --> */}

            <div className="col" style={{width: '74%'}}>
              <div className="right-column">
                {/* <div className="category-banner">
                  <img
                    src={categorybanner}
                    alt="categorybanner"
                    style={{width: '100%'}}
                  />
                  <div className="content">
                    <h5 className="section-title">
                      Summer Sale Up To <br /> <span>70%</span> Off
                    </h5>
                    <a href="/" className="shopnow">
                      Read More <i className="fas fa-long-arrow-alt-right"></i>
                    </a>
                  </div>
                </div> */}
                {/* <div className="product-page-filter">
                  <select className="filter-selection">
                    <option value="" disabled selected>
                      Filter By
                    </option>
                    <option value="High to low">Sorting items</option>
                    <option value="Low to High">50 Products</option>
                    <option value="Low to High">100 Products</option>
                  </select>
                  <div className="collection-view">
                    <ul>
                      <li>
                        <i className="fas fa-th"></i>
                      </li>
                      <li>
                        <i className="fas fa-list-ul"></i>
                      </li>
                    </ul>
                  </div>
                </div> */}

                {/* category list */}

             <div className="row xs=4">
                  {product.map((data) => (
                    <div className="col-md-4 col-12 left-bottom-space">
                      <div className="product-single text-center">
                        <div className="thumb">
                          <img
                            src={'http://localhost:5000/' + data.Image}
                            style={{
                              width: '300px',
                              height: '300px'
                            }}
                          />
                          <ul className="product-icons">
                            <li>
                              <a href="#">
                                <Link to={`/ProductDetails/${data._id}`}>
                                  <i className="far fa-eye"></i>
                                </Link>
                              </a>
                            </li>

                            <li><a  onClick={() => wishList(data._id)}> 
                                <i className='fa fa-heart' ></i>
                                </a></li>
                            <li>
                              <a 
                               
                                onClick={() => handleaddtocart(data._id,1)}
                              >
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
                            <Link to={`/ProductDetails/${data._id}`}>
                              <a>{data.Name}</a>
                            </Link>
                          </h6>
                          <div className="price">
                            <span className="regular-price">
                              <Link to={`/ProductDetails/${data._id}`}>
                                <a>{data.Price}</a>
                              </Link>
                            </span>
                            <span className="discount-price">
                              <a>{data.Price}</a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> 
                <div className="blog-pagination">
                  <span>Showing 10-13 of 13 item(s) </span>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item page-arrow mr-2">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">Previous</span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link active" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item page-arrow ml-2">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">Next</span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryDetails;
