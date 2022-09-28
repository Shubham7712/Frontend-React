/*eslint-disable*/  
import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';

export interface IMenuItem {
  name: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: 'menusidebar.label.dashboard',
    path: '/admin/dashboard'
  },
  // {
  //   name: 'menusidebar.label.blank',
  //   path: '/blank'
  // },
  {
    name: 'menusidebar.label.banner',
    path: '/admin/banner'
  },
  {
    name: 'menusidebar.label.testimonial',
    path: '/admin/testimonial'
  },
  {
    name: 'menusidebar.label.cms',
    path: '/admin/cms'
  },
  // {
  //   name: 'menusidebar.label.orderdetails',
  //   path: '/admin/orderdetails'
  // },
  // {
  //   name: 'menusidebar.label.getallorderdetail',
  //   path: '/admin/getallorderdetail'
  // },
  {
    name: 'menusidebar.label.paymentdetails',
    path: '/admin/paymentdetails'
  },
  {
    name: 'menusidebar.label.notification',
    path: '/admin/notification'
  },
  {
    name: 'menusidebar.label.faq',
    path: '/admin/faq'
  },
  {
    name: 'menusidebar.label.newsevents',
    children: [
      {
        name: 'menusidebar.label.newsevents',
        path: '/admin/newsevents'
      },
      {
        name: 'menusidebar.label.blog',
        path: '/admin/blog'
      },
      {
        name: 'menusidebar.label.newsletters',
        path: '/admin/newsletters'
      }
    ]
  },
  {
    name: 'menusidebar.label.category',
    children: [
      {
        name: 'menusidebar.label.category',
        path: '/admin/category'
      },
      {
        name: 'menusidebar.label.product',
        path: '/admin/product'
      },
      {
        name: 'menusidebar.label.brand',
        path: '/admin/brand'
      },
      {
        name: 'menusidebar.label.rating',
        path: '/admin/rating'
      },
      {
        name: 'menusidebar.label.discount',
        path: '/admin/discount'
      },
      {
        name: 'menusidebar.label.coupon',
        path: '/admin/coupon'
      }
    ]
  },
  {
    name: 'menusidebar.label.role',
    children: [
      {
        name: 'menusidebar.label.usermanagement',
        path: '/admin/usermanagement'
      },
      {
        name: 'menusidebar.label.role',
        path: '/admin/role'
      }
    ]
  },
  {
    name: 'menusidebar.label.contact',
    children: [
      {
        name: 'menusidebar.label.contact',
        path: '/admin/contact'
      },
      {
        name: 'menusidebar.label.contactus',
        path: '/admin/contactus'
      }
    ]
  },
  {
    name: 'menusidebar.label.order',
    children: [
      {
        name: 'menusidebar.label.orderstatus',
        path: '/admin/orderstatus'
      },
      {
        name: 'menusidebar.label.order',
        path: '/admin/order'
      }
    ]
  },
  {
    name: 'menusidebar.label.mainMenu',
    children: [
      {
        name: 'menusidebar.label.subMenu',
        path: '/sub-menu-1'
      },

      {
        name: 'menusidebar.label.blank',
        path: '/sub-menu-2'
      }
    ]
  }
];

const MenuSidebar = () => {
  const user = useSelector((state: any) => state.auth.currentUser);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/admin/dashboard" className="brand-link">
        <img
          src="/img/logo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{opacity: '.8'}}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={'/img/default-profile.png'}
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <Link to="/admin/profile" className="d-block">
              {user.Email}
            </Link>
          </div>
        </div>
        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name} menuItem={menuItem} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
