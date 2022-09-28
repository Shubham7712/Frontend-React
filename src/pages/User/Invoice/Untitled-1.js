/*eslint-disable */

import React, {useState, useEffect} from 'react';
import '../App.css';
import leftbanner from '../images/left-banner.png';
import product1 from '../images/products/product-1.png';
import product2 from '../images/products/product-2.png';
import product3 from '../images/products/product-3.png';
import product4 from '../images/products/product-4.jpg';
import categorybanner from '../images/category-banner.png';
import {useHistory, Link} from 'react-router-dom';

// import sdf from '../images/instagram-image/1.png'
// import productimage from './images/products/product-1.png'
import Header from '../Header';
import Footer from '../Footer';
import DatePicker from "react-datepicker";

import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {Form, InputGroup} from 'react-bootstrap';
import * as AuthService from '../../../services/auth';
import api from '../../../api';
import "react-datepicker/dist/react-datepicker.css";

function Login() {

    const [isAuthLoading, setAuthLoading] = useState(false);

  const active = 'active';
  const [startDate, setStartDate] = useState(new Date());
  

    let loginData = { Email, Password }

    let data = {};

    try {
      // setAuthLoading(true);
      api.post("Admin/User/login", loginData).then((res)=>{
        settoken(true);
        console.log(`DHDHD LOSHSGHSHSHSH--------------`,res.data);

        // console.log(`ASSDDDDDDDDDDD`,res.data.data.Role.Name);
        
        if((res.data.status == true) && (res.data.data.Role.Name == "Admin"))
        {
          toast.success('Login is succeed!');
          setAuthLoading(false);
  
          dispatch(loginUser(res.data));
          navigate('/admin/dashboard');

          
        }
        else
        {
          setAuthLoading(false);
          toast.error('Login not succeed!'|| 'Failed');
          console.log("called");
          
        }
      })
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
  


    const {handleChange, values, handleSubmit, touched, errors} = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required')
        }),
        onSubmit: (values) => {
          login(values.email, values.password);
        }
      });



      
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
                          <form id="contact" name="contact" method="post">
                            <div className="row">
                              
                              
                              <div className="col-6 form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  autoComplete="off"
                                  placeholder="E-mail"
                                  required
                                />
                              </div>
                              </div>
                              <div className="row">
                              <div className="col-6 form-group">
                                <label>Password</label>
                                <input
                                  type="text"
                                  name="newpassword"
                                  id="newpassword"
                                  autoComplete="off"
                                  placeholder="Enter your new password"
                                  required
                                />
                              </div>
                              
                            </div>
                            <div className="form-group">
                              <button
                                id="submit"
                                type="submit"
                                name="submit"
                                className="tx-ctm-btn "
                              >
                               Login
                                <i className="fas fa-long-arrow-alt-right ml-1 " />
                              </button>
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
