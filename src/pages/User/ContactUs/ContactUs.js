/*eslint-disable */
import React, {useEffect, useState} from 'react';
import '../App.css';
import contactbottom from '../images/contact-bottom.png';
import {useHistory, Link} from 'react-router-dom';

import api from '../../../api';

import Header from '../Header';
import Footer from '../Footer';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {
  const [apidata, setApidata] = useState([]);

  const latitude = 7.203201;
  const longitude = 10.201203;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: {errors}
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    api
      .post('/Admin/ContactUs/create', {
        Name: data.name,
        Email: data.email,
        Subject: data.subject,
        Message: data.message,
        latitude: latitude,
        longitude: longitude
      })
      .then((res) => {
        // console.log(res);
        toast('Contact Submitted');
      });
    reset();
  };

  const OnSubmitted = () => {
    console.log('api is called ');

    api
      .post('/Admin/ContactUs/create', {
        Name: yourName,
        Email: email,
        Subject: subject,
        Message: message,
        latitude: latitude,
        longitude: longitude
      })
      .then((res) => {
        toast('Contact Submitted');
      });
  };

  useEffect(() => {
    api.get('/Admin/Contact/getall').then((res) => {
      let newData = res.data.List;
      setApidata(newData);
    });
  }, []);

  return (
    <>
      <Header />

      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Contact Us</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/">Home</Link> / <Link to="/"> Pages</Link>{' '}
              <b style={{color: '#2867E5', fontSize: '18px'}}>/ Contact Us</b>
              {/* <li><a href="#">Pages</a></li>
            <li><span>Category</span></li> */}
              {/* <Link to="/User">Home</Link> / Pages / Category */}
            </ul>
          </div>
        </div>
      </section>
      <section className="contact section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row justify-content-between">
                <div className="col-12">
                  <h5 className="mb-4">Hello, Let’s Get In Touch</h5>
                </div>
                <div className="col-md-6 col-12">
                  <div className="contact-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-12 form-group">
                          <label>Name*</label>
                          <input
                            {...register('name', {
                              required: 'Please enter Your name '
                            })}
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            placeholder="Name"
                          />
                          {errors.name && (
                            <small className="text-danger ml-2 h6">
                              {errors.name.message}
                            </small>
                          )}
                        </div>
                        <div className="col-12 form-group">
                          <label>Email*</label>
                          <input
                            {...register('email', {
                              required: 'Please enter your email',
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please Enter Valid email Address'
                              }
                            })}
                            onKeyUp={() => {
                              trigger('email');
                            }}
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="off"
                            placeholder="E-mail"
                          />
                          {errors.email && (
                            <small className="text-danger ml-2 h6">
                              {errors.email.message}
                            </small>
                          )}
                        </div>
                        <div className="col-12 form-group">
                          <label>Subject*</label>
                          <input
                            {...register('subject', {
                              required: ' Please enter subject  '
                            })}
                            type="text"
                            name="subject"
                            id="subject"
                            autoComplete="off"
                            placeholder="Subject"
                          />
                          {errors.subject && (
                            <small className="text-danger ml-2 h6">
                              {errors.subject.message}
                            </small>
                          )}
                        </div>
                        <div className="col-12 form-group">
                          <label>Message*</label>
                          <textarea
                            {...register('message', {
                              required: 'Please enter message ',
                              minLength: {
                                value: 10,
                                message: 'Minimum required lenght is 10'
                              },
                              maxLength: {
                                value: 255,
                                message: 'Maximum allowed length is 255 '
                              }
                            })}
                            name="message"
                            id="message"
                            autoComplete="off"
                            placeholder="Message"
                          />
                          {errors.message && (
                            <small className="text-danger ml-2 h6">
                              {errors.message.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          id="submit"
                          type="submit"
                          name="submit"
                          className="tx-ctm-btn"
                        >
                          submit <i className="fas fa-long-arrow-alt-right" />
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9552224.787705228!2d-13.426668188757661!3d54.23166430480309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2sin!4v1583297517795!5m2!1sen!2sin"
                      width={600}
                      height={450}
                      style={{border: 0}}
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="contact-info section-bg">
                    {apidata.map((data) => (
                      <div className="contact-inner">
                        <div className="content mt-3">
                          <h6 className="title mb-3">Address</h6>
                          <span>
                            <p>{data.Address}</p>
                          </span>
                        </div>
                        <div className="content mt-3">
                          <h6 className="title mb-3">Store Hours</h6>
                          <span>Monday - Saturday</span>
                          <span>
                            {data.StartTime} am - {data.EndTime} pm
                          </span>
                        </div>
                        <div className="content mt-3">
                          <h6 className="title mb-3">Support</h6>
                          <span>
                            <a href="yourcompany@gmail.com">{data.Email}</a>
                          </span>
                          {/* <span>+123456789</span> */}
                        </div>
                        <div className="img">
                          <img src={contactbottom} alt="image" />
                        </div>
                      </div>
                    ))}
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

export default Category;
