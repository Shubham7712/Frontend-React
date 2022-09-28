/*eslint-disable */

import React, {useState, useEffect, Fragment} from 'react';
import '../App.css';
import leftbanner from '../images/left-banner.png';
import product1 from '../images/products/product-1.png';
import product2 from '../images/products/product-2.png';
import product3 from '../images/products/product-3.png';
import product4 from '../images/products/product-4.jpg';
import product5 from '../images/products/product-5.jpg';
import product6 from '../images/products/product-6.jpg';
import leftimg from '../images/img-left.png';
import Rightimg from '../images/img-right.png';
import swal from 'sweetalert';
import Testimonial from '../images/user-1.png';
import Brand1 from '../images/brand/1.png';
import Brand2 from '../images/brand/2.png';
import Brand3 from '../images/brand/3.png';
import Brand4 from '../images/brand/4.png';
import Brand5 from '../images/brand/5.png';
import Brand6 from '../images/brand/6.png';
import Brand7 from '../images/brand/7.png';
import Brand8 from '../images/brand/8.png';
import Brand9 from '../images/brand/9.png';
import categorybanner from '../images/category-banner.png';
// import {Carousel} from '3d-react-carousal';
import Carousel from 'react-bootstrap/Carousel';
import Swal from 'sweetalert2';

import NewsLetters from '../images/newsletter-bg.jpg';
// import { Carousel } from 'react-responsive-carousel';
import blog1 from '../images/blog/1.jpg';
import blog2 from '../images/blog/2.jpg';
import blog3 from '../images/blog/3.jpg';
import DefaultImage from '../../../Images/download.png';
import {useForm, Controller} from 'react-hook-form';
import {toast} from 'react-toastify';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  Alert,
  Row,
  Col,
  Label,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
  Card,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';

import {useHistory, Link} from 'react-router-dom';
import api from '../../../api';

// import sdf from '../images/instagram-image/1.png'
// import productimage from './images/products/product-1.png'
import Header from '../Header';
import Footer from '../Footer';
import Swiper from './Swipper';
import * as yup from 'yup';

// const MySwal = withReactContent(Swal);
const SignupSchema = yup.object().shape({
  Email: yup.string().required()
});

function Home() {
  const [Banner, setbanner] = useState([]);
  const [Product, setproduct] = useState([]);

  const [Category, setcategory] = useState([]);

  const [Testimonial, settestimonial] = useState([]);
  const [NewsEvents, setNewsEvents] = useState([]);
  const [UserId, setUserId] = useState(localStorage.getItem('userid'));
  const [ProductPrice, setProductPrice] = useState(0);

  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: 'onBlur',
    defaultValues: {Email: ''},
    resolver: yupResolver(SignupSchema)
  });

  const SuccessToast = ({data, message}) => {
    return (
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title">{message}</h6>
          </div>
        </div>
      </Fragment>
    );
  };

  const ErrorToast = ({message}) => {
    return (
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title">Error!</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>
    );
  };

  const onSubmit = (data) => {
    console.log(data);

    let postData = {
      Email: data.Email,
      IsActive: true
    };

    api.post('/Admin/NewsLetters/create', postData).then((res) => {
      
      if (res.data.status == true) {
        setValue('Email', '');

       swal("Added Successfully","","success")
        console.log('submit', data);
        reset();
      } else {
        swal(res.data.message,"","error")
      }
    });
  };

  useEffect(() => {
    api.get('/Admin/Banner/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all Banners`, newData);
      // let filterData = newData && newData.filter((data) => data.IsActive);
      // setbannerImage(filterData);
      setbanner(newData);
    });

    api.get('/Admin/Category/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all Category`, newData);
      // let filterData = newData && newData.filter((data) => data.IsActive);
      // setbannerImage(filterData);
      setcategory(newData);
    });

    api.get('/Admin/Products/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all Product`, newData);

      setproduct(newData);
    });
    api.get('/Admin/Testimonial/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all Testimonial`, newData);

      settestimonial(newData);
    });

    api.get('/Admin/NewsEvents/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all NewsEvents`, newData);

      setNewsEvents(newData);
    });
  }, []);

  const wishList = (data) => {
    

    console.log('>>>>>>>>>>>>>>>>>>>>>>>data', data);
    if(UserId){
    api
      .post('/Admin/WishList/Create', {
        UserId: UserId,
        ProductId: data
      })
      .then((res) => {
        
        let status = res.status;
        let message = res.data.message;
        console.log("jajkajfk;lajfl;ajklfja;lfjaslfjasdjasfljas;lfjaslkfjasdlfjasdjdflkjasdflj",res);
        if (status === 202) {
          swal(message,"","error")
        } else if (status === 201) {
          swal(message,"","success")

        } else {
          swal("Somthing went wrong","","error")
        }
      });}else{
        swal("You are not logged in kindly login", "", "error");

      }
  };

  const handleaddtocart = (ProductId, Quantity) => {
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

      <section class="banner-section">
        {/* <div>
          <div md={12} xs={12}>
            <Carousel slides={slides} autoplay={true} interval={30000} />
          </div>
        </div> */}

        <Carousel style={{marginTop: '100px'}}>
          {Banner.map((data) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={'http://localhost:5000/' + data.BannerImage}
                style={{height: '900px', width: '900px'}}
              />
              <Carousel.Caption>
                <div class="single-banner">
                  <div class="banner-content-area has_bg_image">
                    <div class="container">
                      <div class="row">
                        <div class="col-md-7">
                          <div class="banner-content">
                            <h6 class="title-outer mb-3">{data.Title}</h6>
                            <h1 style={{color: 'black', fontFamily: 'cambria'}}>
                              {data.SubTitle}
                            </h1>
                            {/* <h1 class="title">{data.SubTitle}</h1> */}
                            <p class="mt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nam ac massa nec enim dapibus consequat ut
                              bibendum urna. Maecenas nec leo.
                            </p>
                            <a href="#" class="tx-ctm-btn">
                              view collection{' '}
                              <i class="fas fa-long-arrow-alt-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <section class="cms-section section-padding">
        <div class="container">
          <div className="row justify-content-between cms-block">
            {Category.map((data) => (
              <div class="col-xl-4 col-md-4 col-12 mb-md-0 mb-sm-3">
                <div class="cms-block-left">
                  <div class="thumb">
                    <img
                      src={'http://localhost:5000/' + data.CategoryImage}
                      style={{height: '400px', width: '500px'}}
                    />
                  </div>
                  <div class="content text-left">
                    <h6 class="name">{data.Name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="product-section pb-80">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-12">
              <div class="section-header text-center">
                <h2 class="section-title">Top Products</h2>
              </div>
              <div class="featureproduct-slider row justify-content-between">
                {Product.map((data) => (
                  <div class="col-lg-4 col-sm-6 mb-sm-3">
                    <div class="product-single text-center">
                      <div class="thumb">
                        <img
                          src={'http://localhost:5000/' + data.Image}
                          style={{height: '450px', width: '600px'}}
                        />
                        <span class="new">new</span>
                        <ul class="product-icons">
                          <li>
                            <a href="#">
                              {' '}
                              <Link to={`/ProductDetails/${data._id}`}>
                                <i className="far fa-eye"></i>
                              </Link>
                            </a>
                          </li>
                          <li>
                            <a onClick={() => wishList(data._id)}>
                              <i className="fa fa-heart"></i>
                            </a>
                          </li>
                          {/* <i class='fa fa-heart' style='color: red'></i> */}
                          <li>
                            <a onClick={() => handleaddtocart(data._id, 1)}>
                              <i class="fas fa-shopping-cart"></i>
                            </a>
                          </li>
                        </ul>
                        <div class="rating">
                          <span class="fas fa-star checked"></span>
                          <span class="fas fa-star checked"></span>
                          <span class="fas fa-star checked"></span>
                          <span class="fas fa-star"></span>
                          <span class="far fa-star"></span>
                        </div>
                      </div>
                      <div class="content text-left">
                        <h6 class="name">
                          {' '}
                          <Link to={`/ProductDetails/${data._id}`}>
                            <a>{data.Name}</a>
                          </Link>
                        </h6>
                        <div class="price">
                          <span class="regular-price">
                            {' '}
                            <Link to={`/ProductDetails/${data._id}`}>
                              <a>{data.Price}</a>
                            </Link>
                          </span>
                          <span class="discount-price">{data.Price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div class="featureproduct-arrow custom-slick-nav"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="parallax-section section-bg">
        <div class="parallax-left">
          <img src={leftimg} alt="image" />
        </div>
        <div class="parallax-content">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-lg-7 col-12 m-auto">
                <h2 class="section-title">
                  New Arrivals <br />
                  Everyday Living
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  ac massa nec enim dapibus consequat ut bibendum urna. Maecenas
                  nec leo congue arcu aliquam scelerisque.Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Nam ac massa nec enim
                  dapibus consequat ut bibendum urna. Maecenas nec leo congue
                  arcu aliquam scelerisque.
                </p>
                <a href="#" class="tx-ctm-btn">
                  view collection <i class="fas fa-long-arrow-alt-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="parallax-right">
          <img src={Rightimg} alt="image" />
        </div>
      </section>
      <section class="testimonial-section section-padding">
        <div class="container">
          <div class="row justify-content-between align-items-center position-relative">
            <div class="col-12">
              <div class="section-header text-center">
                <h2 class="section-title">Testimonial</h2>
              </div>
              <div class="col-lg-7 col-12 m-auto">
                <div class="testimonial-slider">
                  <div class="testimonial-slide"></div>
                  <Carousel>
                    {Testimonial.map((data) => (
                      <Carousel.Item>
                        <div class="testimonial-slide row">
                          <div class="">
                            <div class="client-thumb">
                              <img
                                src={
                                  'http://localhost:5000/' +
                                  data.TestimonialImage
                                }
                                style={{height: '145px', width: '145px'}}
                              />
                            </div>
                            <div class="testimonial-slide-body mt-3">
                              <p>{data.Description}</p>
                            </div>
                            <h5 class="name col-12">{data.Name}</h5>
                          </div>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <Row className="mt-3 mb-5">
            <Swiper />
          </Row>
        </div>
      </section>

      <section class="footer-top-first">
        <div class="col-12">
          <div class="row">
            <div class="newsletter-desc-main col-12 justify-content-center ">
              <div class="newsletter-desc-main-inner">
                <img
                  src={NewsLetters}
                  alt="image"
                  style={{
                    width: '100%',
                    height: 'auto',
                    margin: 'auto',
                    objectFit: ' cover',
                    paddingRight: '20px'
                  }}
                />
                <div class="newsletter-desc-index2">
                  <div class="container">
                    <div class="section-header text-center">
                      <h2 class="section-title">
                        Subscribe to <br />
                        Newsletters
                      </h2>
                      <p class="sub-title col-md-7 col-12">
                        Nullam elementum in orci nec imperdiet. Aliquam gravida
                        tellus arcu. Nullam gravida. In hendrerit suscipit
                        lectus, et dignissim In hendrerit suscipit lectus, et
                        dignissim
                      </p>
                    </div>

                    <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
                      <div class="newsletter col-md-7 col-12">
                        <Col md={11} className="mt-1">
                          <Controller
                            control={control}
                            id="Email"
                            name="Email"
                            render={({field}) => (
                              <Input
                                maxLength={50}
                                placeholder="Email"
                                invalid={errors.Email && true}
                                {...field}
                              />
                            )}
                          />
                          {errors && errors.Email && (
                            <FormFeedback></FormFeedback>
                          )}
                        </Col>
                        <Col className="mt-">
                          {' '}
                          <Button class="tx-ctm-btn">
                            <i class="fas fa-paper-plane"></i>
                          </Button>
                        </Col>

                        {/* <input type="text" name="newsletter" class="form-control" placeholder="Enter email"/> */}
                      </div>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="blog-section section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title">News & Events</h2>
          </div>
          <div class="row justify-content-between align-items-center position-relative">
            <div class="col-12">
              <div class="blog-slider row">
                <Carousel>
                  {NewsEvents.map((data) => (
                    <Carousel.Item>
                      <div class="blog-slider row">
                        <div class="col-lg-6 col-12">
                          <div class="blog-slide">
                            <div class="blog-slider-header d-flex">
                              <div class="blog-img">
                                <img
                                  src={
                                    'http://localhost:5000/' +
                                    data.NewsEventsImage
                                  }
                                  style={{height: '505px', width: '550px'}}
                                />
                              </div>
                              <span class="date">
                                24 <br />
                                Dec
                              </span>
                              <div class="blog-slide-body">
                                <h6 class="blog-title">
                                  <a href="#" class="title">
                                    {data.Title}
                                  </a>
                                  <span class="shopnow">
                                    <a href="#">
                                      view collection{' '}
                                      <i class="fas fa-long-arrow-alt-right"></i>
                                    </a>
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-12">
                          <div class="blog-slide blog-right">
                            <div class="blog-slider-header d-flex">
                              <div class="row">
                                <div class="col-6 blog-img">
                                  <img
                                    src={
                                      'http://localhost:5000/' +
                                      data.NewsEventsImage
                                    }
                                    style={{height: '240px', width: '300px'}}
                                    // style={{height: '240px', width: '250px'}}
                                  />{' '}
                                </div>
                                <div class="col-6 blog-slide-body">
                                  <span class="date">
                                    {24}
                                    <span>Dec</span>
                                  </span>
                                  <h6 class="blog-title">
                                    <a href="#" class="title">
                                      Ut posuere, mauris et bibendum dignissim
                                      lacus ligula sagittis dolor ligula
                                      sagittis dolor
                                    </a>
                                    <span class="shopnow">
                                      <a href="#">
                                        view collection{' '}
                                        <i class="fas fa-long-arrow-alt-right"></i>
                                      </a>
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="blog-slide blog-right">
                            <div class="blog-slider-header d-flex">
                              <div class="row">
                                <div class="col-6 blog-img">
                                  <img
                                    src={
                                      'http://localhost:5000/' +
                                      data.NewsEventsImage
                                    }
                                    style={{height: '240px', width: '300px'}}
                                    // style={{height: '240px', width: '250px'}}
                                    alt="image"
                                  />
                                </div>
                                <div class="col-6 blog-slide-body">
                                  <span class="date">
                                    24<span>Dec</span>
                                  </span>
                                  <h6 class="blog-title">
                                    <a href="#" class="title">
                                      Ut posuere, mauris et bibendum dignissim
                                      lacus ligula sagittis dolor ligula
                                      sagittis dolor
                                    </a>
                                    <span class="shopnow">
                                      <a href="#">
                                        view collection{' '}
                                        <i class="fas fa-long-arrow-alt-right"></i>
                                      </a>
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="blogarrow custom-slick-nav"></div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              <div class="blogarrow custom-slick-nav"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
