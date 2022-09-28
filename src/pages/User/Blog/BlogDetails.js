/*eslint-disable */
import React, {useState, useEffect} from 'react';
import '../App.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';
import {useHistory, Link,useParams} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import blogimage from '../images/blog/1.jpg';
import blogimage1 from '../images/blog/2.jpg';
import blogimage2 from '../images/blog/3.jpg';
import blogimage3 from '../images/blog/4.jpg';
import leftbanner from '../images/left-banner.png';
import person1 from '../images/person1.jpg';
import person2 from '../images/person2.jpg';
import Moment from 'react-moment';
import api from '../../../api'





function BlogDetails() {

    const[fullname,setFullname] = useState('');
    const[email,setEmail] = useState('');
    const[comment,setComment] = useState('');
    const[search,setSearch] = useState('');
    const { id } = useParams();


    const [NewsEvents, setNewsEvents] = useState([]);
    const [Blog, setBlog] = useState([]);
    
    
    
    useEffect(() => {
      api.get('/Admin/NewsEvents/getall').then((res) => {
        let newData = res.data.List;
        console.log(`get all NewsEvents`, newData);
        
        setNewsEvents(newData)
      });
    
      
      api.get('/Admin/Blog/find/'+ id).then((res) => {
        let newData = res.data.Blog;
        console.log(`get all Blog`, newData);
        
        setBlog(newData)

      });
    
    
    
    
    
    
    
    
    }, []);
    




  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Blog Details</h2>
            <ul className="col-md-6 col-12 breadcrumb-nav ml-md-auto">
              <Link to="/User/Home">Home</Link> / <Link to="/User"> Pages</Link>
              <b style={{color: '#2867E5', fontSize: '18px'}}>/ Blog Details</b>
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
                      <input type="text" name="q" id="search-terms" placeholder="Search terms..." value={search} onChange={(e)=>setSearch(e.target.value)} />
                      <button type="submit" name="submit" value="Go" className="search-icon"><i className="fas fa-fw fa-search" /></button>
                    </form>
                  </div>
                </div>      
                {/* search end */}
                {/* left blog start */}
                <div className="left-blog left-bottom-space">
                  <h2 className="left-title">Recent News</h2>
{NewsEvents.map((data)=>(



                  <div className="left-blog-block">
                    <div className="left-blog-img">
                      <img src={"http://localhost:5000/"+ data.NewsEventsImage } style={{
                                              width: '100px',
                                              height: '100px'}} />
                    </div>
                    <div className="left-blog-detail">
                      <span className="date"><i className="far fa-calendar" /> <Moment format="DD MMM YYYY ">
                      {data.createdAt}
            </Moment></span>
                      <a href="#" className="title">{data.Title}</a>
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
                      <span className="shopnow"><a href="#">Read More <i className="fas fa-long-arrow-alt-right" /></a></span>
                    </div>
                  </div>
                </div>
                {/* leftbanner end */}
              </div>
            </div>
            <div className="col-md-8">
              <div className="right-column">
                <div className="row">
              

                  {/* blog-detail-blog */}
                  <div className="col-12">
                 <div className="blog-detail-block">
                   
                   <div className="blog-image">
                   
                     <img src={`http://localhost:5000/${Blog.BlogImage}`} />
                     <div className="blog-grid-date">
                        <Moment format="DD  ">
                      {Blog.createdAt}
                 </Moment><br />  <Moment format=" MMM ">
                      {Blog.createdAt}
                    </Moment>
                        </div>
                   </div>
                   <div className="blog-description">
                     <div className="blog-detail-group">
                       <span className="comment"><i className="far fa-comment-dots" />33 Comments</span>
                       <span className="likes"><i className="far fa-heart" />22 likes</span>
                     </div>
                     <a href="#" className="title">{Blog.Title}</a>
                     <p className="text2">{Blog.Discription}</p>
                   </div>
                 </div>
                    
                  </div>
                  {/* blog-detail-blog end */}
                  {/* blog social media start */}
                  <div className="blog-social mt-3 col-12 mb-4">
                    <span className="social-title ">Share:</span>
                    <ul className="social-media">
                      <li><a href="#" className="facebook mt-3"><i className="fab fa-facebook-f" /></a></li>
                      <li><a href="#" className="twitter mt-3"><i className="fab fa-twitter" /></a></li>
                      <li><a href="#" className="insta mt-3"><i className="fab fa-instagram" /></a></li>
                    </ul>
                  </div>
                  {/* blog social media end */}
                  {/* comment section start */}
                  <section className="comment col-12">
                    <h2 className="comment-title left-bottom-space">Comments</h2>
                    <div className="comment-box mb-4">
                      <div className="comment-box-inner">
                        <div className="left">
                          <img src={person2} alt="person2" />
                        </div>
                        <div className="right">
                          <span className="name">John Doe</span>
                          <span className="date">22 Dec 2019</span>
                          <p className="comment-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut ex libero. Integer ex libero, ultrices sit amet facilisis eu, aliquet id dolor</p>
                          <a href="#" className="cmt-replay"><i className="fas fa-reply" />Replay</a>                        
                        </div>
                      </div>
                    </div>
                    <div className="comment-box mb-4 replay-secn">
                      <div className="comment-box-inner">
                        <div className="left">
                          <img src={person1} alt="person1" />
                        </div>
                        <div className="right">
                          <span className="name">Leris Mack</span>
                          <span className="date">22 Dec 2019</span>
                          <p className="comment-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut ex libero. Integer ex libero, ultrices sit amet facilisis eu, aliquet id dolor</p>
                          <a href="#" className="cmt-replay"><i className="fas fa-reply" />Replay</a>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* comment section end */}
                  {/* comment form start */}
                  <section className="comment-form col-12 section-padding">
                    <div className="section-header">
                      <h2 className="section-title">Leave Comments</h2>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-md-6 col-12 form-group">
                          <input type="text" name="name" className="form-control" placeholder="Full Name" value={fullname} onChange={(e)=>setFullname(e.target.value)} />
                        </div>
                        <div className="col-md-6 col-12 form-group">
                          <input type="email" name="email" className="form-control" placeholder="Email Id" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="col-12 form-group">
                          <textarea className="form-control" rows={4} placeholder="Comment" defaultValue={""}  value={comment} onChange={(e)=>setComment(e.target.value)} />
                        </div>
                      </div>
                      <a href="#" className="tx-ctm-btn">Send Message <i className="fas fa-long-arrow-alt-right" /></a>
                    </form>
                  </section>
                  {/* comment form end */}
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

export default  BlogDetails;
