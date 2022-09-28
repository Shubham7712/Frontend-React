/*eslint-disable */
import React, {useEffect, useState} from 'react';
import '../App.css';
// import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';

import api from '../../../api';
import {useHistory, Link} from 'react-router-dom';

// import sdf from '../images/instagram-image/1.png'
// import productimage from './images/products/product-1.png'
import Header from '../Header';
import Footer from '../Footer';
import {title} from 'process';

function Faq() {
  // const categorylist = [
  //   {id:1, name:'T-Shirt', image:'./images/products/product-1.png'}
  // ]
  const [active, setActive] = useState();
  const [desc, setDesc] = useState([]);

  const [apidata, setApidata] = useState([]);
  const [demo, setdemo] = useState(0);
  // console.log(desc);
  const activeClass = 'active ';

  useEffect(() => {
    api.post('/Admin/FAQ/GetAll').then((res) => {
      setApidata(res.data.data);
      setDesc(res.data.data[0]);

      // console.log("res.data",res.data);
    });
  }, []);

  return (
    <>
      <Header />
      {/* About Us page heading */}
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Faq</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/">Home</Link> / <Link to="/"> Pages</Link>
              <b style={{color: '#2867E5', fontSize: '18px'}}>/ Faq</b>
            </ul>
          </div>
        </div>
      </section>

      <section className="faq-inner-pages section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <div className="row justify-content-between ">
                <div className="col-md-5 col-12 mb-sm-3 ">
                  <ul className="nav nav-tabs ">
                    {apidata.map((data, index) => (
                      <li className="active" key={index + 1}>
                        <a
                          className={data._id === desc._id && activeClass}
                          onClick={() => setDesc(data)}
                        >
                          {data.Title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-7 col-12">
                  <div className="tab-content">
                    <div className="tab-pane active">
                      <h5 className="title mb-4">{desc.Title}</h5>

                      {desc.Discription}
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

export default Faq;
