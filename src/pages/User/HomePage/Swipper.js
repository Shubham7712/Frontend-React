/*eslint-disable*/

import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
// Import Swiper styles
import 'swiper/swiper.min.css';
// import "swiper/css/navigation";
import api from '../../../api';
// import "./styles.css";
import LeftArrowImage from '../images/cms-1.png';
import RightArrowImage from '../images/cms-2.png';
// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper';
// import Loader from "../Loader/loader"
import Skeleton from '@mui/material/Skeleton';
import {Link} from 'react-router-dom';
import DefaultImage from '../../../Images/download.png';

export default function App() {
  const [Brand, setBrand] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    api.get('/Admin/Brand/getall').then((res) => {
      let newData = res.data.List;
      console.log(`get all Brand`, newData);
      // let filterData = newData && newData.filter((data) => data.IsActive);
      // setbannerImage(filterData);
      setBrand(newData);
    });
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        slidesPerGroup={1}
        // loop={true}
        loopFillGroupWithBlank={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current
        }}
        // autoplay={{
        //   delay: 1000,
        //   disableOnInteraction: false
        // }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {Brand.map((item) => {
          return (
            <>
              <SwiperSlide>
                {loader ? (
                  <>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={150}
                      height={100}
                    />
                  </>
                ) : (
                  <>
                    <Link to={`/User/Brand/${item._id}`}>
                      {!item.BrandImage ||
                      item.BrandImage === undefined ||
                      item.BrandImage === null ||
                      item.BrandImage === '' ? (
                        <img
                          className="carousel-image"
                          src={DefaultImage}
                          style={{width: '150px', height: '100px'}}
                        />
                      ) : (
                        <img
                          className="carousel-image"
                          src={`http://localhost:5000/${item.BrandImage}`}
                          style={{width: '200px', height: '150px'}}
                        />
                      )}
                    </Link>
                  </>
                )}
                {/* {/ <p style={{marginLeft : "20px"}}>{item.Name}</p>  /} */}
              </SwiperSlide>
              {/* <div ref={navigationPrevRef} >
                            <a> <img className='text-center' src={LeftArrowImage} alt="..." style={{width:"120px"}}/> </a> 
 </div>

 <div ref={navigationNextRef} >
                            <a> <img src={RightArrowImage} alt="..." style={{width:"120px"}}/> </a>
 </div> */}
            </>
          );
        })}
      </Swiper>
    </>
  );
}
