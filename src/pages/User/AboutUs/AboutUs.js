/*eslint-disable */
import React, {useState, useEffect} from 'react';
import '../App.css';
import api from '../../../api';

import aboutbanner from '../images/about-banner.png';
import sign from '../images/sign.png';
import teammember1 from '../images/team-1.png';
import teammember2 from '../images/team-2.png';
import teammember3 from '../images/team-3.png';
import teammember4 from '../images/team-4.png';
// import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import {easeQuadInOut} from 'd3-ease';

// import ChangingProgressProvider from './ChangingProgressProvider';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {useHistory, Link} from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

function AboutUs() {
  const fontWeight = () => {
    fontWeight: 700;
  };
  const [percentage, setPercentage] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [percentage3, setPercentage3] = useState(0);
  const [Cms, setcms] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 80) {
        setPercentage(percentage + 1);
      }
    }, 20);
    setTimeout(() => {
      if (percentage1 < 50) {
        setPercentage1(percentage1 + 1);
      }
    }, 20);
    setTimeout(() => {
      if (percentage2 < 60) {
        setPercentage2(percentage2 + 1);
      }
    }, 20);
    setTimeout(() => {
      if (percentage3 < 70) {
        setPercentage3(percentage3 + 1);
      }
    }, 20);
  }, [percentage, percentage1, percentage2, percentage3]);

  useEffect(() => {
    api.get('/Admin/CMS/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all cms`, newData);
      // let filterData = newData && newData.filter((data) => data.IsActive);
      // setbannerImage(filterData);
      setcms(newData);
    });
  }, []);

  return (
    <>
      <Header />
      {/* About Us page heading */}
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">About Us</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/">Home</Link> / <Link to="/"> Pages</Link>{' '}
              <b style={{color: '#2867E5', fontSize: '18px'}}>/ About Us</b>
              {/* <li><a href="#">Pages</a></li>
            <li><span>Category</span></li> */}
              {/* <Link to="/User">Home</Link> / Pages / Category */}
            </ul>
          </div>
        </div>
      </section>

      <div>
        <section className="about-inner-section section-padding">
          <div className="container">
            {Cms.map((data) => (
              <div className="row">
                <div className="col-xl-5 col-md-5 col-12 mb-md-0 mb-sm-5">
                  <div className="about-left-side">
                    <div className="img-inner">
                      <img
                        src={'http://localhost:5000/' + data.CmsImage}
                        style={{hight: '400px', width: '500px'}}
                      />
                    </div>
                    <span className="offer">For A Better Future</span>
                  </div>
                </div>
                <div className="col-xl-7 col-md-7 col-12 pl-md-5 pl-3">
                  <div className="section-header text-left">
                    <h2 className="section-title" style={fontWeight()}>
                      {data.Contended && data.Contended}
                    </h2>
                  </div>
                  <div className="about-content">
                    <p>{data.OfferTitle && data.OfferTitle}</p>
                    <div className="sign">
                      <h5 className="name">- Lizel Grick</h5>
                      <img src={sign} alt="image" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/*================= about section end =================*/}
        {/*================= Countdown section start =================*/}
        <section className="countdown">
          <div className="countdown-inner section-padding">
            <div className="container">
              <div className="section-header text-center">
                <h2 className="section-title" style={fontWeight()}>
                  Our Skill
                </h2>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-6 col-12 mb-md-0 mb-xs-3">
                  <div
                    className="countdown-box progressbar"
                    data-animate="false"
                  >
                    <div style={{width: 130}}>
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                      />
                    </div>

                    <div />
                    <p className="text">Marketing</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-md-0 mb-xs-3">
                  <div
                    className="countdown-box progressbar"
                    data-animate="false"
                  >
                    <div style={{width: 130}}>
                      <CircularProgressbar
                        value={percentage1}
                        text={`${percentage1}%`}
                      />
                    </div>
                    <div />
                    <p className="text">Product Quality</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-md-0 mb-xs-3">
                  <div
                    className="countdown-box progressbar"
                    data-animate="false"
                  >
                    <div style={{width: 130}}>
                      <CircularProgressbar
                        value={percentage2}
                        text={`${percentage2}%`}
                      />
                    </div>
                    <div />
                    <p className="text">Production Speed</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-md-0 mb-xs-3">
                  <div
                    className="countdown-box progressbar"
                    data-animate="false"
                  >
                    <div style={{width: 130}}>
                      <CircularProgressbar
                        value={percentage3}
                        text={`${percentage3}%`}
                      />
                    </div>
                    <div />
                    <p className="text">Product Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*================= Countdown section end =================*/}
        {/*================= team section start =================*/}
        {/* <section className="team-section section-padding">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-12">
                <div className="section-header text-center">
                  <h2 className="section-title" style={fontWeight()}>
                    Our Members
                  </h2>
                </div>
                <div className="row justify-content-between">
                  <div className="col-lg-3 col-sm-6 mb-md-0 mb-sm-3">
                    <div className="team-single text-center">
                      <div className="thumb">
                        <img src={teammember1} alt="team-image" />
                      </div>
                      <div className="content text-left">
                        <h6 className="name">Steve John</h6>
                        <span className="designation">
                          Professional Trainer
                        </span>
                        <ul className="team-social-link">
                          <li>
                            <a href="#" className="facebook">
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="twitter">
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="google">
                              <i className="fab fa-google-plus-g" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="linkedin">
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 mb-md-0 mb-sm-3">
                    <div className="team-single text-center">
                      <div className="thumb">
                        <img src={teammember2} alt="team-image" />
                      </div>
                      <div className="content text-left">
                        <h6 className="name">Steve John</h6>
                        <span className="designation">
                          Professional Trainer
                        </span>
                        <ul className="team-social-link">
                          <li>
                            <a href="#" className="facebook">
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="twitter">
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="google">
                              <i className="fab fa-google-plus-g" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="linkedin">
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 mb-md-0 mb-sm-3 ">
                    <div className="team-single text-center">
                      <div className="thumb">
                        <img src={teammember3} alt="team-image" />
                      </div>
                      <div className="content text-left">
                        <h6 className="name">Steve John</h6>
                        <span className="designation">
                          Professional Trainer
                        </span>
                        <ul className="team-social-link">
                          <li>
                            <a href="#" className="facebook">
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="twitter">
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="google">
                              <i className="fab fa-google-plus-g" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="linkedin">
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 mb-md-0 mb-sm-3">
                    <div className="team-single text-center">
                      <div className="thumb">
                        <img src={teammember4} alt="team-image" />
                      </div>
                      <div className="content text-left">
                        <h6 className="name">Steve John</h6>
                        <span className="designation">
                          Professional Trainer
                        </span>
                        <ul className="team-social-link">
                          <li>
                            <a href="#" className="facebook">
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="twitter">
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="google">
                              <i className="fab fa-google-plus-g" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="linkedin">
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/*================= team section end =================*/}
        <section className="services-inner-pages pb-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-header text-center">
                  <h4 className="section-title">Our Services</h4>
                </div>
                <div className="row justify-content-between">
                  <div className="col-md-3 col-sm-6 col-12 mb-sm-3">
                    <div className="service-inner-content">
                      <h5
                        className="title"
                        style={{fontWeight: 700, fontSize: '18px'}}
                      >
                        <span style={{fontSize: '14px'}}>01</span>
                        <i className="fas fa-globe-asia" />
                      </h5>
                      <h4
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          fontFamily: 'cambria'
                        }}
                      >
                        International Shipping
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisqueut ex libero. Integer ex libero, ultrices sit
                        amet facilisis eu.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 col-12 mb-sm-3">
                    <div className="service-inner-content">
                      <h5
                        className="title"
                        style={{fontWeight: 700, fontSize: '18px'}}
                      >
                        <span style={{fontSize: '14px'}}>02</span>
                        <i className="fas fa-user-friends" />
                      </h5>
                      <h4
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          fontFamily: 'cambria'
                        }}
                      >
                        Customer Care
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisqueut ex libero. Integer ex libero, ultrices sit
                        amet facilisis eu.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 col-12 mb-sm-3">
                    <div className="service-inner-content">
                      <h5
                        className="title"
                        style={{fontWeight: 700, fontSize: '18px'}}
                      >
                        <span style={{fontSize: '14px'}}>03</span>
                        <i className="fas fa-money-bill-wave" />
                      </h5>
                      <h4
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          fontFamily: 'cambria'
                        }}
                      >
                        Secured Payment
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisqueut ex libero. Integer ex libero, ultrices sit
                        amet facilisis eu.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 col-12 mb-sm-3">
                    <div className="service-inner-content">
                      <h5
                        className="title"
                        style={{fontWeight: 700, fontSize: '18px'}}
                      >
                        <span style={{fontSize: '14px'}}>04</span>
                        <i className="fas fa-question" />
                      </h5>
                      <h4
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          fontFamily: 'cambria'
                        }}
                      >
                        24/7 Support
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisqueut ex libero. Integer ex libero, ultrices sit
                        amet facilisis eu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
