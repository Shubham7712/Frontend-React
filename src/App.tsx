/*eslint-disable*/

import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Category from '@pages/Category';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import UserPublicRoute from './routes/UserPublicRoute';
import UserPrivateRoute from './routes/UserPrivateRoute';

import Product from '@pages/Product';
import Banner from '@app/pages/Banner';
import Testimonial from '@pages/Testimonial';
import Brand from '@pages/Brand';
import CMS from '@pages/CMS';
import UserManagement from '@pages/UserManagement';
import NewsEvent from '@pages/NewsEvent';
import Blog from '@pages/Blog';
import NewsLetters from './pages/NewsLetters';
import Discount from './pages/Discount';
import Coupon from '@pages/Coupon';
import Contact from '@pages/Contact';
import ContactUs from '@pages/ContactUs';
import Role from '@pages/Role';
import OrderStatus from '@pages/OrderStatus';
import Order from '@pages/Order';
import OrderDetails from '@pages/OrderDetails';
import GetAllOrderDetails from '@pages/GetAllOrderDetails';
import Rating from '@pages/Rating';
import PaymentDetails from '@pages/PaymentDetails';
import Notification from '@pages/Notification';
import FAQ from '@pages/FAQ';
import UserCategory from './pages/User/Category/Category';
import UserHome from './pages/User/HomePage/Home';
import UserProducts from './pages/User/Product/Product';
import UserOrders from './pages/User/Order/Order';

import UserContactUs from './pages/User/ContactUs/ContactUs';
import AboutUs from './pages/User/AboutUs/AboutUs';
import Faq from './pages/User/FAQ/Faq';
import BlogDetails from './pages/User/Blog/BlogDetails';
import UserBlog from './pages/User/Blog/Blog';
import ProductDetails from './pages/User/Product/Productdetails';
import MyAccount from './pages/User/MyAccount/Myaccount';
// import Checkout from './pages/User/Checkout/Checkout';
import BadRequestPage from './pages/User/404Page/BadRequest';
import Cart from './pages/User/Cart/AddToCart';
import UserLogin from './pages/User/Login/Login';
import WishList from './pages/User/WishList/WishList'
import Registration from './pages/User/Registration/Registration'
import UserProfile from './pages/User/Profile/UserProfile'
import Invoice from './pages/User/Invoice/Invoice'
import UserCategoryDetails from './pages/User/Category/CategoryDetails';




const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/admin/login" element={<PublicRoute />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>
        <Route path="/admin/register" element={<PublicRoute />}>
          <Route path="/admin/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route> */}

        <Route path="/" element={<PublicRoute />}>
        {/* <Route path="/" element={<Main />}> */}
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/product" element={<UserProducts />} />
        <Route path="/product/:id" element={<UserProducts />} />

        <Route path="/contactus" element={<UserContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blogdetails" element={<BlogDetails />} />
        <Route path="/blog" element={<UserBlog />} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/signup" element={<Registration />} />

        
        <Route path="/category" element={<UserCategory />} />
        <Route path="/categorydetails" element={<UserCategoryDetails />} />
        <Route path="/categorydetails/:id" element={<UserCategoryDetails />} />





        <Route path="/admin" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        {/* </Route> */}
      </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path='/Admin/category' element={<Category/>}/>
            <Route path='/Admin/product' element={<Product/>}/>
            <Route path='/Admin/banner' element={<Banner/>}/>
            <Route path='/Admin/testimonial' element={<Testimonial/>}/>
            <Route path='/Admin/brand' element={<Brand/>}/>
            <Route path='/Admin/cms' element={<CMS/>}/>
            <Route path='/Admin/usermanagement' element={<UserManagement/>}/>
            <Route path='/Admin/newsevents' element={<NewsEvent/>}/>
            <Route path='/Admin/blog' element={<Blog/>}/>
            <Route path='/Admin/newsletters' element={<NewsLetters/>}/>
            <Route path='/Admin/discount' element={<Discount/>}/>
            <Route path='/Admin/coupon' element={<Coupon/>}/>
            <Route path='/Admin/contact' element={<Contact/>}/>
            <Route path='/Admin/contactus' element={<ContactUs/>}/>
            <Route path='/Admin/role' element={<Role/>}/>
            <Route path='/Admin/orderstatus' element={<OrderStatus/>}/>
            <Route path='/Admin/order' element={<Order/>}/>
            {/* {/ <Route path='/Admin/orderdetails' element={<OrderDetails/>}/> /} */}
            <Route path='/Admin/orderdetails/:id' element={<OrderDetails/>}/>
            <Route path='/Admin/getallorderdetail' element={<GetAllOrderDetails/>}/>
            <Route path='/Admin/rating' element={<Rating/>}/>
            <Route path='/Admin/paymentdetails' element={<PaymentDetails/>}/>
            <Route path='/Admin/notification' element={<Notification/>}/>
            <Route path = '/Admin/faq' element={<FAQ/>}/>

          </Route>
        </Route>


        {/* <Route path="/" element={<UserPublicRoute />}>
      
          </Route> */}


        <Route path="/" element={<UserPrivateRoute />}>
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                <Route path="/order" element={<UserOrders />} />
                <Route path="/order/:id" element={<UserOrders />} />
                <Route path="/myaccount/:id" element={<MyAccount />} />
                {/* <Route path="/checkout/:id" element={<Checkout />} /> */}
                <Route path="/404" element={<BadRequestPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/invoice/:id" element={<Invoice />} />

        </Route>

        {/* <Route path="/" element={<UserHome />} /> */}

      </Routes>

      

    </BrowserRouter>
  );
};

export default App;
