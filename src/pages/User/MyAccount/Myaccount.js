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
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Moment from 'react-moment';

// import sdf from '../images/instagram-image/1.png'
// import productimage from './images/products/product-1.png'
import Header from '../Header';
import Footer from '../Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import {toast} from 'react-toastify';
import {getAllByAltText} from '@testing-library/react';
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
const SignupSchema = yup.object().shape({
  FirstName: yup.string().required('Please enter a first name'),
  LastName: yup.string().required('Please enter last name'),

  Phone: yup
    .string()
    .required('Please enter a phone number')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Contact number is not valid'
    ),
  Address: yup.string().required('Please enter an address'),
  Email: yup.string().required('Please enter an email'),
  Password: yup.string().required('Please enter an password')
});

function Myaccount() {
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      FirstName: '',
      LastName: '',
      Phone: '',
      BirthDate: '',
      Password: '',
      Email: '',
      Address: ''
    },
    resolver: yupResolver(SignupSchema)
  });

  const [tab, setTab] = useState('Tab1');
  const {_id} = useParams();

  const [Id, setId] = useState('');

  const active = 'active';
  const [Order, setOrder] = useState([]);
  const [UserId, setUserId] = useState(localStorage.getItem('userid'));

  // const [Subtotal, setSubtotal] = useState(0);
  const [cartid, setcartid] = useState('');
  const [finalSubtotal, setfinalSubtotal] = useState(0);
  const [User, setUser] = useState('');
  const GetAll = () => {
    api.get('/Admin/User/find/' + UserId).then((res) => {
      if (res.data.status === true) {
        let newData = res.data.admin;
        setValue('FirstName', newData.FirstName);
        setValue('LastName', newData.LastName);

        setValue('Address', newData.Address);
        setValue('Email', newData.Email);

        setValue('Phone', newData.Phone);
        setValue('Password', newData.Password);
        setUser(newData);
        console.log('USER by id------', newData);
      }
      // console.log('setting by id monday------', res.data.PageSetup.Monday.StartTime);
    });
  };

  const GetAllUserCart = () => {
    api.get(`/Admin/Order/User/` + UserId).then((res) => {
      if (res.data.status == true) {
        let newData = res.data;
        console.log('Get All Cartdata------>', newData);
        setOrder(newData.order);
      }
    });
  };

  useEffect(() => {
    GetAll();
    GetAllUserCart();
  }, []);

  const onSubmit = (data) => {
    let postData = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Address: data.Address,
      Email: data.Email,
      Phone: data.Phone,
      Password: data.Password,

      IsActive: true
    };

    api.post('/Admin/User/update/' + UserId, postData).then((res) => {
      if (res.data.status === true) {
        reset();
        toast.success(<SuccessToast message={'Updated Successfully'} />, {
          hideProgressBar: false
        });
        GetAll();
      } else {
        toast.error(<ErrorToast message={res.data.message} />, {
          hideProgressBar: false
        });
      }
    });
  };

  let completeTotal = 0;

  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">My Account</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/">Home</Link> /{' '}
              <b style={{color: '#2867E5', fontSize: '18px'}}>/ My Account</b>
              {/* <li><a href="#">Pages</a></li>
            <li><span>Category</span></li> */}
              {/* <Link to="/User">Home</Link> / Pages / Category */}
            </ul>
          </div>
        </div>
      </section>

      <section className="myaccount section-padding">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="tabbable-panel">
                <div className="tabbable-line">
                  <ul className="nav nav-tabs ">
                    <li className="">
                      <a
                        data-toggle="tab"
                        className={tab === 'Tab1' && active}
                        onClick={() => setTab('Tab1')}
                      >
                        Personal Information
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        className={tab === 'Tab2' && active}
                        onClick={() => setTab('Tab2')}
                      >
                        My Address
                      </a>
                    </li>
                    <li>
                      <a
                        className={tab === 'Tab3' && active}
                        data-toggle="tab"
                        onClick={() => setTab('Tab3')}
                      >
                        Order History
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    {tab === 'Tab1' && (
                      <div className="tab-pane active" id="tab_default_1">
                        <div className="contact-form">
                          <Form
                            onSubmit={handleSubmit(onSubmit)}
                            id="contact"
                            name="contact"
                            method="post"
                          >
                            <div className="row">
                              <div className="col-6 form-group">
                                <label for="FirstName">First Name *</label>
                                <Controller
                                  control={control}
                                  id="FirstName"
                                  name="FirstName"
                                  render={({field}) => (
                                    <Input
                                      maxLength={50}
                                      placeholder="First FirstName "
                                      invalid={errors.FirstName && true}
                                      {...field}
                                    />
                                  )}
                                />
                                {errors && errors.FirstName && (
                                  <FormFeedback>
                                    {errors.FirstName.message}
                                  </FormFeedback>
                                )}
                              </div>
                              <div className="col-6 form-group">
                                <Label for="LastName">Last Name *</Label>
                                <Controller
                                  control={control}
                                  id="LastName"
                                  name="LastName"
                                  render={({field}) => (
                                    <Input
                                      maxLength={50}
                                      placeholder="Last Name "
                                      invalid={errors.LastName && true}
                                      {...field}
                                    />
                                  )}
                                />
                                {errors && errors.LastName && (
                                  <FormFeedback>
                                    {errors.LastName.message}
                                  </FormFeedback>
                                )}
                              </div>
                              <div className="col-6 form-group">
                                <Label for="Email">Email *</Label>
                                <Controller
                                  control={control}
                                  id="Email"
                                  name="Email"
                                  render={({field}) => (
                                    <Input
                                      maxLength={50}
                                      placeholder="First Email "
                                      invalid={errors.Email && true}
                                      {...field}
                                    />
                                  )}
                                />
                                {errors && errors.Email && (
                                  <FormFeedback>
                                    {errors.Email.message}
                                  </FormFeedback>
                                )}
                              </div>
                              <div className="col-6 form-group">
                                <Label for="Phone">Phone *</Label>
                                <Controller
                                  control={control}
                                  id="Phone"
                                  name="Phone"
                                  render={({field}) => (
                                    <Input
                                      maxLength={50}
                                      placeholder="First Phone "
                                      invalid={errors.Phone && true}
                                      {...field}
                                    />
                                  )}
                                />
                                {errors && errors.Phone && (
                                  <FormFeedback>
                                    {errors.Phone.message}
                                  </FormFeedback>
                                )}
                              </div>
                              <div className="col-6 form-group">
                                <Label for="Address">Address *</Label>
                                <Controller
                                  control={control}
                                  id="Address"
                                  name="Address"
                                  render={({field}) => (
                                    <Input
                                      maxLength={50}
                                      placeholder=" Address "
                                      invalid={errors.Address && true}
                                      {...field}
                                    />
                                  )}
                                />
                                {errors && errors.Address && (
                                  <FormFeedback>
                                    {errors.Address.message}
                                  </FormFeedback>
                                )}
                              </div>
                              <div className="col-6 form-group">
                                <Label for="Password">Password *</Label>
                                <Controller
                                  control={control}
                                  id="Password"
                                  name="Password"
                                  render={({field}) => (
                                    <Input
                                      maxLength={50}
                                      placeholder=" Password "
                                      invalid={errors.Password && true}
                                      {...field}
                                    />
                                  )}
                                />
                                {errors && errors.Password && (
                                  <FormFeedback>
                                    {errors.Password.message}
                                  </FormFeedback>
                                )}
                              </div>

                              <div className="col-12 form-group customcheckbox">
                                <input type="checkbox" id="newsletter" />
                                <label htmlFor="newsletter">
                                  Sign up for our newsletter
                                </label>
                              </div>
                            </div>
                            <div className="form-group">
                              <Button
                                id="submit"
                                type="submit"
                                name="submit"
                                className="Primary "
                              >
                                Save
                                <i className="fas fa-long-arrow-alt-right ml-1 " />
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    )}
                    {tab === 'Tab2' && (
                      <div className="tab-pane active" id="tab_default_2">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <div className="address-info">
                                <h6 className="title mb-3">Shopping Address</h6>
                                <ul>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-map-marker-alt" />
                                    </span>
                                    <span>{User.Address}</span>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-mobile" />
                                    </span>
                                    <a href="#">{User.Phone}</a>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-envelope-open" />
                                    </span>
                                    <a href="#">{User.Email}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="address-info">
                                <h6 className="title mb-3">Billing Address</h6>
                                <ul>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-map-marker-alt" />
                                    </span>
                                    <span>{User.Address}</span>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-mobile" />
                                    </span>
                                    <a href="#">{User.Phone}</a>
                                  </li>
                                  <li>
                                    <span className="address-icon">
                                      <i className="fas fa-envelope-open" />
                                    </span>
                                    <a href="#">{User.Email}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {tab === 'Tab3' && (
                      <div className="tab-pane active" id="tab_default_3">
                        <div className="">
                          <div className="">
                            <div className="">
                              <div className="">
                                <div className="">
                                  <div className=""></div>
                                </div>
                              </div>
                              <div className="">
                                <div className=" ">
                                  <div className="container">
                                    <div className="">
                                      <table
                                        id="cart"
                                        class="table table-hover table-condensed"
                                      >
                                        <thead>
                                          <tr>
                                            <th style={{width: '20%'}}>
                                              OrderNumber
                                            </th>
                                            <th style={{width: '20%'}}>
                                              OrderDate
                                            </th>
                                            <th style={{width: '20%'}}>
                                              OrderType
                                            </th>
                                            <th style={{width: '20%'}}>
                                              PaymentStatus
                                            </th>

                                            <th style={{width: '20%'}}>
                                              Subtotal
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {Order.map((item) => (
                                            // let sub = item.ProductId.Price;

                                            // completeTotal = completeTotal + item.ProductId.Price * item.ProductQty+10 ,
                                            <tr>
                                              <td data-th="">
                                                <div
                                                  style={{
                                                    marginTop: '20px',
                                                    fontWeight: 'bold'
                                                  }}
                                                >
                                                  {/* <p > {Details} </p> */}
                                                  <Link
                                                    to={`/order/${item._id}`}
                                                  >
                                                    <Button
                                                      className="trackorder text-center"
                                                      color="danger"
                                                      outline
                                                    >
                                                      {' '}
                                                      <b class="test-center">
                                                        {' '}
                                                        {item.OrderNumber}
                                                      </b>{' '}
                                                    </Button>
                                                  </Link>
                                                </div>
                                              </td>

                                              <td data-th="">
                                                <div
                                                  style={{
                                                    marginTop: '20px',
                                                    fontWeight: 'bold'
                                                  }}
                                                >
                                                  {' '}
                                                  <b class="test-center">
                                                    <Moment format="DD MMM YYYY">
                                                      {item.createdAt}
                                                    </Moment>
                                                  </b>{' '}
                                                </div>
                                              </td>
                                              <td data-th="">
                                                <div
                                                  style={{
                                                    marginTop: '20px',
                                                    fontWeight: 'bold'
                                                  }}
                                                >
                                                  <b class="test-center">
                                                    {' '}
                                                    {item.OrderType}
                                                  </b>{' '}
                                                </div>
                                              </td>

                                              <td data-th="">
                                                <div
                                                  style={{
                                                    marginTop: '20px',
                                                    fontWeight: 'bold'
                                                  }}
                                                >
                                                  <Button
                                                    className="trackorder text-center"
                                                    color="success"
                                                    outline
                                                  >
                                                    {' '}
                                                    <b class="test-center">
                                                      {item.PaymentStatus}
                                                    </b>{' '}
                                                  </Button>
                                                </div>
                                              </td>

                                              <td data-th="">
                                                <div
                                                  style={{
                                                    marginTop: '20px',
                                                    fontWeight: 'bold'
                                                  }}
                                                >
                                                  <Link
                                                    to={`/invoice/${item._id}`}
                                                  >
                                                    <Button
                                                      className="trackorder text-center"
                                                      color="primary"
                                                      outline
                                                    >
                                                      {' '}
                                                      <b class="test-center">
                                                        {' '}
                                                        {item.Amount}
                                                      </b>{' '}
                                                    </Button>
                                                  </Link>
                                                </div>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className=" text-center mt-4">
                            <Button
                              className="Thankstrackorder"
                              color="success"
                              outline
                            >
                              Thank You . Your Order Confirmed
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
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

export default Myaccount;
