/*eslint-disable */

import React, {Fragment, useState, useEffect, useRef} from 'react';
import '../App.css';
import leftbanner from '../images/left-banner.png';
import product1 from '../images/products/product-1.png';
import product2 from '../images/products/product-2.png';
import product3 from '../images/products/product-3.png';
import product4 from '../images/products/product-4.jpg';
import swal from 'sweetalert';
// import sdf from '../images/instagram-image/1.png'
// import productimage from './images/products/product-1.png'
import Header from '../Header';
import Footer from '../Footer';
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
  Card
} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import api from '../../../api';
import 'react-datepicker/dist/react-datepicker.css';

const SignupSchema = yup.object().shape({
  Email: yup.string().email("Please enter email address'").required('Required'),
  Password: yup
    .string()
    .min(5, 'Must be 5 characters or more')
    .max(30, 'Must be 30 characters or less')
    .required('Please Enter Password')
});
function Login() {
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: 'onBlur',
    defaultValues: {Email: '', Password: ''},
    resolver: yupResolver(SignupSchema)
  });
  const navigate = useNavigate();

  // const [isAuthLoading, setAuthLoading] = useState(false);

  const active = 'active';
  //   const [startDate, setStartDate] = useState(new Date());

  const onSubmit = (data) => {
    let postData = {
      Email: data.Email,
      Password: data.Password,

      IsActive: true
    };

    try {
      // setAuthLoading(true);
      api.post('Admin/User/login', postData).then((res) => {
        // settoken(true);
        console.log(`API--CALLING--------------`, res.data);

        // console.log(`ASSDDDDDDDDDDD`,res.data.data.Role.Name);
            
        if (res.data.status == true && res.data.data.Role.Name == 'User') {
          localStorage.setItem('usertoken', res.data.Token);
          localStorage.setItem('userid', res.data.data._id);
         
          swal(`Login Sucessfully ${res.data.data.FirstName}`, "", "success");

          //   setAuthLoading(false);

          //   dispatch(loginUser(res.data));
          navigate('/');
        } else {
          //   setAuthLoading(false);
         
          swal("Login not succeed", "", "error");

          localStorage.setItem('usertoken', null);
          localStorage.setItem('userid', null);
          navigate('/login');
        }
      });
      // setstatus(false);

      // const token = await AuthService.loginByAuth(email, password);
      // toast.success('Login is succeed!');
      // setAuthLoading(false);
      // dispatch(loginUser(token));
      // navigate('/');
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Log in</h2>
          </div>
        </div>
      </section>

      <section className="myaccount section-padding">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="tabbable-panel">
                <div className="tabbable-line">
                  <div className="tab-content">
                    <div className="tab-pane active" id="tab_default_1">
                      <div className="contact-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row">
                            <div className="col-6 form-group">
                              <Label className="form-label" for="Email">
                                Email*
                              </Label>
                              <Controller
                                control={control}
                                id="Email"
                                name="Email"
                                render={({field}) => (
                                  <Input
                                    maxLength={50}
                                    placeholder=" Email "
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
                          </div>
                          <div className="row">
                            <div className="col-6 form-group">
                              <Label className="form-label" for="Password">
                                Password*
                              </Label>
                              <Controller
                                control={control}
                                id="Password"
                                name="Password"
                                render={({field}) => (
                                  <Input
                                    type="password"
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
                          </div>
                          <div className="form-group">
                            <Button
                              id="submit"
                              type="submit"
                              name="submit"
                              className="tx-ctm-btn "
                            >
                              Login
                              <i className="fas fa-long-arrow-alt-right ml-1 " />
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
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
export default Login;
