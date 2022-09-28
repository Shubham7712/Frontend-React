/*eslint-disable */
import React, {useState, useEffect} from 'react';
import '../App.css';

import 'react-circular-progressbar/dist/styles.css';

import 'react-circular-progressbar/dist/styles.css';

import {useHistory, Link} from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import image1 from '../images/blog/1.jpg';
import image2 from '../images/blog/2.jpg';
import image3 from '../images/blog/3.jpg';
import image4 from '../images/blog/4.jpg';
import image5 from '../images/blog/5.jpg';
import leftbanner from '../images/left-banner.png';
import Moment from 'react-moment';
import api from '../../../api';

function Blog() {
  const [search, setSearch] = useState('');
  const [NewsEvents, setNewsEvents] = useState([]);
  const [Blog, setBlog] = useState([]);

  useEffect(() => {
    api.get('/Admin/NewsEvents/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all NewsEvents`, newData);

      setNewsEvents(newData);
    });

    api.get('/Admin/Blog/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all Blog`, newData);

      setBlog(newData);
    });
  }, []);

  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Blog </h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/">Home</Link> / <Link to="/"> Pages</Link>
              <b style={{color: '#2867E5', fontSize: '18px'}}>/ Blog</b>
            </ul>
          </div>
        </div>
      </section>
      <section className="blog-main section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="left-column">
                {/* search start */}
                <div className="left-search left-bottom-space">
                  <h2 className="left-title">Search</h2>
                  <div className="search-container">
                    <form>
                      <input
                        type="text"
                        name="q"
                        id="search-terms"
                        placeholder="Search terms..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button
                        type="submit"
                        name="submit"
                        value="Go"
                        className="search-icon"
                      >
                        <i className="fas fa-fw fa-search" />
                      </button>
                    </form>
                  </div>
                </div>
                {/* search end */}
                {/* left blog start */}
                <div className="left-blog left-bottom-space">
                  <h2 className="left-title">Recent News</h2>
                  {NewsEvents.map((data) => (
                    <div className="left-blog-block">
                      <div className="left-blog-img">
                        <img
                          src={'http://localhost:5000/' + data.NewsEventsImage}
                          style={{
                            width: '100px',
                            height: '100px'
                          }}
                        />
                      </div>
                      <div className="left-blog-detail">
                        <span className="date">
                          <i className="far fa-calendar" />
                          <Moment format="DD MMM YYYY">{data.createdAt}</Moment>
                        </span>
                        <a href="#" className="title">
                          {data.Title}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* left blog end */}

                {/* leftbanner start */}
                <div className="left-banner">
                  <div className="left-banner">
                    <img src={leftbanner} alt="image" />
                    <div className="content">
                      <span>20% off</span>
                      <h5 className="section-title">Big Offer</h5>
                      <span className="shopnow">
                        <a href="#">
                          Read More{' '}
                          <i className="fas fa-long-arrow-alt-right" />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                {/* leftbanner end */}
              </div>
            </div>
            <div className="col-md-8">
              <div className="right-column">
                <div className="row">
                  {Blog.map((data) => (
                    <div className="col-md-6 col-12 left-bottom-space">
                      {/* Link to Get By id Blog and show BlogDetails */}
                      <Link to={`/BlogDetails/${data._id}`}>
                        <div className="blog-detail-block">
                          <div className="blog-image">
                            <img
                              src={'http://localhost:5000/' + data.BlogImage}
                              style={{
                                width: '400px',
                                height: '350px'
                              }}
                            />
                            <div className="blog-grid-date">
                              <Moment format="DD  ">{data.createdAt}</Moment>
                              <br />{' '}
                              <Moment format=" MMM ">{data.createdAt}</Moment>
                            </div>
                          </div>
                          <div className="blog-description">
                            <div className="blog-detail-group">
                              <span className="comment">
                                <i className="far fa-comment-dots" />
                                33 Comments
                              </span>
                              <span className="likes">
                                <i className="far fa-heart" />
                                22 likes
                              </span>
                            </div>
                            <a href="#" className="title">
                              {data.Title}
                            </a>
                            <p className="text2">{data.Discription}</p>
                            <a href="#" className="blog-btn">
                              Read More{' '}
                              <i className="fas fa-long-arrow-alt-right" />
                            </a>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
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
                {/* Pagination end */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Blog;
