/*eslint-disable */

import React ,{useState,useEffect} from 'react'
import '../App.css'
import leftbanner from '../images/left-banner.png'
import product1 from '../images/products/product-1.png'
import product2 from '../images/products/product-2.png'
import product3 from '../images/products/product-3.png'
import product4 from '../images/products/product-4.jpg'
import categorybanner from '../images/category-banner.png'
import {useHistory, Link} from 'react-router-dom';
import api from '../../../api'

// import sdf from '../images/instagram-image/1.png'
// import productimage from './images/products/product-1.png'
import Header from '../Header'
import Footer from '../Footer'

function Category() {

  const [Product, setproduct] = useState([]);
  const [Category, setcategory] = useState([]);
  const [grid, setGrid] = useState(false);


  useEffect(() => {
    api.get('/Admin/Products/getall').then((res) => {
        let newData = res.data.List;
        console.log(`get all Product`, newData);
        // let filterData = newData && newData.filter((data) => data.IsActive);
        // setbannerImage(filterData);
        setproduct(newData)
    });

    api.get('/Admin/Category/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all Category`, newData);
      // let filterData = newData && newData.filter((data) => data.IsActive);
      // setbannerImage(filterData);
      setcategory(newData)
  });



}, []);

  return (
    <>
    <Header/>

    <section class="breadcrumb" style={{marginTop:"110px"}} >
      <div class="container">
        <div class="row">
          <h2 class="col-md-6 col-12 section-title">Category</h2>
          <ul class="col-md-6 col-12 breadcrumb-nav ml-md-auto">
          <Link to="/User/Home">Home</Link> / <Link to="/User">  Pages</Link> / <b style={{color:'#2867E5',fontSize:"18px"}}>Category</b> 
            {/* <li><a href="#">Pages</a></li>
            <li><span>Category</span></li> */}

            {/* <Link to="/User">Home</Link> / Pages / Category */}
            </ul>
        </div>
      </div>
    </section>



    <div className="category-main section-padding" >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="left-column">

            {/* <!-- search start --> */}
              <div className="left-search left-bottom-space">
                <h2 className="left-title">Search</h2>
                    <div className="search-container">
                      <form>
                        <input type="text" name="q" id="search-terms" placeholder="Search terms..." />
                        <button type="submit" name="submit" value="Go" className="search-icon"><i className="fas fa-fw fa-search"></i></button>
                      </form>
                    </div>
              </div>      
            

            
              <div className="left-categories left-bottom-space">
             
                <h2 className="left-title">Categories</h2>
                {Category.map((data) => (
                <ul>
                  <li><a href="/">{data.Name}</a><span className="count"></span></li>
                  
                </ul>
                      ))
                    }
              </div>
              
        
              {/* <!-- Categories end --> */}

              {/* <!-- left blog start --> */}
              <div className="left-blog left-bottom-space">
                <h2 className="left-title">Latest Products</h2>

                {Product.map((data) => (
                <div className="left-blog-block product-single">

            
                  <div className="left-blog-img">
                    <img src={"http://localhost:5000/" +
                                                 data.Image
                                            }  style={{
                                              width: '100px',
                                              height: '100px'
                                          }} />
                  </div>
                  <div className="left-blog-detail content">
                    <a href="/" className="title">{data.Name}</a>
                    <div className="price">
                        <span className="regular-price">{data.Price}</span>
                        <span className="discount-price">{data.Price}</span>
                    </div>
                  </div>
                </div>
              ))}
                
              </div>
             
              <div className="left-banner">
                <div className="left-banner">
                  <img src={leftbanner} alt="image" />
                  <div className="content">
                    <span>20% off</span>
                    <h5 className="section-title">Big Offer</h5>
                    <span className="shopnow"><a href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* <!-- leftbanner end --> */}

          <div className="col" style={{width: "74%"}} >
            <div className="right-column">
              <div className="category-banner" >
                  <img src={categorybanner} alt="categorybanner" style={{width:"100%"}} />
                  <div className="content">
                    <h5 className="section-title">Summer Sale Up To <br/> <span>70%</span> Off</h5>
                    <a href="/" className="shopnow">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                  </div>
              </div>
              <div className="product-page-filter">
                <select className="filter-selection">
                  <option value="" disabled selected>Filter By</option>
                  <option value="High to low">Sorting items</option>
                  <option value="Low to High">50 Products</option>
                  <option value="Low to High">100 Products</option>
                </select>
                <div className="collection-view">
                <ul>
                      <li>
                        <i
                          className="fas fa-th"
                          onClick={() => setGrid(false)}
                        ></i>
                      </li>
                      <li>
                        <i
                          className="fas fa-list-ul"
                          onClick={() => setGrid(true)}
                        ></i>
                      </li>
                    </ul>
                </div>                
              </div>

              {/* category list */}

              

              <div className='row xs=3'>
             
            
             
                
              {Category.map((data) =>  (


                  <div class="col-md-4 col-12 left-bottom-space">
                      <div class="product-single text-center">

                          <div class="thumb">
                              {/* {categorylist.map((categorylistitem)=> <Category key={categorylistitem.id} name={categorylistitem.name} image={categorylistitem.image}/>)} */}
                              <img src={"http://localhost:5000/" +
                                                 data.CategoryImage
                                            }  style={{
                                              width: '300px',
                                              height: '300px'
                                          }} />
                              <ul class="product-icons">
                              <li>
                              <Link  to={`/categorydetails/${data._id}`}>
                                  <i className="far fa-eye"></i>
                                </Link>  
                                     </li>                       {/* <li><a href="#"><i class="fas fa-shopping-cart"></i></a></li> */}
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
                              <h6 class="name"><a href="#">{data.Name}</a></h6>
                              <div class="price">
                                <span class="regular-price">{data.Price}</span>
                                <span class="discount-price">{data.Price}</span>
                              </div>
                          </div>
                      </div>

                    
                  </div>
                  

              ))}
                    
                
                </div>
               
                <div class="blog-pagination">
                <span>Showing 10-13 of 13 item(s) </span>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item page-arrow mr-2">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">Previous</span>
                        <span class="sr-only">Previous</span>
                      </a>
                    </li>
                    <li class="page-item"><a class="page-link active" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item page-arrow ml-2">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">Next</span>
                        <span class="sr-only">Next</span>
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
<Footer/>
    
    </>
  )
}

export default Category